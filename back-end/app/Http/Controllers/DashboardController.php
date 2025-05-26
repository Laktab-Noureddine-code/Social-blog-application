<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Page;
use App\Models\Group;
use App\Models\Like;
use App\Models\Comment;
use App\Models\RapportPublication;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function getOverviewStats()
    {
        $totalUsers = User::count();
        $totalPosts = Post::count();
        $totalPages = Page::count();
        $totalGroups = Group::count();
        $totalReportedPosts = RapportPublication::count();

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalPosts' => $totalPosts,
            'totalPages' => $totalPages,
            'totalGroups' => $totalGroups,
            'totalReportedPosts' => $totalReportedPosts
        ]);
    }

    public function getPostsAnalytics()
    {
        try {
            // Posts per User (Top 5)
            $postsPerUser = Post::select('user_id', DB::raw('count(*) as posts'))
                ->with(['User:id,name'])
                ->whereNotNull('user_id')
                ->groupBy('user_id')
                ->orderBy('posts', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->User ? $item->User->name : 'Unknown User',
                        'posts' => $item->posts
                    ];
                });

            // Posts per Page (Top 5)
            $postsPerPage = Post::select('page_id', DB::raw('count(*) as posts'))
                ->with(['page:id,name'])
                ->whereNotNull('page_id')
                ->groupBy('page_id')
                ->orderBy('posts', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->page ? $item->page->name : 'Unknown Page',
                        'posts' => $item->posts
                    ];
                });

            // Posts per Group (Top 5)
            $postsPerGroup = Post::select('group_id', DB::raw('count(*) as posts'))
                ->with(['group:id,name'])
                ->whereNotNull('group_id')
                ->groupBy('group_id')
                ->orderBy('posts', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->group ? $item->group->name : 'Unknown Group',
                        'posts' => $item->posts
                    ];
                });

            $response = [
                'postsPerUser' => $postsPerUser,
                'postsPerPage' => $postsPerPage,
                'postsPerGroup' => $postsPerGroup
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in getPostsAnalytics: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'message' => 'Error fetching posts analytics: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    public function getPopularityInsights()
    {
        try {
            // Most Popular Page
            $mostPopularPage = Page::withCount(['followers', 'posts'])
                ->orderBy('followers_count', 'desc')
                ->first();

            // Most Popular Group
            $mostPopularGroup = Group::withCount(['members', 'posts'])
                ->orderBy('members_count', 'desc')
                ->first();

            // Top 5 Posts by Likes
            $topLikedPosts = Post::select('posts.*', DB::raw('COUNT(likes.id) as likes_count'))
                ->leftJoin('likes', 'posts.id', '=', 'likes.post_id')
                ->with('User:id,name')
                ->groupBy('posts.id')
                ->orderBy('likes_count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->text,
                        'likes' => $post->likes_count,
                        'author' => $post->User ? $post->User->name : 'Unknown User'
                    ];
                });

            // Top 5 Posts by Comments
            $topCommentedPosts = Post::select('posts.*', DB::raw('COUNT(comments.id) as comments_count'))
                ->leftJoin('comments', 'posts.id', '=', 'comments.post_id')
                ->with('User:id,name','page')
                ->groupBy('posts.id')
                ->orderBy('comments_count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->text,
                        'comments' => $post->comments_count,
                        'author' => $post->User ? $post->User->name  :   'Unknown User'
                    ];
                });

            $response = [
                'mostPopularPage' => $mostPopularPage ? [
                    'name' => $mostPopularPage->name,
                    'followers' => $mostPopularPage->followers_count,
                    'posts' => $mostPopularPage->posts_count
                ] : null,
                'mostPopularGroup' => $mostPopularGroup ? [
                    'name' => $mostPopularGroup->name,
                    'members' => $mostPopularGroup->members_count,
                    'posts' => $mostPopularGroup->posts_count
                ] : null,
                'topLikedPosts' => $topLikedPosts,
                'topCommentedPosts' => $topCommentedPosts
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in getPopularityInsights: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'message' => 'Error fetching popularity insights: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    public function getUserReports()
    {
        try {
            $reportedPosts = RapportPublication::select(
                'post_id',
                'cause',
                DB::raw('count(*) as reports'),
                DB::raw('MAX(created_at) as latest_report_date')
            )
                ->with(['post.User:id,name'])
                ->groupBy('post_id', 'cause')
                ->orderBy('reports', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($report) {
                    return [
                        'id' => $report->post_id,
                        'author' => $report->post->User ? $report->post->User->name : 'Unknown User',
                        'reason' => $report->cause,
                        'reports' => $report->reports,
                        'date' => $report->latest_report_date
                    ];
                });

            return response()->json($reportedPosts);
        } catch (\Exception $e) {
            Log::error('Error in getUserReports: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'message' => 'Error fetching user reports: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    public function getOverview()
    {
        // Post Type Distribution
        $postTypeData = Media::select('type', DB::raw('count(*) as count'))
            ->groupBy('type')
            ->get()
            ->map(function ($media) {
                return [
                    'name' => ucfirst(explode('/', $media->type)[0]),
                    'value' => $media->count
                ];
            });

        // Activity Trend (Last 7 days)
        $activityData = Post::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('count(*) as posts')
        )
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'postTypeData' => $postTypeData,
            'activityData' => $activityData
        ]);
    }
}
