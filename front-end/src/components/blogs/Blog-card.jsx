/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser} from "react-icons/fa";
import BlogLikeButton from "./BlogLikeButton";
import BlogCommentButton from "./BlogCommentButton";

function BlogCard({ blog }) {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link
        to={`/blogs/${blog.id}`}
      >
        {blog.cover_image && (
          <div className="h-48 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/storage/${blog.cover_image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Link>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaCalendarAlt className="mr-1" />
          <span>{formatDate(blog.created_at)}</span>

          <div className="mx-2">•</div>

          <FaUser className="mr-1" />
          <span>
            {blog.creator_type.includes('User')
              ? blog.creator.name
              : blog.creator_type.includes('Group')
                ? `Groupe: ${blog.creator.name}`
                : `Page: ${blog.creator.name}`}
          </span>
        </div>
        <Link to={`/blogs/${blog.id}`}>
          <div className="prose line-clamp-3 mb-4 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: blog.content.substring(0, 150) + (blog.content.length > 150 ? '...' : '')
            }}>
          </div>
        </Link>
        
        <div className="pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center">
            <BlogLikeButton blogId={blog.id} />
            <BlogCommentButton
              blogId={blog.id}
              commentsCount={blog.comments ? blog.comments.length : 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;