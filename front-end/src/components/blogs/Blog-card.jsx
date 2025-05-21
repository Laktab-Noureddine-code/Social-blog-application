/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaComment, FaHeart } from "react-icons/fa";

function BlogCard({ blog }) {
  // Function to strip HTML tags for excerpt
  const createExcerpt = (html, length = 100) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };
  // console.log(coverImage)
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
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-4">
              <FaComment className="mr-1" />
              <span>{blog.comments ? blog.comments.length : 0}</span>
            </div>

            <div className="flex items-center">
              <FaHeart className="mr-1" />
              <span>{blog.likes ? blog.likes.length : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default BlogCard;