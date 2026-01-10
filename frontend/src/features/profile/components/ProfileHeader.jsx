/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { UserRoundPlus, UserRoundMinus } from 'lucide-react';
import ModifierProfil from './EditProfile';
import Unknown from '@/features/home/components/Unknown';
import UnknownCoverPhoto from '@/features/home/components/UnknownCoverPhoto';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileHeader() {
    const [isFriend, setIsFriend] = useState(false);
    const controls = useAnimation();
    const state = useSelector(state=>state.profile)
    const handleClick = async (e) => {
        e.preventDefault();
        await controls.start({
            rotate: 360,
            transition: { duration: 0.6, ease: 'easeInOut' },
        });
        setIsFriend(prev => !prev);
        controls.set({ rotate: 0 });
    };

    return (
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative">
        {/* Cover Image */}
        <div className="h-37 md:h-48 lg:h-72 relative">
          {state.user.couverture_url ? (
            <img
              src={state.user.couverture_url}
              alt="Your profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <UnknownCoverPhoto />
          )}
          {/* Top gradient inside the image only */}
          <div className="absolute bottom-0 left-0 right-0 md:h-40 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute right-4 top-4">
            <ModifierProfil
              name={state.user.name}
              coverPhoto={state.user.couverture_url}
              profilePicture={state.user.image_profile_url}
            />
          </div>
        </div>

        {/* Profile Image and Name */}
        <div className=" flex md:relative flex-col md:flex-row items-center md:items-end gap-4 px-5 -mt-16">
          <div className="z-10 relative rounded-full border-4 bg-gray-900 border-gray-200 overflow-hidden md:h-35 md:w-35 h-28 w-28">
            {state.user.image_profile_url ? (
              <img
                src={state.user.image_profile_url}
                alt="Your profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Unknown />
            )}
          </div>
          <form
            onSubmit={handleClick}
            className="md:absolute md:z-10 md:left-30"
          >
            <motion.button
              type="submit"
              animate={controls}
              className="flex items-center shadow-lg justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-blue-500"
            >
              {isFriend ? (
                <UserRoundMinus size={20} />
              ) : (
                <UserRoundPlus size={20} />
              )}
            </motion.button>
          </form>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 md:ml-4 mt-1 md:absolute md:bottom-8 left-40">
            {state.user.name}
          </h1>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200 ">
          <div className="text-center">
            <Link
              to={`/profile/${state.user.id}`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Publications
            </Link>
          </div>
          <div className="text-center">
            <Link
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
              to={`/profile/${state.user.id}/amis`}
            >
              Les Amis
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={`/profile/${state.user.id}/images`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Les Photos
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={`/profile/${state.user.id}/videos`}
              className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
            >
              Les Videos
            </Link>
          </div>
        </div>
      </div>

    );
}

export default ProfileHeader;
