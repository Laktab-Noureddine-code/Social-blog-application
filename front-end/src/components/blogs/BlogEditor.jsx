import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const BlogEditor = ({ blog, setBlog }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        }
    };
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'align',
        'blockquote', 'code-block',
        'list', 'bullet',
        'link', 'image', 'video'
    ];

    return (
        <div className="text-editor-container">
            <ReactQuill
                theme="snow"
                value={blog}
                onChange={setBlog}
                modules={modules}
                formats={formats}
            />
            {/* <div
                className="preview ql-editor ql-snow"
                dangerouslySetInnerHTML={{ __html: blog }}
            /> */}
        </div>
    );
};

export default BlogEditor;