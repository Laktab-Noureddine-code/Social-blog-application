import { useParams } from "react-router-dom";
import blogPosts from "../../../data/blogs-data";

import BlogPost from "../../Accueil Page/Blog/Blog-post";
function BlogTetaills() {
  const { id } = useParams();
  const blog = blogPosts.find((blog) => blog.id === id);
  return (
    <div>
      <BlogPost
        id={blog.id}
        title={blog.title}
        content={blog.content}
        author={blog.author}
        date={blog.date}
        likes={blog.likes}
        saves={blog.saves}
        comments={blog.comments}
        imageUrl={blog.imageUrl}
        highlights={blog.highlights}
      />
    </div>
  );
}

export default BlogTetaills;
