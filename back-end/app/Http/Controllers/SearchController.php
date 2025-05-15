<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Search;

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

public function getSearchPropositions(User $user, Request $request)
{
    // $user = Auth::user();
    $query = $request->input('content');
    $results = [];

    // 1. Friends (assuming many-to-many 'friends' relationship)
    $friends = $user->friends()
        ->where('name', 'LIKE', "%$query%")
        ->limit(2)
        ->get()
        ->map(function ($friend) {
            return [
                'type' => 'friend',
                'id' => $friend->id,
                'name' => $friend->name
            ];
        });

    // 2. Groups
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

    // 3. Pages
    $pages = $user->pages()
        ->where('name', 'LIKE', "%$query%")
        ->limit(2)
        ->get()
        ->map(function ($page) {
            return [
                'type' => 'page',
                'id' => $page->id,
                'name' => $page->name
            ];
        });

    // 4. Posts (max 2 results)
    $posts = Post::where(function ($q) use ($user) {
            $q->whereIn('user_id', $user->friends->pluck('id'))
              ->orWhereIn('group_id', $user->groups->pluck('id'))
              ->orWhereIn('page_id', $user->pages->pluck('id'));
        })
        ->where('content', 'LIKE', "%$query%")
        ->limit(2)
        ->get()
        ->map(function ($post) {
            return [
                'type' => 'post',
                'id' => $post->id,
                'content' => Str::limit($post->content, 50)
            ];
        });

    // Merge and keep first 6
    $results = collect($friends)
        ->merge($groups)
        ->merge($pages)
        ->merge($posts)
        ->take(6);

    // 5. Fill with search history if less than 6
    if ($results->count() < 6) {
        $needed = 6 - $results->count();

        $history = SearchHistory::where('user_id', $user->id)
            ->where('term', 'LIKE', "%$query%")
            ->orderBy('created_at', 'desc')
            ->limit($needed)
            ->get()
            ->map(function ($item) {
                return [
                    'type' => 'history',
                    'id' => $item->id,
                    'term' => $item->term
                ];
            });

        $results = $results->merge($history);
    }

    return response()->json($results);
}

}
