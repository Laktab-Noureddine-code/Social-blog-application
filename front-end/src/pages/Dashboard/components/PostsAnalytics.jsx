import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const PostsAnalytics = ({ data }) => {
  if (!data) return null;

  const { postsPerUser, postsPerPage, postsPerGroup } = data;

  return (
    <div className="space-y-8">
      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-4">Posts per User</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={postsPerUser}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-4">Posts per Page</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={postsPerPage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-4">Posts per Group</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={postsPerGroup}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
