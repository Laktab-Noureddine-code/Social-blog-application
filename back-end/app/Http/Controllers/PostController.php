<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comment;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //,'Likes','UsersComment','Comments'
        $posts = Post::with('User','Medias','Comments', 'Likes')->orderBy("created_at",'desc')->get();
        return response()->json($posts);
    }
    public function indexVideos()
    {
        $posts = Post::whereHas('medias', function ($query) {
            $query->where('type', 'like', '%video%');
        })
            ->with(['user', 'medias', 'comments', 'likes'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($posts);
    }


    public function Comments($id)
    {
        // $comments = Comment::with('User')->where('post_id',$id)->get();
        $comments = Comment::where('post_id', $id)->with('user')->get();
        return response()->json($comments);
        // return response()->json(["id"=>$id]);
    }

    /**
     * Store a newly created resource in storage.
     */
   
public function store(Request $request)
{
    $validated = $request->validate([
        'text' => 'required|string',
        'files' => 'sometimes|array',
        'files.*.data' => 'required|string',
        'files.*.name' => 'required|string',
        'files.*.type' => 'required|string',
    ]);

    try {
        $post = Post::create([
            'text' => $validated['text'],
            'user_id' => Auth::id(),
        ]);

        $uploadedFiles = [];

        if (isset($validated['files']) && is_array($validated['files'])) {
            foreach ($validated['files'] as $file) {
                $fileData = base64_decode($file['data']);

                if (!$fileData) {
                    continue; // or log error
                }

                $mimeType = $file['type'];
                $extension = explode('/', $mimeType)[1] ?? 'bin';

                // Determine folder
                $folder = str_starts_with($mimeType, 'image') ? 'images' :
                          (str_starts_with($mimeType, 'video') ? 'videos' : 'others');

                $filename = Str::random(20) . date('YmdHis') . '.' . $extension;
                $path = "posts/$folder/$filename";

                // Store file
                Storage::disk('public')->put($path, $fileData);

                // Save media record
                $post->Medias()->create([
                    'type' => $mimeType,
                    'body' => "$folder/$filename",
                    'url' => asset("storage/".$path)
                ]);

                $uploadedFiles[] = [
                    'original_name' => $file['name'],
                    'url' => asset("storage/posts/$folder/$filename"),
                    'type' => $mimeType
                ];
            }
        }
            $Post = Post::where('id',$post->id)->with('User', 'Medias', 'Comments', 'Likes')->orderBy("created_at", 'desc')->get();
        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'post'=> $Post
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
            'error' => $e->getMessage()
        ], 500);
    }
}





    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::where('id',$post->id)->with('Medias', 'User', 'Likes', 'Comments')->first();
        return response()->json($post); 
    }
    
    // $post_medias = $post->Medias;
    // return response()->json(compact('post','post_medias','post_user')); 
    // $post_user = $post->User;
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }





   
}
