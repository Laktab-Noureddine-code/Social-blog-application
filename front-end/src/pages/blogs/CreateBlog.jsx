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
  console.log(content)

  // Ajout de la fonction handlePublish
  const handlePublish = () => {
    if (!title || !content) return;
    
    setIsPublishing(true);
    // Ici, vous pouvez ajouter la logique pour publier l'article
    // Par exemple, appeler une API
    
    // Simulation d'une publication réussie après 1 seconde
    setTimeout(() => {
      setIsPublishing(false);
      navigate('/blogs'); // Redirection vers la liste des blogs
    }, 1000);
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Créer un nouvel article</h1>
        
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
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
            (isPublishing || !title || !content) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPublishing ? 'Publication en cours...' : 'Publier'}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
