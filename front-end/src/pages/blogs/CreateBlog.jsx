/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BlogEditor from "../../components/blogs/BlogEditor";
import "../../components/blogs/BlogPreview.css";
import BlogPreview from "../../components/blogs/BlogPreview";
import { useSelector } from "react-redux";
import { userProfile } from "../../helpers/helper";
import { MdOutlineGroups } from "react-icons/md";

const CreateBlog = ({ typeCreator = 'user' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [hasPermission, setHasPermission] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.access_token);
  const userData = useSelector(state => state.auth.user);
  const params = useParams();

  // Get typeCreator from props or params
  const effectiveTypeCreator = params.typeCreator || 'user';

  console.log("Type Creator:", effectiveTypeCreator);

  // Fetch creator data based on type and ID
  useEffect(() => {
    if (!params.id || !effectiveTypeCreator) return;

    const fetchCreatorData = async () => {
      try {
        let endpoint;
        switch (effectiveTypeCreator) {
          case 'group':
            endpoint = `/api/groups/${params.id}`;
            break;
          case 'page':
            endpoint = `/api/page/${params.id}`;
            break;
          default:
            endpoint = `/api/user/${params.id}`;
        }

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCreatorData(data);

          // Check permissions
          if (effectiveTypeCreator === 'group') {
            // Check if user is a member of the group
            const isMember = data.members && data.members.some(member => member.id === userData.id);
            setHasPermission(isMember);
          } else if (effectiveTypeCreator === 'page') {


            // Check if user is creator or admin of the page
            const isCreator = data.page.user_id === userData.id;
            const isAdmin = data.page.admins && data.page.admins.some(admin => admin.page.id === userData.id);

            console.log("isCreator:", isCreator, isAdmin);
            setHasPermission(isCreator || isAdmin);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${effectiveTypeCreator} data:`, error);
      }
    };
    fetchCreatorData();
  }, [effectiveTypeCreator, params.id, token, userData.id]);

  // Render creator information based on typeCreator
  const renderCreatorInfo = () => {
    if (!hasPermission) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {effectiveTypeCreator === 'group' ? (
            <p>Vous ne pouvez pas créer un blog dans un groupe dont vous n'êtes pas membre.</p>
          ) : (
            <p>Vous ne pouvez pas créer un blog sur cette page car vous n'êtes ni le créateur ni un administrateur.</p>
          )}
        </div>
      );
    }

    if (effectiveTypeCreator === 'user') {
      return (
        <div className="flex items-center mb-4 p-3 rounded-lg">
          <img
            src={userProfile(userData.image_profile_url)}
            alt={`${userData.name} Avatar`}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-sm text-gray-600">
            Publié par: {userData?.name || 'Anonymous'}
          </div>
        </div>
      );
    } else if (creatorData) {
      // For group or page, display both creator entity and user
      console.log(creatorData);
      // Handle different data structures for group and page
      let creatorName = '';
      let creatorImage = '';
      
      if (effectiveTypeCreator === 'group') {
        creatorName = creatorData.name;
        creatorImage = creatorData.cover_image ? `http://127.0.0.1:8000/storage/${creatorData.cover_image}` : '';
      } else if (effectiveTypeCreator === 'page' && creatorData.page) {
        creatorName = creatorData.page.name;
        creatorImage = creatorData.page.profile_image_url;
      }
      
      return (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          {/* Group or Page information */}
          <div className="flex items-center mb-3">
            {creatorImage && (
              <img
                src={creatorImage}
                alt={`${creatorName} Avatar`}
                className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-blue-500"
              />
            )}
            <div>
              <div className="font-bold text-lg">
                {effectiveTypeCreator === 'group' ? <MdOutlineGroups/> : '📄 '}
                {creatorName}
              </div>
            </div>
          </div>

          {/* User information (who is posting) */}
          <div className="flex items-center pl-4 border-l-2 border-gray-300 ml-2">
            <img
              src={userProfile(userData.image_profile_url)}
              alt={`${userData.name} Avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="text-sm text-gray-600">
              Publié par: {userData?.name || 'Anonymous'}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Handle publish function
  const handlePublish = async () => {
    if (!title || !content || !hasPermission) return;

    setIsPublishing(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (coverImageFile) {
        formData.append('cover_image', coverImageFile);
      }

      // Use the creator type and ID from props or params
      let creatorType = 'App\\Models\\User';
      let creatorId = userData?.id;

      if (effectiveTypeCreator === 'group') {
        creatorType = 'App\\Models\\Group';
        creatorId = params.id || creatorData?.id;
      } else if (effectiveTypeCreator === 'page') {
        creatorType = 'App\\Models\\Page';
        creatorId = params.id || creatorData?.page?.id ;
      }

      formData.append('creator_id', creatorId);
      formData.append('creator_type', creatorType);
      formData.append('created_by', userData?.id);

      const response = await fetch('http://127.0.0.1:8000/api/blogs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to publish blog');
      }

      const data = await response.json();
      // Redirect to blogs page or the newly created blog
      navigate('/blogs/'+data.blog?.id);
    } catch (error) {
      console.error('Error publishing blog:', error);
      alert('Failed to publish blog. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle image upload
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

        {/* Display creator information */}
        {renderCreatorInfo()}

        {hasPermission && (
          <>
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

            {/* Blog Editor (Required) */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contenu *
              </label>
              <BlogEditor blog={content} setBlog={setContent} />
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
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
