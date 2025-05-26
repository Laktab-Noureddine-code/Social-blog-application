/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import BlogLikeButton from "./BlogLikeButton";
import BlogCommentButton from "./BlogCommentButton";
import DeleteBlogButton from "./DeleteBlogButton";
import { useSelector } from 'react-redux';
import SaveBlogButton from './SaveBlogButton';

function BlogCard({ blog }) {
  const currentUser = useSelector(state => state.auth.user);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const canDeleteBlog = () => {
    if (!currentUser) return false;

    // For User blogs
    if (blog.creator_type.includes('User')) {
      console.log(blog.created_by)
      return blog.created_by === currentUser.id;
    }
    
    // For Page blogs
    if (blog.creator_type.includes('Page')) {
      console.log(blog.created_by === currentUser.id)
      return (
        blog.created_by === currentUser.id ||
        blog.creator?.owner?.id === currentUser.id ||
        blog.creator?.admins?.some(admin => admin.id === currentUser.id)
      );
    }
    
    // For Group blogs
    if (blog.creator_type.includes('Group')) {
      console.log(blog.created_by === currentUser.id)
      return (
        blog.created_by === currentUser.id ||
        blog.creator?.creator?.id === currentUser.id ||
        blog.group_admins?.some(admin => admin.id === currentUser.id)
      );
    }

    return false;
  };

  const renderCreatorInfo = () => {
    if (blog.creator_type.includes('User')) {
      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2">
            {blog.creator.image_profile_url && (
              <img
                src={blog.creator.image_profile_url}
                alt={blog.creator.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="text-sm font-medium">{blog.creator.name}</span>
        </div>
      );
    } else if (blog.creator_type.includes('Page')) {
      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2">
            {blog.creator.profile_image_url && (
              <img
                src={blog.creator.profile_image_url}
                alt={blog.creator.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="text-sm font-medium">{blog.creator.name}</span>
        </div>
      );
    } else if (blog.creator_type.includes('Group')) {
      return (
        <div>
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2">
              {blog.creator.cover_image && (
                <img
                  src={blog.creator.cover_image}
                  alt={blog.creator.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-sm font-medium">Groupe: {blog.creator.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden mr-1">
              {blog.created_by_user?.image_profile_url && (
                <img
                  src={blog.created_by_user.image_profile_url}
                  alt={blog.created_by_user.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span>Posté par {blog.created_by_user?.name}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blogs/${blog.id}`}>
        {blog.cover_image ? (
          <div className="h-40 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/storage/${blog.cover_image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-40 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Pas d'image</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            {blog.creator_type.includes('User') ? 'Personnel' :
              blog.creator_type.includes('Page') ? 'Page' : 'Groupe'}
          </span>
          {canDeleteBlog() && <DeleteBlogButton blog={blog} />}
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          <Link to={`/blogs/${blog.id}`} className="hover:text-blue-600">
            {blog.title}
          </Link>
        </h3>

        <div className="text-sm text-gray-600 mb-3 line-clamp-2">
          <Link to={`/blogs/${blog.id}`}>
            <div dangerouslySetInnerHTML={{
              __html: blog.content.substring(0, 100) + (blog.content.length > 100 ? '...' : '')
            }} />
          </Link>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{blog.comments?.length || 0} commentaires</span>
            <span>•</span>
            <span>{blog.likes?.length || 0} j'aimes</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {renderCreatorInfo()}
            <div className="flex items-center ">
              <BlogLikeButton blogId={blog.id} />
              <BlogCommentButton
                blogId={blog.id}
                commentsCount={blog.comments ? blog.comments.length : 0}
              />
              <SaveBlogButton blogId={blog.id} isInitiallySaved={blog.is_saved} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;