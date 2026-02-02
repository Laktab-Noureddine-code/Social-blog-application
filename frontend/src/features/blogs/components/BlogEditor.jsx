/* eslint-disable react/prop-types */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useState, useRef } from 'react';
import './BlogEditor.css';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Quote, Code, List, ListOrdered, Link as LinkIcon,
  Image as ImageIcon, Youtube as YoutubeIcon, X
} from 'lucide-react';

// Import shadcn components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

// Create a lowlight instance with common languages
const lowlight = createLowlight(common)

// Import the languages you want to support
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import php from 'highlight.js/lib/languages/php'

// Register languages
lowlight.register('javascript', javascript)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('java', java)
lowlight.register('python', python)
lowlight.register('php', php)

// Menu button component
const MenuButton = ({ onClick, active, disabled, children, title }) => {
  return (
    <button
      onClick={onClick}
      className={`menu-button ${active ? 'is-active' : ''}`}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

const BlogEditor = ({ blog, setBlog }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const editor = useEditor({
    extensions: [
      // Replace StarterKit.configure with a custom configuration
      StarterKit.configure({
        // Disable the default code block since we'll use CodeBlockLowlight
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'code-block',
        },
        languageClassPrefix: 'language-',
      }),
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image,
      Youtube.configure({
        controls: true,
      }),
    ],
    content: blog,
    onUpdate: ({ editor }) => {
      setBlog(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    setShowImageDialog(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ 
        src: imageUrl
      }).run();
      setShowImageDialog(false);
      resetImageFields();
    } else if (selectedImage) {
      editor.chain().focus().setImage({ 
        src: selectedImage
      }).run();
      setShowImageDialog(false);
      resetImageFields();
      setSelectedImage(null);
    }
  };

  const resetImageFields = () => {
    setImageUrl('');
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addVideo = () => {
    setShowVideoDialog(true);
  };

  const handleVideoSubmit = () => {
    if (videoUrl) {
      editor.chain().focus().setYoutubeVideo({ 
        src: videoUrl
      }).run();
      
      setShowVideoDialog(false);
      resetVideoFields();
    }
  };

  const resetVideoFields = () => {
    setVideoUrl('');
  };

  const addLink = () => {
    // Check if the selected text is already a link
    if (editor.isActive('link')) {
      // If it's already a link, remove it
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Otherwise, open the dialog to add a link
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');
    setLinkText(text);
    setShowLinkDialog(true);
  };

  const handleLinkSubmit = () => {
    if (linkUrl) {
      // If there's selected text, use it; otherwise use the link URL as text
      if (linkText) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      } else {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run();
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  // Function to add a code block with a specific language
  const addCodeBlock = (language = 'javascript') => {
    editor.chain().focus().toggleCodeBlock({ language }).run();
  };

  return (
    <div className="text-editor-container">
      <div className="editor-toolbar ">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </MenuButton>
        
        <span className="toolbar-divider"></span>
        
        <select
          className="heading-select"
          value={editor.isActive('heading', { level: 1 }) ? 'heading1' : 
                 editor.isActive('heading', { level: 2 }) ? 'heading2' : 
                 editor.isActive('heading', { level: 3 }) ? 'heading3' : 
                 editor.isActive('heading', { level: 4 }) ? 'heading4' : 
                 editor.isActive('heading', { level: 5 }) ? 'heading5' : 
                 editor.isActive('heading', { level: 6 }) ? 'heading6' : 'paragraph'}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              const level = parseInt(value.replace('heading', ''));
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="heading4">Heading 4</option>
          <option value="heading5">Heading 5</option>
          <option value="heading6">Heading 6</option>
        </select>
        
        <span className="toolbar-divider"></span>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => addCodeBlock('javascript')}
          active={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code size={16} />
        </MenuButton>Blog
        
        <span className="toolbar-divider"></span>
        
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="Center"
        >
          <AlignCenter size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        >
          <AlignJustify size={16} />
        </MenuButton>
        
        <span className="toolbar-divider"></span>
        
        <MenuButton
          onClick={addLink}
          active={editor.isActive('link')}
          title="Link"
        >
          <LinkIcon size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={addImage}
          title="Image"
        >
          <ImageIcon size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={addVideo}
          title="YouTube Video"
        >
          <YoutubeIcon size={16} />
        </MenuButton>
        
        <span className="toolbar-divider"></span>
        
        <MenuButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear Formatting"
        >
          <X size={16} />
        </MenuButton>
      </div>

      <EditorContent editor={editor} className="editor-content" />

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={(open) => {
        if (!open) resetImageFields();
        setShowImageDialog(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Upload an image from your device or enter a URL
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="col-span-4">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="col-span-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-upload" className="col-span-4">
                Or upload from your device
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="col-span-4"
              />
            </div>

            {(selectedImage || imageUrl) && (
              <div className="col-span-4 mt-2">
                <Label className="block mb-2">Preview</Label>
                <div className="border border-gray-200 rounded p-2 flex justify-center">
                  <img
                    src={selectedImage || imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImageUrlSubmit}
              disabled={!imageUrl && !selectedImage}
            >
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert YouTube Video</DialogTitle>
            <DialogDescription>
              Enter a YouTube video URL
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="video-url" className="col-span-4">
                URL YouTube
              </Label>
              <Input
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="col-span-4"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideoDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVideoSubmit} disabled={!videoUrl}>
              Insert Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Enter the URL and link text
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-url" className="col-span-4">
                Link URL
              </Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-4"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-text" className="col-span-4">
                Link Text (optional)
              </Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
                className="col-span-4"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit} disabled={!linkUrl}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogEditor;


