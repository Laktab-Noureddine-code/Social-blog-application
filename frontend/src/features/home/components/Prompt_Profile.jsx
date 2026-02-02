

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileCompletion } from "@/shared/helpers/invitationActions";
import { setShowProfilePrompt } from "@/Redux/ProfileSlice";

const ProfilePrompt = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  return (
    state.profile.showProfilePrompt && (
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => dispatch(setShowProfilePrompt(false))}
        ></div>

        <div className="relative w-full max-w-md transform transition-all animate-fade-in-up">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
            {/* Header with gradient accent */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start">
                {/* Icon */}
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                    Complete your profile
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    You haven't completed your profile yet. It's
                    important for better interaction with the community!
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-4 mb-5">
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${getProfileCompletion(state.auth.user)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Profile completed at {getProfileCompletion(state.auth.user)}%
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => dispatch(setShowProfilePrompt(false))}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={() => {
                    dispatch(setShowProfilePrompt(false));
                    navigateTo(`/profile/complet`);
                  }}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
                >
                  Complete now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfilePrompt;
