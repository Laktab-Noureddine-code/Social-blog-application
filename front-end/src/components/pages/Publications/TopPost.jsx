// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { X, ImageIcon, FileVideo, Upload, Trash2, Loader, GripVertical } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// // import { useToast } from "@/hooks/use-toast";
// import { toast } from "sonner";
// // import PostCreator from "@/components/PostCreator";
// import CreatePost from "./CreatePost";
// // Rename to PublicationForm to keep it as a component
// export default function Index() {
//   return (
//     <div className="container max-w-4xl py-6">
//       {/* <PostCreator /> */}
//       <CreatePost />
//     </div>
//   );
// }

// // Export the PublicationForm component so it can be used by PostCreator
// export function TopPost() {
//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef(null);
// //   const { toast } = useToast();

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       addFiles(e.target.files);
//     }
//   };

//   const addFiles = (fileList) => {
//     const newFiles = [];

//     Array.from(fileList).forEach((file) => {
//       const id = Math.random().toString(36).substring(2, 9);

//       if (file.type.startsWith("image/")) {
//         newFiles.push({
//           file,
//           preview: URL.createObjectURL(file),
//           type: "image",
//           id,
//         });
//       } else if (file.type.startsWith("video/")) {
//         newFiles.push({
//           file,
//           preview: URL.createObjectURL(file),
//           type: "video",
//           id,
//         });
//       }
//     });

//     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//   };

//   const removeFile = (id) => {
//     setFiles((prevFiles) => {
//       const updatedFiles = prevFiles.filter((file) => file.id !== id);

//       // Revoke object URLs to avoid memory leaks
//       const fileToRemove = prevFiles.find((file) => file.id === id);
//       if (fileToRemove) {
//         URL.revokeObjectURL(fileToRemove.preview);
//       }

//       return updatedFiles;
//     });
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isDragging) {
//       setIsDragging(true);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       addFiles(e.dataTransfer.files);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Simulate API call with a delay
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Here you would typically send the data to your backend
//       console.log("Submitting publication:", {
//         text,
//         files: files.map((f) => f.file),
//       });

//       toast({
//         title: "Publication réussie",
//         description: "Votre publication a été envoyée avec succès.",
//       });

//       // Reset form after submission
//       setText("");
//       setFiles([]);
//     } catch (error) {
//       toast({
//         title: "Erreur",
//         description: "Une erreur est survenue lors de la publication.",
//         variant: "destructive",
//       });
//       console.error("Error submitting publication:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   // Handle drag and drop reordering of files
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
    
//     const items = Array.from(files);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
    
//     setFiles(items);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card className="w-full max-w-3xl mx-auto">
//         <CardHeader>
//           <CardTitle>Créer une publication</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="text">Votre texte</Label>
//             <Textarea
//               id="text"
//               placeholder="Qu'avez-vous à partager aujourd'hui ?"
//               value={text}
//               onChange={handleTextChange}
//               className="min-h-[120px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Médias</Label>
//             <div
//               className={cn(
//                 "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
//                 isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
//                 files.length > 0 && "pb-4",
//               )}
//               onDragEnter={handleDragEnter}
//               onDragLeave={handleDragLeave}
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 multiple
//                 accept="image/*,video/*"
//                 className="hidden"
//               />

//               <div className="flex flex-col items-center justify-center gap-2">
//                 <Upload className="h-10 w-10 text-muted-foreground" />
//                 <p className="text-sm text-muted-foreground">
//                   <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
//                 </p>
//                 <p className="text-xs text-muted-foreground">Images et vidéos acceptées</p>
//                 <Button type="button" variant="outline" onClick={triggerFileInput} className="mt-2">
//                   Sélectionner des fichiers
//                 </Button>
//               </div>

//               {files.length > 0 && (
//                 <div className="mt-6">
//                   <p className="text-xs text-muted-foreground mb-2">
//                     Glissez et déposez pour réorganiser vos médias
//                   </p>
//                   <DragDropContext onDragEnd={handleDragEnd}>
//                     <Droppable droppableId="mediaFiles" direction="horizontal">
//                       {(provided) => (
//                         <div
//                           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                         >
//                           {files.map((file, index) => (
//                             <Draggable key={file.id} draggableId={file.id} index={index}>
//                               {(provided, snapshot) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   className={cn(
//                                     "relative group",
//                                     snapshot.isDragging ? "z-50" : ""
//                                   )}
//                                 >
//                                   <div className="aspect-square rounded-md overflow-hidden border bg-muted">
//                                     {file.type === "image" ? (
//                                       <img
//                                         src={file.preview || "/placeholder.svg"}
//                                         alt="Preview"
//                                         className="h-full w-full object-cover"
//                                       />
//                                     ) : (
//                                       <video src={file.preview} className="h-full w-full object-cover" controls />
//                                     )}
//                                   </div>
//                                   <button
//                                     type="button"
//                                     onClick={() => removeFile(file.id)}
//                                     className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm opacity-90 hover:opacity-100"
//                                   >
//                                     <X className="h-4 w-4" />
//                                   </button>
//                                   <div
//                                     {...provided.dragHandleProps}
//                                     className="absolute top-1 left-1 bg-background/80 rounded-md p-1 cursor-grab active:cursor-grabbing"
//                                   >
//                                     <GripVertical className="h-4 w-4" />
//                                   </div>
//                                   <div className="absolute bottom-1 left-1 bg-background/80 rounded-md p-1 text-xs flex items-center gap-1">
//                                     {file.type === "image" ? <ImageIcon className="h-3 w-3" /> : <FileVideo className="h-3 w-3" />}
//                                     {(file.file.size / (1024 * 1024)).toFixed(1)} MB
//                                   </div>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>
//                   </DragDropContext>
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => {
//               setText("");
//               setFiles([]);
//             }}
//             disabled={isSubmitting}
//           >
//             <Trash2 className="mr-2 h-4 w-4" />
//             Effacer tout
//           </Button>
//           <Button
//             type="submit"
//             disabled={(!text && files.length === 0) || isSubmitting}
//             className="min-w-[100px]"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center">
//                 <Loader className="mr-2 h-4 w-4 animate-spin" />
//                 Envoi...
//               </span>
//             ) : (
//               "Publier"
//             )}
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }






// //  {
// //    /* Post creation area */
// //  }
// //  <Card className="mb-4 p-4">
// //    <form onSubmit={handlePostSubmit} className="flex flex-col">
// //      <div className="flex items-center gap-3 mb-3">
// //        <Avatar className="w-8 h-8">
// //          <img
// //            src="/images/img2.jpg"
// //            alt="Your profile"
// //            className="w-full h-full object-cover rounded-full"
// //          />
// //        </Avatar>
// //        <input
// //          type="text"
// //          placeholder="What's on your mind?"
// //          className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
// //          value={newPostText}
// //          onChange={(e) => setNewPostText(e.target.value)}
// //        />
// //      </div>
// //      <div className="flex justify-between items-center">
// //        <div className="flex gap-2">
// //          <Button
// //            variant="ghost"
// //            size="sm"
// //            type="button"
// //            className="text-gray-500"
// //          >
// //            <Images className="h-5 w-5 mr-2" />
// //          </Button>
// //          <Button
// //            variant="ghost"
// //            size="sm"
// //            type="button"
// //            className="text-gray-500"
// //          >
// //            <Link2 className="h-5 w-5 mr-2" />
// //          </Button>
// //          <Button
// //            variant="ghost"
// //            size="sm"
// //            type="button"
// //            className="text-gray-500 hidden sm:flex"
// //          >
// //            <MapPin className="h-5 w-5 mr-2" />
// //          </Button>
// //          <Button
// //            variant="ghost"
// //            size="sm"
// //            type="button"
// //            className="text-gray-500 hidden sm:flex"
// //          >
// //            <SmilePlus className="h-5 w-5 mr-2" />
// //          </Button>
// //        </div>
// //        <Button
// //          size="sm"
// //          type="submit"
// //          className="bg-blue-500 text-white rounded-full px-4"
// //        >
// //          Post
// //        </Button>
// //      </div>
// //    </form>
// //  </Card>;







import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Images, Link2, MapPin, SmilePlus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreatePost from "./CreatePost";

function TopPost() {
  return (
    <Card className="mb-4 p-4">
      <Sheet>
        <div  className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <img
                src={
                  "/lovable-uploads/318eec08-afd7-4b6d-ae0d-ef925d482155.png"
                }
                alt="Your profile"
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
            <SheetTrigger asChild>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none cursor-pointer"
              />
            </SheetTrigger>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500"
                >
                  <Images className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500"
                >
                  <Link2 className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500 hidden sm:flex"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500 hidden sm:flex"
                >
                  <SmilePlus className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetTrigger asChild>
              <Button
                size="sm"
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4"
              >
                Post
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent
          side="top"
          className="h-[90vh] sm:h-auto overflow-y-auto absolute top-0 bg-transparent left-[50%] translate-x-[-50%] max-w-[500px] w-full md:w-[500px] "
        >
          <div className="py-6">
            <CreatePost />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
export default TopPost;
