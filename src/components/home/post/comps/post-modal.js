"use client";

import { useState, useEffect, useTransition } from "react";
import { GetPostById, LikePostById } from "@/lib/services/api-service";
import PostDetailClient from "@/components/home/post/comps/post-detail";
import { FaBackward, FaChevronLeft } from "react-icons/fa";

export default function PostModalComponent({ id }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await GetPostById(id);
        setPostData(res.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-10">Yükleniyor...</div>;
  }

  if (!postData || !postData.post) {
    return <div className="text-white text-center mt-10">Gönderi bulunamadı.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">

      <div className="max-w-4xl mx-auto">
      
        <PostDetailClient postData={postData} setPostData={setPostData} />
      </div>
    </div>
  );
}
