/* eslint-disable react/prop-types */
import { Image } from "@unpic/react";
import { Star, Heart, Bookmark, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
 function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  likes,
  saves,
  comments,
  featured = false,
  imageUrl,
}) {
  return (
    <div className="group relative rounded-lg border bg-card shadow-sm transition-all hover:shadow-md my-5 max-md:mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-6">
          {author.category && (
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-5 w-1 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                In {author.category} by {author.name}
              </span>
            </div>
          )}

          <Link to={`/blogs/${id}`}>
            <h2 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">
              {title}
            </h2>
          </Link>

          <p className="mb-4 text-muted-foreground">{excerpt}</p>

          {/* Simple metadata display */}
          <div className="mt-auto flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 text-yellow-400" />
              <span>{date}</span>
            </div>

            <div className="flex items-center">
              <Heart className="mr-1 h-4 w-4 text-rose-500" />
              <span>{likes.toLocaleString()}</span>
            </div>

            <div className="flex items-center">
              <Bookmark className="mr-1 h-4 w-4 text-blue-500" />
              <span>{saves}</span>
            </div>

            <div className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4 text-green-500" />
              <span>{comments}</span>
            </div>
          </div>

          {/* Reaction Buttons */}
          <div className="mt-4 flex items-center space-x-2 border-t pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 rounded-full"
            >
              <Heart className="h-4 w-4 text-rose-500" />
              <span>Like</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 rounded-full"
            >
              <Bookmark className="h-4 w-4 text-blue-500" />
              <span>Save</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 rounded-full"
            >
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span>Comment</span>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "relative h-48 overflow-hidden md:h-auto md:w-1/3",
            featured ? "md:w-2/5" : "md:w-1/3"
          )}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105 h-full w-full max-h-[250px]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
