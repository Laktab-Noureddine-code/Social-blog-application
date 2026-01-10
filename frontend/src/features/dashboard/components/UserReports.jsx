import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

export const UserReports = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post ID</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Reports</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.reason}</TableCell>
              <TableCell>{post.reports}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/posts/${post.id}`}>View Post</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
