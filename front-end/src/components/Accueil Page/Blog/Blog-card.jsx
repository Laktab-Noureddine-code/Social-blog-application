/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function BlogCard({
  id,
  title,
  content,
  coverImage,
  author,
  date,
  likesCount,
  commentsCount
}) {
  // Function to strip HTML tags for excerpt
  const createExcerpt = (html, length = 100) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };
  // console.log(coverImage)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link to={`/blogs/${id}`} className="hover:text-blue-600">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{createExcerpt(content)}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {author?.image_profile_url && (
              <img
                src={author.image_profile_url}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{author?.name || 'Unknown author'}</span>
          </div>
          <span>{date}</span>
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likesCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{commentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;