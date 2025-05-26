function SubmitBlog({ blog }) {
    function handleSubmitBlog() {
        // console.log(blog)
    }
    return (
        <div>
            <button onClick={handleSubmitBlog} className="bg-blue-600 text-white font-bold p-2">Submit</button>
        </div>
    )
}

export default SubmitBlog
