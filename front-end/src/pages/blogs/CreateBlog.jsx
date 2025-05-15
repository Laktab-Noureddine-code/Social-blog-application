import { useState } from "react"
import BlogEditor from "../../components/blogs/BlogEditor";
import SubmitBlog from "../../components/blogs/SubmitBlog";

function CreateBlog() {
    const [blog, setBlog] = useState('');
    return (
        <div>
            <BlogEditor blog={blog} setBlog={setBlog}/>
            <SubmitBlog blog={blog}/>
        </div>
    )
}

export default CreateBlog
