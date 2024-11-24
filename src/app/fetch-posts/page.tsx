"use client";

import { useEffect, useState } from "react";
import './globals.css'; // Adjust the path as necessary

export default function FetchPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/external");  // Fetch posts from API route
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-8xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-yellow-700">Hello this is api </h1>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li
            key={post.id}
            className="border p-4 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out bg-white"
          >
            <h2 className="text-xl font-semibold text-pink-800">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
