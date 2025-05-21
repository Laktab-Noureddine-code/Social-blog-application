<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Search;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreSearchRequest;
use App\Http\Requests\UpdateSearchRequest;
// use App\Models\User;
// use App\Models\Group;
// use App\Models\Page;
// use App\Models\Post;
// use App\Models\SearchHistory;
class SearchController extends Controller
{

    public function getSearchPropositions(Request $request, User $user)
    {

        $query = $request->input('content');
        
        // Load relations to avoid lazy loading issues
        // $user->loadMissing(['friends', 'groups', 'pages']);

        $friends = $user->amis()->where('name', 'LIKE', "%$query%")
            ->limit(2)
            ->get()
            ->map(function ($friend) {
                return [
                    'type' => 'friend',
                    'id' => $friend->id,
                    'name' => $friend->name
                ];
            });

        $groups = $user->groups()
            ->where('name', 'LIKE', "%$query%")
            ->limit(2)
            ->get()
            ->map(function ($group) {
                return [
                    'type' => 'group',
                    'id' => $group->id,
                    'name' => $group->name
                ];
            });
        //     ->where('name', 'LIKE', "%$query%")
        //     ->limit(2)
        //     ->get()
        //     ->map(function ($group) {
        //         return [
        //             'type' => 'group',
        //             'id' => $group->id,
        //             'name' => $group->name
        //         ];
        //     });
    
        // // Fix here: Use 'nom_page' for both where and mapping
        // $pages = $user->pages()
        //     ->where('nom_page', 'LIKE', "%$query%")
        //     ->limit(2)
        //     ->get()
        //     ->map(function ($page) {
        //         return [
        //             'type' => 'page',
        //             'id' => $page->id,
        //             'name' => $page->nom_page  // <-- corrected
        //         ];
        //     });
    
        $posts = Post::where('text', 'LIKE', "%$query%")
            ->limit(2)
            ->get()
            ->map(function ($post) {
                return [
                    'type' => 'post',
                    'id' => $post->id,
                    'content' => Str::limit($post->text, 50)
                ];
            });
        // $posts = Post::where(function ($q) use ($user) {
        //         $q->whereIn('user_id', $user->friends->pluck('id')->toArray())
        //           ->orWhereIn('group_id', $user->groups->pluck('id')->toArray())
        //           ->orWhereIn('page_id', $user->pages->pluck('id')->toArray());
        //     })
        //     ->where('content', 'LIKE', "%$query%")
        //     ->limit(2)
        //     ->get()
        //     ->map(function ($post) {
        //         return [
        //             'type' => 'post',
        //             'id' => $post->id,
        //             'content' => \Illuminate\Support\Str::limit($post->content, 50)
        //         ];
        //     });
    
        // $results = collect($friends)
        //     ->merge($groups)
        //     ->merge($pages)
        //     ->merge($posts)
        //     ->take(6);

        $results = collect($friends)
            ->merge($groups)
            ->merge($posts)
            ->take(6);
    
        // if ($results->count() < 6) {
        //     $needed = 6 - $results->count();
    
        //     $history = Search::where('user_id', $user->id)
        //         ->where('term', 'LIKE', "%$query%")
        //         ->orderBy('created_at', 'desc')
        //         ->limit($needed)
        //         ->get()
        //         ->map(function ($item) {
        //             return [
        //                 'type' => 'history',
        //                 'id' => $item->id,
        //                 'term' => $item->term
        //             ];
        //         });
    
        //     $results = $results->merge($history);
        // }
    
        return response()->json($results);
        // return response()->json($friends);
        // return response()->json($results);
    }
    

}
