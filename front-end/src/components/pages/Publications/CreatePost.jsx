// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { X, ImageIcon, FileVideo, Upload, Trash2 } from "lucide-react";
// import { cn } from "@/lib/utils";

// function CreatePost() {
//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Here you would typically send the data to your backend
//     console.log("Submitting publication:", {
//       text,
//       files: files.map((f) => f.file),
//     });

//     // Reset form after submission
//     setText("");
//     setFiles([]);
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
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
//                 isDragging
//                   ? "border-primary bg-primary/5"
//                   : "border-muted-foreground/25",
//                 files.length > 0 && "pb-4"
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
//                   <span className="font-medium">Cliquez pour télécharger</span>{" "}
//                   ou glissez-déposez
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   Images et vidéos acceptées
//                 </p>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={triggerFileInput}
//                   className="mt-2"
//                 >
//                   Sélectionner des fichiers
//                 </Button>
//               </div>

//               {files.length > 0 && (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
//                   {files.map((file) => (
//                     <div key={file.id} className="relative group">
//                       <div className="aspect-square rounded-md overflow-hidden border bg-muted">
//                         {file.type === "image" ? (
//                           <img
//                             src={file.preview || "/placeholder.svg"}
//                             alt="Preview"
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <video
//                             src={file.preview}
//                             className="h-full w-full object-cover"
//                             controls
//                           />
//                         )}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeFile(file.id)}
//                         className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm opacity-90 hover:opacity-100"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                       <div className="absolute bottom-1 left-1 bg-background/80 rounded-md p-1 text-xs flex items-center gap-1">
//                         {file.type === "image" ? (
//                           <ImageIcon className="h-3 w-3" />
//                         ) : (
//                           <FileVideo className="h-3 w-3" />
//                         )}
//                         {(file.file.size / (1024 * 1024)).toFixed(1)} MB
//                       </div>
//                     </div>
//                   ))}
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
//           >
//             <Trash2 className="mr-2 h-4 w-4" />
//             Effacer tout
//           </Button>
//           <Button type="submit" disabled={!text && files.length === 0}>
//             Publier
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }

// export default CreatePost;

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  X,
  ImageIcon,
  FileVideo,
  Upload,
  Trash2,
  Loader,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const addFiles = (fileList) => {
    const newFiles = [];

    Array.from(fileList).forEach((file) => {
      const id = Math.random().toString(36).substring(2, 9);

      if (file.type.startsWith("image/")) {
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
          type: "image",
          id,
        });
      } else if (file.type.startsWith("video/")) {
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
          type: "video",
          id,
        });
      }
    });

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);

      // Revoke object URLs to avoid memory leaks
      const fileToRemove = prevFiles.find((file) => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return updatedFiles;
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Submitting publication:", {
        text,
        files: files.map((f) => f.file),
      });

      toast({
        title: "Publication réussie",
        description: "Votre publication a été envoyée avec succès.",
      });

      // Reset form after submission
      setText("");
      setFiles([]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication.",
        variant: "destructive",
      });
      console.error("Error submitting publication:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Créer une publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Votre texte</Label>
            <Textarea
              id="text"
              placeholder="Qu'avez-vous à partager aujourd'hui ?"
              value={text}
              onChange={handleTextChange}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Médias</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25",
                files.length > 0 && "pb-4"
              )}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Cliquez pour télécharger</span>{" "}
                  ou glissez-déposez
                </p>
                <p className="text-xs text-muted-foreground">
                  Images et vidéos acceptées
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={triggerFileInput}
                  className="mt-2"
                >
                  Sélectionner des fichiers
                </Button>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    Glissez et déposez pour réorganiser vos médias
                  </p>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="mediaFiles" direction="horizontal">
                      {(provided) => (
                        <div
                          className="flex flex-wrap gap-4"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{ minHeight: "100px" }}
                        >
                          {files.map((file, index) => (
                            <Draggable
                              key={file.id}
                              draggableId={file.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={cn(
                                    "relative group w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)]",
                                    snapshot.isDragging ? "z-50" : ""
                                  )}
                                  style={{
                                    ...provided.draggableProps.style,
                                    transform: snapshot.isDragging
                                      ? provided.draggableProps.style?.transform
                                      : "none",
                                  }}
                                >
                                  <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                                    {file.type === "image" ? (
                                      <img
                                        src={file.preview || "/placeholder.svg"}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <video
                                        src={file.preview}
                                        className="h-full w-full object-cover"
                                        controls
                                      />
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(file.id)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm opacity-90 hover:opacity-100"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                  <div
                                    {...provided.dragHandleProps}
                                    className="absolute top-1 left-1 bg-background/80 rounded-md p-1 cursor-grab active:cursor-grabbing hover:bg-background/90"
                                  >
                                    <GripVertical className="h-4 w-4" />
                                  </div>
                                  <div className="absolute bottom-1 left-1 bg-background/80 rounded-md p-1 text-xs flex items-center gap-1">
                                    {file.type === "image" ? (
                                      <ImageIcon className="h-3 w-3" />
                                    ) : (
                                      <FileVideo className="h-3 w-3" />
                                    )}
                                    {(file.file.size / (1024 * 1024)).toFixed(
                                      1
                                    )}{" "}
                                    MB
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setText("");
              setFiles([]);
            }}
            disabled={isSubmitting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Effacer tout
          </Button>
          <Button
            type="submit"
            disabled={(!text && files.length === 0) || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Envoi...
              </span>
            ) : (
              "Publier"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}



// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   X,
//   ImageIcon,
//   FileVideo,
//   Upload,
//   Trash2,
//   Loader,
//   GripVertical,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { toast } from "sonner";

// export default function CreatePost() {
//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef(null);

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
//       await new Promise((resolve) => setTimeout(resolve, 2000));

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
//                 isDragging
//                   ? "border-primary bg-primary/5"
//                   : "border-muted-foreground/25",
//                 files.length > 0 && "pb-4"
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
//                   <span className="font-medium">Cliquez pour télécharger</span>{" "}
//                   ou glissez-déposez
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   Images et vidéos acceptées
//                 </p>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={triggerFileInput}
//                   className="mt-2"
//                 >
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
//                             <Draggable
//                               key={file.id}
//                               draggableId={file.id}
//                               index={index}
//                             >
//                               {(provided, snapshot) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
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
//                                       <video
//                                         src={file.preview}
//                                         className="h-full w-full object-cover"
//                                         controls
//                                       />
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
//                                     {file.type === "image" ? (
//                                       <ImageIcon className="h-3 w-3" />
//                                     ) : (
//                                       <FileVideo className="h-3 w-3" />
//                                     )}
//                                     {(file.file.size / (1024 * 1024)).toFixed(
//                                       1
//                                     )}{" "}
//                                     MB
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
