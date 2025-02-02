"use client";
import "./style.scss";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect, useState, useTransition } from "react";
import { LikePostById, CommentPostById } from "@/lib/services/api-service";
import Image from "next/image";
import { FaComment, FaUser } from "react-icons/fa";
import { IoHeartDislike, IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdSend } from "react-icons/io";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { timeAgo} from "@/lib/utils/utils";
export default function PostDetailClient({ postData, setPostData }) {
  const [isPending, startTransition] = useTransition();
  const { post, comments, pictures } = postData;
  const [commentText, setCommentText] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const router = useRouter();
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;

  const handleLike = async () => {
    startTransition(async () => {
      try {
        await LikePostById(post.id);
        setPostData((prev) => ({
          ...prev,
          post: {
            ...prev.post,
            liked_by_user: !prev.post.liked_by_user,
            likes_count: prev.post.liked_by_user
              ? prev.post.likes_count - 1
              : prev.post.likes_count + 1,
          },
        }));
      } catch (error) {
        console.error("Like Error:", error);
      }
    });
  };
  const handleCommentSubmit = async () => {
    startTransition(async () => {
      if (commentText.trim() === "") return;
    setCommentLoading(true);

    try {
      await CommentPostById(post.id, commentText);
      const newComment = {
        id: Date.now(),
        user_id: 1,
        post_id: post.id,
        comment: commentText,
        created_at: new Date().toISOString(),
        user: {
          fullName: "Sen",
          profileimages: null,
        },
      };

      setPostData((prev) => ({
        ...prev,
        post: {
          ...prev.post,
          comments_count: prev.post.comments_count + 1,
        },
        comments: [newComment, ...prev.comments],
      }));
      setCommentText("");
    } catch (error) {
      console.error("Yorum gönderme hatası:", error);
    } finally {
      setCommentLoading(false);
    }
  });
  };
  return (
    <>
      <div className="flex items-center px-4 pb-2">
        <Link
          href="#"
          onClick={() => {
            router.back();
          }}
          className="text-white mr-4"
        >
          <FiChevronLeft size={24} />
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-2 max-h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex items-center">
          {postData?.user?.profileimages ? (
            <Image
              alt="User Avatar"
              src={`${fileBaseUrl}/${postData.user.profileimages}`}
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <FaUser className="text-gray-400" size={50} />
          )}
          <div className="ml-3 text-start">
            <p className="font-semibold text-sm">
              {postData.user?.fullName ?? "Anonim"}
            </p>
            <p className="text-xs text-gray-400">
              { timeAgo(new Date(post.created_at))}
            </p>
          </div>
        </div>

              <PhotoProvider>
        <div className="my-4">
          {pictures.length > 0 && (
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="rounded-md"
            >
              {pictures.map((picture, index) => (
                <SwiperSlide key={index}>
                    <PhotoView
                      src={
                        picture.picture_path
                          ? `${fileBaseUrl}/${picture.picture_path}`
                          : ""
                      }
                    >
                      <Image
                        src={
                          picture.picture_path
                            ? `${fileBaseUrl}/${picture.picture_path}`
                            : ""
                        }
                        alt={post.title}
                        width={600}
                        height={600}
                        className="w-full h-auto object-contain rounded-md aspect-square bg-black"
                      />
                    </PhotoView>
                </SwiperSlide>
              ))}
                  
            </Swiper>
          )}
        </div>
              </PhotoProvider> 

        <div className="flex items-center space-x-4 mb-4">
          <button className="relative flex items-center" onClick={handleLike}>
            {post.liked_by_user ? (
              <IoHeartDislike className="text-primary " size={28} />
            ) : (
              <IoHeartOutline size={28} />
            )}
            <span className="ml-2 text-sm font-semibold">
              {post.likes_count > 0 ? post.likes_count : ""}
            </span>
          </button>
          <button
            className="flex items-center"
            onClick={() => {
              setCommentOpen((prev) => !prev);
            }}
          >
            <FaComment className="text-primary" size={24} />
            <span className="ml-1 text-sm">{post.comments_count}</span>
          </button>
        </div>
        <div className="py-1 text-lg text-primary text-start">
          <span>{post.title}</span>
        </div>
        <p className="text-sm mb-6 text-start">{post.content}</p>
        <div
          className={`${
            !commentOpen
              ? "max-h-0 overflow-hidden"
              : " max-h-96 overflow-y-auto"
          }${
            !commentOpen
              ? "max-h-0 overflow-hidden"
              : " max-h-96 overflow-y-auto"
          }`}
        >
          <div className="mb-4 relative">
            <textarea
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded text-white"
              rows="2"
              placeholder="Yorum yaz..."
              value={commentText}
              onKeyUp={(e) => e.key === "Enter" && handleCommentSubmit()}
              disabled={isPending}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <IoMdSend
              size={16}
              className=" text-white z-99 rounded absolute right-2 bottom-10"
              onClick={!isPending && handleCommentSubmit}
            />
          </div>

          <div className={`mt-4`}>
            <h3 className="text-lg font-semibold mb-3">Yorumlar</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border  rounded-3xl rounded-tl-none my-3 px-2 border-gray-700 py-2"
                >
                  <div className="flex items-center justify-start">
                    {comment.user?.profileimages ? (
                      <Image
                        src={`${fileBaseUrl}/${comment.user.profileimages}`}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="rounded-full aspect-square object-contain"
                      />
                    ) : (
                      <FaUser className="text-gray-400" size={30} />
                    )}
                    <div className="text-start ml-3">
                      <p className="font-semibold text-sm">
                        {comment.user?.fullName ?? "Anonim"}
                      </p>
                      <p className="text-xs text-gray-400 text-start">
                        {timeAgo(new Date(comment.created_at))}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-start">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>Henüz yorum yok.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
