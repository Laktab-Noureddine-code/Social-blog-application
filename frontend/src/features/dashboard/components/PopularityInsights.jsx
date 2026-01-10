import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export const PopularityInsights = ({ data }) => {
  if (!data) return null;

  const {
    mostPopularPage,
    mostPopularGroup,
    topLikedPosts,
    topCommentedPosts,
  } = data;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Most Popular Page</h3>
        <div className="rounded-lg border p-4">
          <p className="font-medium">{mostPopularPage.name}</p>
          <p className="text-sm text-muted-foreground">
            {mostPopularPage.followers} followers • {mostPopularPage.posts}{" "}
            posts
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Most Popular Group</h3>
        <div className="rounded-lg border p-4">
          <p className="font-medium">{mostPopularGroup.name}</p>
          <p className="text-sm text-muted-foreground">
            {mostPopularGroup.members} members • {mostPopularGroup.posts} posts
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Top 5 Posts by Likes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topLikedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell className="text-right">{post.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Top 5 Posts by Comments</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCommentedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell className="text-right">{post.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
