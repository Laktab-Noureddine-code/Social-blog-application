/* eslint-disable react/prop-types */


import { useState } from "react";
import { Image } from "@unpic/react";
import { Star, Heart, Bookmark, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

function BlogPost({
  id,
  title,
  content,
  author,
  date,
  likes,
  saves,
  comments,
  imageUrl,
  highlights = [],
}) {
  // Split content into paragraphs
  const paragraphs = content.split("\n\n").filter(Boolean);

  // State for reactions
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [savesCount, setSavesCount] = useState(saves);

  // Animation states
  const [animatingLike, setAnimatingLike] = useState(false);
  const [animatingSave, setAnimatingSave] = useState(false);

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));
    setAnimatingLike(true);
    setTimeout(() => setAnimatingLike(false), 500);
  };

  const handleSave = () => {
    setHasSaved(!hasSaved);
    setSavesCount((prev) => (hasSaved ? prev - 1 : prev + 1));
    setAnimatingSave(true);
    setTimeout(() => setAnimatingSave(false), 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: `/blog/${id}`,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(window.location.origin + `/blog/${id}`)
        .then(() => alert("Link copied to clipboard!"))
        .catch(console.error);
    }
  };

  return (
    <article className="max-md:mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        {author.category && (
          <div className="mb-2 flex items-center">
            <div className="mr-2 h-5 w-1 rounded-full bg-primary" />
            <span className="text-sm font-medium text-primary">
              In {author.category} by {author.name}
            </span>
          </div>
        )}

        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h1>

        {/* Simple metadata display */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 text-yellow-400" />
            <span>{date}</span>
          </div>

          <div className="flex items-center">
            <Heart className="mr-1 h-4 w-4 text-rose-500" />
            <span>{likesCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center">
            <Bookmark className="mr-1 h-4 w-4 text-blue-500" />
            <span>{savesCount}</span>
          </div>

          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4 text-green-500" />
            <span>{comments}</span>
          </div>
        </div>

        {/* Reaction buttons */}
        <div className="flex flex-wrap items-center gap-2 border-t border-b py-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-full transition-all",
              hasLiked && "bg-rose-50 text-rose-500",
              animatingLike && "scale-110"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", hasLiked && "fill-rose-500")} />
            <span>{hasLiked ? "Liked" : "Like"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-full transition-all",
              hasSaved && "bg-blue-50 text-blue-500",
              animatingSave && "scale-110"
            )}
            onClick={handleSave}
          >
            <Bookmark className={cn("h-4 w-4", hasSaved && "fill-blue-500")} />
            <span>{hasSaved ? "Saved" : "Save"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 rounded-full"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Comment</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 rounded-full"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
        <Image
          src={imageUrl || "/placeholder.svg"}
          // src={"images/img1.jpg"}
          alt={title}
          fill
          className="object-cover h-full w-full"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute bottom-2 right-2 text-xs text-white/80">
          Image Created by Canva
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        {paragraphs.map((paragraph, index) => {
          // Check if this paragraph is a highlight
          const isHighlight = highlights.some((h) => paragraph.includes(h));

          return (
            <div key={index} className="relative">
              <p className={isHighlight ? "font-medium" : ""}>{paragraph}</p>

              {isHighlight && (
                <div className="absolute right-0 top-0 rounded-sm bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  Top highlight
                </div>
              )}
            </div>
          );
        })}

        {author.email && (
          <div className="my-8 rounded-lg border border-muted bg-muted/20 p-4 text-center">
            <p className="italic">
              If you are looking to grow your website using our proven SEO
              strategies
            </p>
            <p className="mt-2">
              If yes, then please feel free to contact me here:{" "}
              <a
                href={`mailto:${author.email}`}
                className="text-primary underline"
              >
                {author.email}
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Floating reaction bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 md:hidden">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center rounded-full",
              hasLiked && "text-rose-500"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-5 w-5", hasLiked && "fill-rose-500")} />
            <span className="text-xs">Like</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center rounded-full",
              hasSaved && "text-blue-500"
            )}
            onClick={handleSave}
          >
            <Bookmark className={cn("h-5 w-5", hasSaved && "fill-blue-500")} />
            <span className="text-xs">Save</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Comment</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center rounded-full"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
