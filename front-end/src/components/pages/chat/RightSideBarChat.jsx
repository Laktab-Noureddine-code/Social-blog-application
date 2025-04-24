const RightSideBarChat = () => {
    const sharedMedia = [
        { id: 1, type: "image", url: "public/lovable-uploads/43dd6c04-d71e-4710-821f-65f075133660.png" },
        // Add more media items
    ];

    const sharedFiles = [
        {
            id: 1,
            name: "Document.pdf",
            size: "1.2MB",
        },
        {
            id: 2,
            name: "Essay - Biology",
            size: "850KB",
        },
    ];

    return (
        <div className="w-full">
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Chat details</h2>
                </div>

                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500">Shared media (286)</h3>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        {sharedMedia.map((media) => (
                            <div
                                key={media.id}
                                className="aspect-square rounded-lg bg-gray-100 overflow-hidden"
                            >
                                <img
                                    src={media.url}
                                    alt="Shared media"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500">Shared files (4)</h3>
                    <div className="mt-2 space-y-2">
                        {sharedFiles.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center p-2 rounded-lg hover:bg-gray-50"
                            >
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSideBarChat;