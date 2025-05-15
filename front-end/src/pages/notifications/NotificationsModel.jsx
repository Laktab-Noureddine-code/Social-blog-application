import { Dialog } from "@/components/ui/dialog"; // Import dialog component (shadcn)

function NotificationsModel({ isModalOpen, setIsModalOpen, closeModal }) {
  return (
      <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 max-h-60% w-96 bg-white shadow-lg rounded-md overflow-auto z-50"
          id="modal-overlay"
          onClick={closeModal}
      >
          <div className="p-4">
              {/* Hardcoded Notifications */}
              <div className="space-y-4">
                  <div className="p-2 border-b">
                      <p className="text-gray-700">You have been invited to join the group "Group Name"</p>
                  </div>
                  <div className="p-2 border-b">
                      <p className="text-gray-700">Your post has received a new comment!</p>
                  </div>
                  <div className="p-2">
                      <p className="text-gray-700">Someone liked your photo.</p>
                  </div>
              </div>
          </div>
      </Dialog>
  )
}

export default NotificationsModel
