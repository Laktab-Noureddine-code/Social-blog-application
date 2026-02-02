/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaRegNewspaper } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import BlogLikeButton from "./BlogLikeButton";
import BlogCommentButton from "./BlogCommentButton";
import DeleteBlogButton from "./DeleteBlogButton";
import { useSelector } from 'react-redux';
import SaveBlogButton from './SaveBlogButton';
import { userProfile, groupCover } from "@/shared/helpers/helper";
import { useState } from 'react';

function BlogCard({ blog }) {
  const currentUser = useSelector(state => state.auth.user);
  const [article, setArticle] = useState(null);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const canDeleteBlog = () => {
    if (!currentUser) return false;

    // For User blogs
    if (blog.creator_type.includes('User')) {
      return blog.created_by === currentUser.id;
    }

    // For Page blogs
    if (blog.creator_type.includes('Page')) {
      return (
        blog.created_by === currentUser.id ||
        blog.creator?.owner?.id === currentUser.id ||
        blog.creator?.admins?.some(admin => admin.id === currentUser.id)
      );
    }

    // For Group blogs
    if (blog.creator_type.includes('Group')) {
      return (
        blog.created_by === currentUser.id ||
        blog.creator?.creator?.id === currentUser.id ||
        blog.group_admins?.some(admin => admin.id === currentUser.id)
      );
    }

    return false;
  };

  const renderCreatorInfo = () => {
    const getCreatorIcon = () => {
      if (blog.creator_type.includes('Group')) return <MdOutlineGroups className="text-blue-500 text-sm" />;
      if (blog.creator_type.includes('Page')) return <FaRegNewspaper className="text-purple-500 text-sm" />;
      return <FaUser className="text-gray-500 text-sm" />;
    };

    const getCreatorImage = () => {
      if (blog.creator_type.includes('User')) {
        return userProfile(blog.creator?.image_profile_url);
      } else if (blog.creator_type.includes('Group')) {
        return groupCover(blog.creator?.cover_image);
      } else if (blog.creator_type.includes('Page')) {
        return blog.creator?.profile_image_url || userProfile(blog.created_by_user?.image_profile_url);
      }
      return '/default-avatar.png';
    };

    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={getCreatorImage()}
            alt={blog.creator?.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.png';
            }}
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs text-xs">
            {getCreatorIcon()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {blog.creator_type.includes('Group') ? `Groupe: ${blog.creator?.name}` : blog.creator?.name}
            </p>
          </div>

          {blog.creator_type.includes('Group') && blog.created_by_user && (
            <div className="flex items-center text-xs text-gray-500 truncate">
              <span className="truncate">Posted by {blog.created_by_user?.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/blogs/${blog.id}`} className="flex-shrink-0">
        {blog.cover_image ? (
          <div className="h-40 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/storage/${blog.cover_image}`}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-blog-cover.jpg';
              }}
            />
          </div>
        ) : (
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
            {blog.creator_type.includes('User') ? 'Personal' :
              blog.creator_type.includes('Page') ? 'Page' : 'Group'}
          </span>
          {canDeleteBlog() && <DeleteBlogButton blog={blog} />}
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          <Link to={`/blogs/${blog.id}`} className="hover:text-blue-600 transition-colors">
            {blog.title}
          </Link>
        </h3>

        <div className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          <Link to={`/blogs/${blog.id}`} className="hover:text-blue-600 transition-colors">
            <div dangerouslySetInnerHTML={{
              __html: blog.content.substring(0, 100) + (blog.content.length > 100 ? '...' : '')
            }} />
          </Link>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-400" />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{blog.comments?.length || 0} comments</span>
            <span>•</span>
            <span>{blog.likes?.length || 0} likes</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {renderCreatorInfo()}
            <div className="flex items-center space-x-2">
              <BlogLikeButton
                blogId={blog.id}
                localBlog={blog}
                onLikeUpdate={(updatedLikes) => {
                  setArticle(prev => ({
                    ...prev,
                    likes: updatedLikes
                  }));
                }}
              />
              <BlogCommentButton
                blogId={blog.id}
                commentsCount={blog.comments ? blog.comments.length : 0}
                
              />
              <SaveBlogButton blogId={blog.id} isInitiallySaved={blog.is_saved}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;