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
    <div 
      className="p-6 max-w-6xl mx-auto bg-cover bg-center" 
      style={{ backgroundImage: "url('heroBg.png')" }} // Replace with your image path
    >
      <h1 className="text-3xl font-bold mb-5 text-center text-yellow-800">

      "Understanding API Fetching and Data Handling in React"
      </h1>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li
            key={post.id}
            className="border p-5 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out bg-pink-300"
          >
            <h2 className="text-xl font-bold text-red-800">{post.title}</h2>
            <p className="text-black-800">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
