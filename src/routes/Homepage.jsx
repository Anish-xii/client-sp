import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Recent posts and articles</span>
      </div>
      
      <FeaturedPosts />
      <MainCategories />
      
      <div className="">
        <h1 className="my-7 text-2xl text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default Homepage;
