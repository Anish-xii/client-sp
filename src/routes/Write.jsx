import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"></iframe></p>`
      );
  }, [video]);

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Cover Image Upload */}
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            className={`relative w-max px-4 py-2 font-medium rounded-xl transition-all duration-300 ease-in-out 
            ${cover ? "bg-green-600 text-white shadow-lg hover:scale-105" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} 
            ${cover ? "group" : ""}`}
          >
            {cover ? "Image Added" : "➕ Add a Cover Image"}
            {cover && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm font-light rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Change Image
              </span>
            )}
          </button>
        </Upload>

        {/* Title Input */}
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />

        {/* Category Dropdown */}
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="story">Story</option>
            <option value="discussion">Discussion</option>
            <option value="conservation">Conservation</option>
            <option value="endangered-species">Endangered Species</option>
            <option value="wildlife-protection">Wildlife Protection</option>
            <option value="casestudy">Case Study</option>
            <option value="resources">Resources</option>
            <option value="research">Research</option>
            <option value="successstory">Success Story</option>
            <option value="events">Events</option>
          </select>
        </div>

        {/* Description Input */}
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />

        {/* Horizontal Layout: Toolbar + Editor */}
        <div className="flex gap-4">
          {/* Floating Toolbar - Horizontal beside editor */}
          <div className="flex flex-col gap-3 p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-md  h-[120px]">
            {/* Image Upload Button */}
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button
                type="button"
                className="relative w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md 
                hover:bg-blue-600 transition-all group"
              >
                🖼️
                <span className="absolute left-12 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100">
                  Insert Image
                </span>
              </button>
            </Upload>

            {/* Video Upload Button */}
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button
                type="button"
                className="relative w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full shadow-md 
                hover:bg-purple-600 transition-all group"
              >
                🎥
                <span className="absolute left-12 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100">
                  Insert Video
                </span>
              </button>
            </Upload>
          </div>

          {/* Text Editor */}
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>

        {/* Upload Progress */}
        <span className="text-sm text-gray-500">Progress: {progress}%</span>
      </form>
    </div>
  );
};

export default Write;

