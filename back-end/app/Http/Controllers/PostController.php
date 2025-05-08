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
        $posts = Post::with('User','Medias','Comments', 'Likes')->get();
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
    // public function store(Request $request)
    // {
    //     $validate = $request->validate([
    //         'text'=> 'string|nullable',
    //     ]);
    //     // foreach($request['files'] as $file){
    //     //     $video = Str::random(10) . date('YmdHis') . '.' . $file->getClientOriginalExtension();
    //     //     Storage::disk('public')->put($video, file_get_contents($file));
    //     // }
    //     // if ($file->type === "video") {
    //         // return $request;
    //         // $datafile['image_profile'] = $file->file('image_profile')->store('media/videos', 'public');
    //     // }
    //     // }else{
    //     //     $datafile['image_profile'] = $file->file('image_profile')->store('media/images', 'public');
    //     // }
    //         return ["filllles" =>$request['files[]']];
    // }




// public function store(Request $request)
//     {
//         // Debug raw request data
//         Log::debug('Raw input:', [file_get_contents('php://input')]);
//         Log::debug('Request data:', $request->all());
//         Log::debug('Files:', $_FILES ?? 'No files in $_FILES');

//         // Validate request
//         $validated = $request->validate([
//             'text' => 'required|string|max:5000',
//             'files.*' => 'file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480' // 20MB max
//         ]);

//         // Process files
//         $uploadedFiles = [];
//         if ($request->hasFile('files')) {
//             foreach ($request->file('files') as $file) {
//                 $path = $file->store('public/posts');
//                 $uploadedFiles[] = [
//                     'original_name' => $file->getClientOriginalName(),
//                     'path' => $path,
//                     'size' => $file->getSize(),
//                     'type' => $file->getMimeType()
//                 ];
//             }
//         }

//         // Here you would typically save to database
//         // $post = Post::create([...]);

//         return response()->json([
//             'success' => true,
//             'message' => 'Post created successfully',
//             'text' => $validated['text'],
//             'files' => $uploadedFiles
//    ]);
// }


// public function store(Request $request)
//     {
//         if(!Auth::check()){
//             return response()->json([
//                 'message' => "you are not auth !"
//             ]);
//         }
//         $validated = $request->validate([
//             'text' => 'required|string|max:5000',
//             'files' => 'sometimes|array',
//             'files.*.data' => 'required|string',
//             'files.*.name' => 'required|string',
//             'files.*.type' => 'required|string',
//         ]);
//         $post = Post::create([
//             "text" => $validated['text'],
//             "user_id"=>Auth::id(),
//         ]);
//         $uploadedFiles = [];
        
//         if (!empty($validated['files'])) {
//             foreach ($validated['files'] as $file) {
//                 // Decode base64 data
//                 $fileData = base64_decode($file['data']);
                
//                 // Generate unique filename
//                 $extension = explode('/', $file['type'])[1];
//                 $filename = Str::random(20).date('YmdHis').'.'.$extension;
                
//                 // Store file
//                 Storage::disk('public')->put('posts/'.$filename, $fileData);
//                 $post->Medias()->create(
//                 [
//                     "type"=>$file['type'],
//                     "body"=>$filename,


//                 ]);
                
//                 $uploadedFiles[] = [
//                     'original_name' => $file['name'],
//                     'path' => 'posts/'.$filename,
//                     'type' => $file['type']
//                 ];
//             }
//         }

//         return response()->json([
//             'success' => true,
//             'message' => 'Post created successfully',
//             'text' => $validated['text'],
//             'files' => $uploadedFiles
//     ]);
// }
public function store(Request $request)
{
    $validated = $request->validate([
        'text' => 'required|string|max:5000',
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

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'text' => $validated['text'],
            'files' => $uploadedFiles
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
        $post_medias = $post->Medias;
        $post_user = $post->User;
        return response()->json(compact('post','post_medias','post_user'));
    }

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
