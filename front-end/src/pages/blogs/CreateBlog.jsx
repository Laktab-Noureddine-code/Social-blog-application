import { useState, useRef } from "react"
import BlogEditor from "../../components/blogs/BlogEditor";
// import SubmitBlog from "../../components/blogs/SubmitBlog";
import "../../components/blogs/BlogPreview.css"; // Import the CSS for blog preview
import { useNavigate } from 'react-router-dom';
import BlogPreview from "../../components/blogs/BlogPreview";

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  // Ajout de la fonction handlePublish
  const handlePublish = async () => {
    if (!title || !content) return;

    setIsPublishing(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (coverImageFile) {
        formData.append('cover_image', coverImageFile);
      }

      // Assuming you have user information available (you might need to adjust this)
      formData.append('creator_id', 1); // Replace with actual user ID
      formData.append('creator_type', 'App\\Models\\User'); // Adjust if using different model

      const response = await fetch('http://127.0.0.1:8000/api/blogs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // Don't set Content-Type when using FormData, let the browser set it
          'Authorization': `Bearer ${token}`, // If using authentication
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to publish blog');
      }

      const data = await response.json();
      console.log('Blog published:', data);
    } catch (error) {
      console.error('Error publishing blog:', error);
      alert('Failed to publish blog. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Fonction pour gérer le téléchargement d'image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Vérifier que c'est bien une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Créer une URL pour l'aperçu de l'image
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setCoverImageFile(file);
    }
  };

  return (
    <div className="mx-auto py-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Créer un nouvel article</h1>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {/* Title (Required) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre de votre article"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Cover Image (Optional) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image de couverture (optionnelle)
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-black rounded py-2 px-3
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-100 file:text-black
                  hover:file:bg-gray-200 cursor-pointer file:cursor-pointer"
              />
            </div>
            {coverImage && (
              <div className="mt-2">
                <img
                  src={coverImage}
                  alt="Aperçu de la couverture"
                  className="max-h-60 object-cover rounded"
                />
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Blog Editor (Required) */}
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contenu *
        </label>
        <BlogEditor blog={content} setBlog={setContent} />
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Aperçu</h2>
        <div className="border rounded-lg p-6 bg-white">
          {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
          <BlogPreview content={content} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate('/blogs')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          onClick={handlePublish}
          disabled={isPublishing || !title || !content}
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${(isPublishing || !title || !content) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isPublishing ? 'Publication en cours...' : 'Publier'}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
