"use client";
import "react-photo-view/dist/react-photo-view.css";
import { useState, useEffect, useTransition, useRef } from "react";
import Image from "next/image";
import {
  DeleteOwnPost,
  GetPosts,
  getUserProfile,
  LikePostById,
  ListOwnPosts,
} from "@/lib/services/api-service";
import { FaCheck, FaComment, FaUser } from "react-icons/fa";
import { IoHeartDislike, IoHeartOutline } from "react-icons/io5";
import CustomButton from "@/components/web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import SlidingModal from "@/components/web-components/modals/sliding-modal";
import PostModalComponent from "@/components/home/post/comps/post-modal";
import AddPostForm from "@/components/home/post/comps/add-post-form";
import { sendMessageBetweenUsers } from "@/lib/services/firebase-service";
import { BsThreeDots } from "react-icons/bs";
import Loading from "../../loading";
import PopupComp from "@/components/web-components/popup/popup";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { timeAgo } from "@/lib/utils/utils";
const hiMessages = [
  "Merhaba Günün nasıl geçiyor.",
  "Merhaba tanışabilir miyiz?",
  "Selam! Nerelisin?",
  "Merhaba! Seninle sohbet etmek güzel olurdu",
];

const getRandomHiMessage = () => {
  const randomIndex = Math.floor(Math.random() * hiMessages.length);
  return hiMessages[randomIndex];
};

export default function Page() {
  const [posts, setPosts] = useState(null);
  const [isPending, startTransition] = useTransition();
  const popupRef = useRef(null);
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [openDropdowns, setOpenDropdowns] = useState({});
  const router = useRouter();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await ListOwnPosts();
        setPosts(res.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchPosts();
  }, []);

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
  const sayHiToUser = async (sender, receiverId) => {
    const res = await getUserProfile(receiverId);
    const receiver = res.data.data;
    if (sender && receiver) {
      const hiMessage = getRandomHiMessage();
      await sendMessageBetweenUsers(
        sender.email,
        receiver.email,
        hiMessage,
        sender,
        receiver,
        "text"
      );
      router.push(`/chat/${receiver.id}`);
    }
  };
  const toggleDropdown = (postId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  const handleDeletePost = async (postId) => {
    try {
      await DeleteOwnPost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      popupRef.current.triggerPopup(
        <FaCheck size={24} />,
        "Gönderi başarıyla silindi!"
      );
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between items-center py-2">
        <h1 className=" text-primary text-xl">Anlarım</h1>
        <SlidingModal
          OpenButton={
            <button className="bg-primary transition-all text-black px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white">
              Anı Paylaş
            </button>
          }
        >
          <AddPostForm></AddPostForm>
        </SlidingModal>
      </div>
      <div className="mx-auto">
        {posts ? (
          posts?.length > 0 ? (
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
                        src={`${fileBaseUrl}/${post.user.profileimages}`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <FaUser className="text-gray-400" size={40} />
                    )}
                    <div className="ml-3">
                      <p className="font-semibold text-sm">
                        {apiUser?.id === post.user_id
                          ? "Sen"
                          : post?.user?.fullName ?? "Anonim"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {timeAgo(new Date(post.created_at))}
                      </p>
                    </div>
                  </div>
                  {post.user_id !== apiUser?.id && (
                    <div className="Flex items-center p-4">
                      <CustomButton
                        className={
                          "!p-1 bg-red-200 text-red-400 right-3 top-1/2   italic"
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          sayHiToUser(apiUser, post?.user_id);
                        }}
                      >
                        Hi
                        <span role="img" aria-label="Öne Çıkan Yayıncılar">
                          ❤️
                        </span>
                      </CustomButton>
                    </div>
                  )}
                </div>
                <div className="p-2 text-lg text-primary">
                  <span>{post.title}</span>
                  <p className="text-sm text-white">{post.content}</p>
                </div>
                <div>
                  <PhotoProvider>
                    <PhotoView
                      src={
                        post?.last_picture?.picture_path
                          ? `${fileBaseUrl}/${post?.last_picture?.picture_path}`
                          : ""
                      }
                    >
                      <Image
                        src={
                          post?.last_picture?.picture_path
                            ? `${fileBaseUrl}/${post?.last_picture?.picture_path}`
                            : ""
                        }
                        alt={post.title}
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-4">
                      <button
                        className="relative"
                        onClick={() => handleLike(post.id)}
                      >
                        {post.liked_by_user ? (
                          <IoHeartDislike className="text-primary " size={24} />
                        ) : (
                          <IoHeartOutline size={24} />
                        )}
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold rounded-full px-1">
                          {post.likes_count > 0 ? post.likes_count : ""}
                        </span>
                      </button>
                      <button>
                        <SlidingModal
                          OpenButton={
                            <FaComment className="text-primary" size={20} />
                          }
                        >
                          <PostModalComponent id={post.id} />
                          <div className="block">
                            <ul>
                              <li>Sil</li>
                            </ul>
                          </div>
                        </SlidingModal>
                      </button>
                    </div>
                    <div className="relative">
                      <BsThreeDots
                        size={24}
                        onClick={() => toggleDropdown(post.id)}
                      />
                      {openDropdowns[post.id] && (
                        <div className="absolute right-0 top-8 bg-gray-800 text-white p-2 rounded-md shadow-lg w-28">
                          <ul className="space-y-2">
                            <li
                              onClick={() => handleDeletePost(post.id)}
                              className="px-3 py-2 cursor-pointer hover:bg-red-500 hover:text-white rounded-md transition"
                            >
                              Sil 🗑️
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Gönderi bulunamadı.</p>
          )
        ) : (
          <Loading />
        )}
      </div>
      <PopupComp ref={popupRef} />
    </div>
  );
}
