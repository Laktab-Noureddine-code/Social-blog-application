<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Media;
use App\Models\Comment;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SavePublication;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //,'Likes','UsersComment','Comments'
        $posts = Post::with('User', 'Medias', 'Comments', 'Likes','page', 'reports', 'savedByUsers','hiddenByUsers')->orderBy("created_at", 'desc')->get();
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
            'text' => 'nullable|string',
            'type' => 'nullable|string',
            'id_page' => 'nullable',
            'id_group' => 'nullable',
            'files' => 'sometimes|array',
            'files.*.data' => 'required|string',
            'files.*.name' => 'required|string',
            'files.*.type' => 'required|string',
        ]);

        try {
            $post = Post::create([
                'text' => $validated['text'],
                'user_id' => !$request['id_page'] ? Auth::id() : null,
                'type' => $request['type'] ? $request['type'] : 'user',
                'page_id' => $request['id_page'] ? $request['id_page'] : null,
                'group_id' => $request['id_group'] ? $request['id_group'] : null,
                'admin_id' => $request['id_page'] ? Auth::id() : null,
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
                    $folder = str_starts_with($mimeType, 'image') ? 'images' : (str_starts_with($mimeType, 'video') ? 'videos' : 'others');

                    $filename = Str::random(20) . date('YmdHis') . '.' . $extension;
                    $path = "posts/$folder/$filename";

                    // Store file
                    Storage::disk('public')->put($path, $fileData);

                    // Save media record
                    $post->Medias()->create([
                        'type' => $mimeType,
                        'body' => "$folder/$filename",
                        'url' => asset("storage/" . $path)
                    ]);

                    $uploadedFiles[] = [
                        'original_name' => $file['name'],
                        'url' => asset("storage/posts/$folder/$filename"),
                        'type' => $mimeType
                    ];
                }
            }
                                                                                    //User', 'Medias', 'Comments', 'Likes','page', 'reports', 'savedByUsers','hiddenByUsers'
            $Post = Post::where('id', $post->id)->with('User', 'Medias', 'Comments', 'Likes','page', 'adminPost','savedByUsers','hiddenByUsers')->orderBy("created_at", 'desc')->get();
            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'post' => $Post,
                'type ' => $request['type']
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'error' => $e->getMessage()
            ], 500);
        }
        // return $request;/
    }





    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::where('id', $post->id)->with('Medias', 'User', 'Likes', 'Comments')->first();
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



    public function save(Post $post)
    {
        $user = Auth::user();

        // Prevent duplicates
        $alreadySaved = SavePublication::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if ($alreadySaved) {
            return response()->json(['message' => 'Post already saved'], 200);
        }

        SavePublication::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'save_at' => now(),
        ]);

        return response()->json($user);
    }

    // Unsave a post
    public function unsave(Post $post)
    {
        $user = Auth::user();

        $deleted = SavePublication::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->delete();

        if ($deleted) {
            return response()->json($user);
        }

        return response()->json(['suceess'=>"not"]);
    }
}
