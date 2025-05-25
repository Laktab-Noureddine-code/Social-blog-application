<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Group;
use App\Models\Page;
use App\Models\Blog;
use App\Models\Search;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreSearchRequest;
use App\Http\Requests\UpdateSearchRequest;

class SearchController extends Controller
{
    /**
     * Récupère les suggestions de recherche en temps réel
     */
    public function getSearchPropositions(Request $request, User $user)
    {
        $query = $request->input('content');
        
        // Recherche d'utilisateurs (amis et autres)
        $users = User::where('name', 'LIKE', "%$query%")
            ->limit(3)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'user',
                    'id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image_profile_url
                ];
            });

        // Recherche de groupes publics
        $groups = Group::where('name', 'LIKE', "%$query%")
            ->where('visibility', '!=', 'masqué')
            ->where(function($q) {
                $q->where('confidentiality', '!=', 'privé')
                  ->orWhereHas('members', function($query) {
                      $query->where('user_id', Auth::id());
                  });
            })
            ->limit(3)
            ->get()
            ->map(function ($group) {
                return [
                    'type' => 'group',
                    'id' => $group->id,
                    'name' => $group->name,
                    'image' => $group->cover_image
                ];
            });
        
        // Recherche de pages
        $pages = Page::where('name', 'LIKE', "%$query%")
            ->limit(3)
            ->get()
            ->map(function ($page) {
                return [
                    'type' => 'page',
                    'id' => $page->id,
                    'name' => $page->name,
                    'image' => $page->profile_image_url
                ];
            });
        
        // Recherche de posts publics
        $posts = Post::where('text', 'LIKE', "%$query%")
            ->whereDoesntHave('group', function ($query) {
                $query->where('confidentiality', 'privé')
                    ->orWhere('visibility', 'masqué');
            })
            ->limit(3)
            ->get()
            ->map(function ($post) {
                return [
                    'type' => 'post',
                    'id' => $post->id,
                    'content' => Str::limit($post->text, 50),
                    'user' => $post->user ? $post->user->name : null
                ];
            });
        
        // Recherche de blogs
        $blogs = Blog::where('title', 'LIKE', "%$query%")
            ->limit(3)
            ->get()
            ->map(function ($blog) {
                return [
                    'type' => 'blog',
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'image' => $blog->cover_image
                ];
            });

        // Compter les résultats supplémentaires pour chaque catégorie
        $counts = [
            'users_count' => User::where('name', 'LIKE', "%$query%")->count() - $users->count(),
            'groups_count' => Group::where('name', 'LIKE', "%$query%")->where('visibility', '!=', 'masqué')->count() - $groups->count(),
            'pages_count' => Page::where('name', 'LIKE', "%$query%")->count() - $pages->count(),
            'posts_count' => Post::where('text', 'LIKE', "%$query%")->whereDoesntHave('group', function ($query) {
                $query->where('confidentiality', 'privé')->orWhere('visibility', 'masqué');
            })->count() - $posts->count(),
            'blogs_count' => Blog::where('title', 'LIKE', "%$query%")->count() - $blogs->count(),
        ];

        // Regrouper les résultats par catégorie
        $results = [
            'users' => $users,
            'groups' => $groups,
            'pages' => $pages,
            'posts' => $posts,
            'blogs' => $blogs,
            'counts' => $counts
        ];

        return response()->json($results);
    }

    /**
     * Recherche complète avec pagination pour la page de résultats
     */
    public function fullSearch(Request $request)
    {
        $query = $request->input('q');
        $category = $request->input('category', 'all');
        $page = $request->input('page', 1);
        $perPage = 10;

        // Initialiser les résultats
        $results = [];
        $counts = [];

        // Recherche par catégorie
        switch ($category) {
            case 'users':
                $results['users'] = $this->searchUsers($query, $page, $perPage);
                $counts['users'] = User::where('name', 'LIKE', "%$query%")->count();
                break;
            case 'groups':
                $results['groups'] = $this->searchGroups($query, $page, $perPage);
                $counts['groups'] = Group::where('name', 'LIKE', "%$query%")
                    ->where('visibility', '!=', 'masqué')
                    ->count();
                break;
            case 'pages':
                $results['pages'] = $this->searchPages($query, $page, $perPage);
                $counts['pages'] = Page::where('name', 'LIKE', "%$query%")->count();
                break;
            case 'posts':
                $results['posts'] = $this->searchPosts($query, $page, $perPage);
                $counts['posts'] = Post::where('text', 'LIKE', "%$query%")
                    ->whereDoesntHave('group', function ($q) {
                        $q->where('confidentiality', 'privé')
                          ->orWhere('visibility', 'masqué');
                    })
                    ->count();
                break;
            case 'blogs':
                $results['blogs'] = $this->searchBlogs($query, $page, $perPage);
                $counts['blogs'] = Blog::where('title', 'LIKE', "%$query%")->count();
                break;
            default:
                // Recherche dans toutes les catégories avec limite réduite
                $results['users'] = $this->searchUsers($query, $page, 5);
                $results['groups'] = $this->searchGroups($query, $page, 5);
                $results['pages'] = $this->searchPages($query, $page, 5);
                $results['posts'] = $this->searchPosts($query, $page, 5);
                $results['blogs'] = $this->searchBlogs($query, $page, 5);
                
                $counts['users'] = User::where('name', 'LIKE', "%$query%")->count();
                $counts['groups'] = Group::where('name', 'LIKE', "%$query%")
                    ->where('visibility', '!=', 'masqué')
                    ->count();
                $counts['pages'] = Page::where('name', 'LIKE', "%$query%")->count();
                $counts['posts'] = Post::where('text', 'LIKE', "%$query%")
                    ->whereDoesntHave('group', function ($q) {
                        $q->where('confidentiality', 'privé')
                          ->orWhere('visibility', 'masqué');
                    })
                    ->count();
                $counts['blogs'] = Blog::where('title', 'LIKE', "%$query%")->count();
        }

        // Enregistrer la recherche dans l'historique
        if (Auth::check()) {
            Search::create([
                'user_id' => Auth::id(),
                'term' => $query
            ]);
        }

        return response()->json([
            'results' => $results,
            'counts' => $counts,
            'query' => $query,
            'category' => $category,
            'page' => $page,
            'perPage' => $perPage
        ]);
    }

    private function searchUsers($query, $page, $perPage)
    {
        return User::where('name', 'LIKE', "%$query%")
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'user',
                    'id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image_profile_url
                ];
            });
    }

    private function searchGroups($query, $page, $perPage)
    {
        return Group::where('name', 'LIKE', "%$query%")
            ->where('visibility', '!=', 'masqué')
            ->where(function($q) {
                $q->where('confidentiality', '!=', 'privé')
                  ->orWhereHas('members', function($query) {
                      $query->where('user_id', Auth::id());
                  });
            })
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($group) {
                return [
                    'type' => 'group',
                    'id' => $group->id,
                    'name' => $group->name,
                    'image' => $group->cover_image
                ];
            });
    }

    private function searchPages($query, $page, $perPage)
    {
        return Page::where('name', 'LIKE', "%$query%")
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($page) {
                return [
                    'type' => 'page',
                    'id' => $page->id,
                    'name' => $page->name,
                    'image' => $page->profile_image_url
                ];
            });
    }

    private function searchPosts($query, $page, $perPage)
    {
        return Post::where('text', 'LIKE', "%$query%")
            ->whereDoesntHave('group', function ($q) {
                $q->where('confidentiality', 'privé')
                  ->orWhere('visibility', 'masqué');
            })
            ->with('user')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($post) {
                return [
                    'type' => 'post',
                    'id' => $post->id,
                    'content' => Str::limit($post->text, 100),
                    'user' => $post->user ? $post->user->name : null,
                    'user_id' => $post->user ? $post->user->id : null,
                    'user_image' => $post->user ? $post->user->image_profile_url : null,
                    'created_at' => $post->created_at->diffForHumans()
                ];
            });
    }

    private function searchBlogs($query, $page, $perPage)
    {
        return Blog::where('title', 'LIKE', "%$query%")
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($blog) {
                return [
                    'type' => 'blog',
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'content' => Str::limit($blog->content, 100),
                    'image' => $blog->cover_image,
                    'created_at' => $blog->created_at->diffForHumans()
                ];
            });
    }
}
