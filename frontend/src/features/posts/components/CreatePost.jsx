/* eslint-disable react/prop-types */





import { useState, useRef } from "react";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import {
  X,
  ImageIcon,
  FileVideo,
  Upload,
  Trash2,
  Loader,
  GripVertical,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import "@/style/Creare-Post.css";
import { addNewPost } from "@/Redux/PostsSilce";
export default function CreatePost({ onOpenChange,type, id_page, id_group }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const state = useSelector((state) => state.auth);
  const EventDispatcher = useDispatch();


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
      // Convert files to Base64
      const filePromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.file);
          reader.onload = () =>
            resolve({
              name: file.file.name,
              type: file.file.type,
              size: file.file.size,
              data: reader.result.split(",")[1], // Remove data:image/... prefix
            });
        });
      });

      const fileData = await Promise.all(filePromises);

      // Prepare JSON payload
      const payload = {
        text: text || "",
        files: fileData,
        type,
        ...(id_page !== undefined && { id_page }), // only adds it if it's defined
        ...(id_group !== undefined && { id_group }), // only adds it if it's defined
      };

      const { default: api } = await import("@/lib/api");
      const response = await api.post("/api/ajouter-post", payload);

      EventDispatcher(addNewPost(response.data.post[0]));
      onOpenChange?.(false);

      toast.success("Published successfully");
      setText("");
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
    <div className="h-screen flex flex-col justify-center">
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="">
      {/* <Card className="w-full max-w-3xl max-h-[95vh] mx-auto py-10 overflow-y-hidden"> */}
      <Card className="w-full max-w-3xl max-h-[95vh] mx-auto py-10 overflow-y-hidden" >
        <div className="max-h-[93vh] custom-scrollbar overflow-y-auto">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Your Text</Label>
              <Textarea
                id="text"
                placeholder="What would you like to share today?"
                value={text}
                onChange={handleTextChange}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Media</Label>
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
                    <span className="font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Images and videos accepted
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="mt-2"
                  >
                    Select Files
                  </Button>
                </div>

                {files.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs text-muted-foreground mb-2">
                      Drag and drop to reorder your media
                    </p>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable
                        droppableId="mediaFiles"
                        direction="horizontal"
                      >
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
                                        ? provided.draggableProps.style
                                            ?.transform
                                        : "none",
                                    }}
                                  >
                                    <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                                      {file.type === "image" ? (
                                        <img
                                          src={
                                            file.preview || "/placeholder.svg"
                                          }
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
              Clear All
            </Button>
            <Button
              type="submit"
              disabled={(!text && files.length === 0) || isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Publish"
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </form>
  </div>
  );
}
