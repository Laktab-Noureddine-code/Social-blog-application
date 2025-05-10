import { useEffect, useState } from 'react';

import GroupForm from '../../components/pages/group/create/GroupForm';
import GroupPreview from '../../components/pages/group/create/GroupPreview';
import { useSelector } from 'react-redux';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [confidentiality, setConfidentiality] = useState('privé'); // 'private' or 'public'
  const [visibility, setVisibility] = useState('visible'); // 'visible' or 'hidden'
  const [friends, setFriends] = useState('');
  const [groupCover, setGroupCover] = useState(null);
  const [groupProfile, setGroupProfile] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth)
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groupName, confidentiality, visibility, friends);
  }

  if (!user) return (
    <div className="flex items-center justify-center h-screen" >
      <h1 className="text-xl font-medium">Chargement...</h1>
    </div>
  );


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