import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../../components/pages/group/create/GroupForm';
import GroupPreview from '../../components/pages/group/create/GroupPreview';
import { useSelector } from 'react-redux';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [confidentiality, setConfidentiality] = useState('privé');
  const [visibility, setVisibility] = useState('visible');
  const [friends, setFriends] = useState('');
  const [groupCover, setGroupCover] = useState(null);
  const [groupProfile, setGroupProfile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector(state=>state.auth.token)

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

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupProfile(reader.result);
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
      formData.append('confidentiality', confidentiality);
      formData.append('visibility', visibility);

      if (coverFile) {
        formData.append('cover_image', coverFile);
      }

      if (profileFile) {
        formData.append('profile_image', profileFile);
      }

      const response = await axios.post('/api/groups/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Redirect to the group page or groups list
      navigate(`/groups/${response.data.group.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la création du groupe');
      console.error('Error creating group:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-medium">Chargement...</h1>
    </div>
  );

  const isGroupNameValid = groupName.trim().length >= 3;

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Left side - Form */}
      <GroupForm
        groupName={groupName}
        handleSubmit={handleSubmit}
        setGroupName={setGroupName}
        confidentiality={confidentiality}
        setConfidentiality={setConfidentiality}
        visibility={visibility}
        setVisibility={setVisibility}
        friends={friends}
        setFriends={setFriends}
        handleCoverUpload={handleCoverUpload}
        handleProfileUpload={handleProfileUpload}
        groupCover={groupCover}
        groupProfile={groupProfile}
        userName={user.name}
        isGroupNameValid={isGroupNameValid}
        isSubmitting={isSubmitting}
        error={error}
      />

      {/* Right side - Preview (desktop only) */}
      {isDesktop && <GroupPreview
        groupName={groupName}
        confidentiality={confidentiality}
        visibility={visibility}
        groupCover={groupCover}
        groupProfile={groupProfile}
      />}
    </div>
  );
}