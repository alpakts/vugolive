"use client";
import './style.scss';
import FileUploader from "@/components/web-components/file-uploader";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictures, setPictures] = useState([]);
  const [picturePreviews, setPicturePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    if (!e.target.files) return;
     
    const selectedFiles = Array.from(e.target.files);
  
    if (selectedFiles.length + pictures.length > 8) {
      setErrorMessage("En fazla 8 resim yükleyebilirsiniz!");
      e.target.value = null;
      setPicturePreviews([]);
      setPictures([]);
      return;
    }
  
    setPictures((prevPictures) => [...prevPictures, ...selectedFiles]);
  
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPicturePreviews(previews);
  };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    if (pictures.length === 0) {
      setErrorMessage("En az bir en fazla 8 resim yüklemelisiniz!");
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    pictures.forEach((picture) => {
      formData.append("pictures[]", picture);
    });

    try {
      const response = await fetch("https://admin.vugolive.com/api/my-add-post", {
        method: "POST",
        body: formData,
        headers: {
          Authtoken: `${localStorage.getItem("token")}`,
          Apikey: "123",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Gönderi başarıyla oluşturuldu!");
        setTitle("");
        setContent("");
        setPictures([]);
        setPicturePreviews([]);
        router.push(`/posts/${result?.post?.id}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Bir hata oluştu!");
      }
    } catch (error) {
      setErrorMessage("Sunucuya bağlanırken bir hata oluştu!");
    } finally {""
      setIsSubmitting(false);
    }
  };

  const handleRemovePicture = (index) => {
    const updatedPictures = pictures.filter((_, i) => i !== index);
    const updatedPreviews = picturePreviews.filter((_, i) => i !== index);
  
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  
    const dataTransfer = new DataTransfer();
    updatedPictures.forEach((file) => dataTransfer.items.add(file));
    
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }
  
    setPictures(updatedPictures);
    setPicturePreviews(updatedPreviews);
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Yeni Gönderi Oluştur</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Başlık
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              İçerik
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="pictures" className="block text-sm font-medium mb-1">
              Resimler
            </label>
            <FileUploader handleFileChange={handleFileChange} inputRef={inputRef} />
          </div>

          {picturePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {picturePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    onClick={() => handleRemovePicture(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönderi Oluştur"}
            </button>
          </div>

          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
