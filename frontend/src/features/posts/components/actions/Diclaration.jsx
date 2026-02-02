/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { addRapport } from "@/Redux/PostsSilce";
import api from "@/lib/api";

function Declaration({ post_id, onClose }) {
  const [cause, setCause] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatchEvent = useDispatch();

  const causes = [
    "Spam",
    "Hateful or abusive content",
    "False information",
    "Harassment or bullying",
    "Violence or threat",
    "Other",
  ];

  const handleDeclare = async () => {
    if (!cause) return;
    setLoading(true);

    try {
      const response = await api.post(`/api/declare/${post_id}`, { cause });
      dispatchEvent(addRapport({ idPost: post_id, response: response.data }));
      onClose();
    } catch (err) {
      console.error("Error declaring post:", err);
      alert("Failed to declare the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[450px] p-6 z-30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={20} />
          <h2 className="text-lg font-medium text-gray-900">Report Post</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X size={18} />
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="cause"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Reason for reporting
        </label>
        <div className="relative">
          <select
            id="cause"
            className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none bg-white text-gray-700 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
          >
            <option value="">Select a reason...</option>
            {causes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Your report will be reviewed by our moderation team.
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleDeclare}
          disabled={loading || !cause}
          className={`w-full py-2 px-4 rounded-md text-center ${
            !cause
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-center text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Declaration;
