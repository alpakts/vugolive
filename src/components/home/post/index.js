"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { GetPosts, getUserProfile, LikePostById } from "@/lib/services/api-service";
import { FaComment, FaUser } from "react-icons/fa";
import { IoHeartDislike, IoHeartOutline } from "react-icons/io5";
import CustomButton from "@/components/web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import SlidingModal from "@/components/web-components/modals/sliding-modal";
import PostModalComponent from "./comps/post-modal";
import { sendMessageBetweenUsers } from "@/lib/services/firebase-service";
const hiMessages = [
  "Merhaba Günün nasıl geçiyor.",
  "Merhaba tanışabilir miyiz?",
  "Selam! Nerelisin?",
  "Merhaba! Seninle sohbet etmek güzel olurdu"
];

const getRandomHiMessage = () => {
  const randomIndex = Math.floor(Math.random() * hiMessages.length);
  return hiMessages[randomIndex];
};

export default function PostComponent() {
  const [posts, setPosts] = useState([]);
  const [isPending, startTransition] = useTransition();
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const router = useRouter();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await GetPosts();
        setPosts(res.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchPosts();
  }, []);
 const sayHiToUser = async (sender, receiverId) => {
  const res = await getUserProfile(receiverId);
  const receiver = res.data.data;
    if (sender && receiver) {
      const hiMessage = getRandomHiMessage();
      await sendMessageBetweenUsers(sender.email, receiver.email, hiMessage, sender, receiver, "text");
      router.push(`/chat/${receiver.id}`);
    }
  };
  const handleLike = async (postId) => {
    startTransition(async () => {
      try {
        await LikePostById(postId);

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  liked_by_user: !post.liked_by_user,
                  likes_count: post.liked_by_user
                    ? post.likes_count - 1
                    : post.likes_count + 1,
                }
              : post
          )
        );
      } catch (error) {
        console.error("Like Error:", error);
      }
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 border border-gray-800 rounded-lg mb-6"
            >
             <div className="flex justify-between items-center border-b border-gray-800"> 
             <div className="flex items-center p-4">
                {post?.user?.profileimages ? (
                  <Image
                    alt="User Avatar"
                    src={`${fileBaseUrl}/${post?.user?.profileimages}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <FaUser className="text-gray-400" size={40} />
                )}
                <div className="ml-3">
                  <p className="font-semibold text-sm">
                    {apiUser?.id === post.user_id ? "Sen" : post?.user?.fullName  ?? "Anonim"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              { post.user_id !== apiUser?.id &&
                <div className="Flex items-center p-4">
              <CustomButton className={'!p-1 bg-red-200 text-red-400 right-3 top-1/2   italic'} onClick={(event)=>{
                  event.stopPropagation();
                  sayHiToUser(apiUser,post?.user_id);
                }} >
                  Hi
                  <span role="img" aria-label="Öne Çıkan Yayıncılar">
                    ❤️
                  </span>
                </CustomButton>
                </div>
              }
             </div>

              <div onClick={()=> {
                window.location.href = `/posts/${post.id}`;
              }}>
                <Image
                  src={post?.last_picture?.picture_path ?`${fileBaseUrl}/${post?.last_picture?.picture_path}`:''}
                  alt={post.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-4">
                    <button className="relative" onClick={() => handleLike(post.id)}>
                      {post.liked_by_user ? (
                        <IoHeartDislike className="text-red-500 " size={24} />
                      ) : (
                        <IoHeartOutline size={24} />
                      )}
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                        {post.likes_count > 0 ? post.likes_count : ""}
                      </span>
                    </button>
                    <button>
                    <SlidingModal OpenButton={<FaComment size={20} />}  >
                      <PostModalComponent id={post.id} />
                    </SlidingModal>
                      
                    </button>
                  </div>
                </div>
                <p className="text-sm">{post.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Gönderi bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
