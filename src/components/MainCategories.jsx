import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden md:flex mt-4 bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
  <Link
    to="/posts"
    className="bg-green-700 text-white rounded-full px-4 py-2"
  >
    All Posts
  </Link>
  <Link
    to="/posts?cat=story"
    className="hover:bg-green-100 rounded-full px-4 py-2"
  >
    Story
  </Link>
  <Link
    to="/posts?cat=discussion"
    className="hover:bg-green-100 rounded-full px-4 py-2"
  >
    Discussion
  </Link>
  <Link
    to="/posts?cat=conservation"
    className="hover:bg-green-100 rounded-full px-4 py-2"
  >
    Conservation
  </Link>
  <Link
    to="/posts?cat=endangered-species"
    className="hover:bg-green-100 rounded-full px-4 py-2"
  >
    Endangered Species
  </Link>
  <Link
    to="/posts?cat=successstory"
    className="hover:bg-green-100 rounded-full px-4 py-2"
  >
    Success Story
  </Link>
</div>

      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search/>
    </div>
  );
};

export default MainCategories;
