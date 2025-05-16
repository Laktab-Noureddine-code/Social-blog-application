/* eslint-disable no-unused-vars */
import { useState } from 'react'
import BlogCard from "../../Accueil Page/Blog/Blog-card";
import blogPosts from '../../../data/blogs-data';
function Blogs() {
  const [blogs, setBlogs] = useState(blogPosts);
  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog}
          id={blog.id}
          title={blog.title}
          excerpt={blog.excerpt}
          author={blog.author}
          date={blog.date}
          likes={blog.likes}
          saves={blog.saves}
          comments={blog.comments}
          featured={blog.featured}
          imageUrl={blog.imageUrl}
        />
      ))}
    </div>
  )
}

export default Blogs
