import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/create/GroupForm';
import GroupPreview from '../components/create/GroupPreview';
import { useSelector } from 'react-redux';
import api from '@/lib/api';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [confidentiality, setConfidentiality] = useState('privé');
  const [visibility, setVisibility] = useState('visible');
  const [friends, setFriends] = useState('');
  const [groupCover, setGroupCover] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isGroupNameValid) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', groupName);
      formData.append('description', description);
      formData.append('confidentiality', confidentiality);
      formData.append('visibility', visibility);

      if (coverFile) {
        formData.append('cover_image', coverFile);
      }

      const response = await api.post('/api/groups/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/groups/${response.data.group.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la création du groupe');
      alert('Error creating group:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user.name) return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-medium">Chargement...</h1>
    </div>
  );

  const isGroupNameValid = groupName.trim().length >= 3;

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <GroupForm
        groupName={groupName}
        setGroupName={setGroupName}
        description={description}
        setDescription={setDescription}
        confidentiality={confidentiality}
        setConfidentiality={setConfidentiality}
        visibility={visibility}
        setVisibility={setVisibility}
        friends={friends}
        setFriends={setFriends}
        handleCoverUpload={handleCoverUpload}
        groupCover={groupCover}
        userName={user.name}
        user={user}
        isGroupNameValid={isGroupNameValid}
        isSubmitting={isSubmitting}
        error={error}
        handleSubmit={handleSubmit}
      />

      {isDesktop && <GroupPreview
        groupName={groupName}
        confidentiality={confidentiality}
        visibility={visibility}
        groupCover={groupCover}
      />}
    </div>
  );
}