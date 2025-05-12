import { useState } from "react"
import BlogEditor from "../../components/blogs/BlogEditor";

function CreateBlog() {
    const [blog, setBlog] = useState('');
    return (
        <div>
            <BlogEditor blog={blog} setBlog={setBlog}/>
        </div>
    )
}

export default CreateBlog
