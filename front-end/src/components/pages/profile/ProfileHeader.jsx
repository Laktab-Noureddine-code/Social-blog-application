import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { UserRoundPlus, UserRoundMinus } from 'lucide-react';
import { getNumber } from '../../../helpers/helper';
import ModifierProfil from './EditProfile';

function ProfileHeader({ user }) {
    const [isFriend, setIsFriend] = useState(false);
    const controls = useAnimation();

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
                <img
                    src={user.coverPhoto}
                    className="h-full w-full object-cover"
                    alt="cover"
                    loading="lazy"
                />
                {/* Top gradient inside the image only */}
                <div className="absolute bottom-0 left-0 right-0 md:h-40 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className='absolute right-4 top-4'>
                    <ModifierProfil name={user.name} coverPhoto={user.coverPhoto} profilePicture={user.profilePicture} />
                </div>
            </div>

            {/* Profile Image and Name */}
            <div className=" flex md:relative flex-col md:flex-row items-center md:items-end gap-4 px-5 -mt-16">
                <div className="z-10 relative rounded-full border-4 bg-gray-900 border-gray-200 overflow-hidden md:h-35 md:w-35 h-28 w-28">
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <form onSubmit={handleClick} className='md:absolute md:z-10 md:left-30'>
                    <motion.button
                        type="submit"
                        animate={controls}
                        className='flex items-center shadow-lg justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-blue-500'
                    >
                        {isFriend ? <UserRoundMinus size={20} /> : <UserRoundPlus size={20} />}
                    </motion.button>
                </form>
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 md:ml-4 mt-1 md:absolute md:bottom-8 left-40">
                    {user.name}
                </h1>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200 ">
                {[
                    ["Publications", 10300],
                    ["Abonnés", 2564],
                    ["Abonnements", 3154],
                    ["Mentions J’aime", 12200]
                ].map(([label, value]) => (
                    <div key={label} className="text-center">
                        <span className="text-gray-600 text-sm md:text-lg font-bold block">{label}</span>
                        <span className="font-bold">{getNumber(value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileHeader;
