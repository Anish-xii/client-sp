import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 10, ...searchParamsObj },
    });

    console.log("API Response:", res.data); // Debugging the response
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", JSON.stringify(Object.fromEntries([...searchParams]))], // Ensure stable queryKey
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage?.nextPage || lastPage?.currentPage + 1 : undefined,
  });

  if (status === "loading") return <p>Loading...</p>; // Loading state
  if (error) return <p>Something went wrong!</p>; // Error handling

  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      scrollThreshold={0.4} // Load more before reaching the bottom
      endMessage={<p><b>All posts loaded!</b></p>}
    >
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => (
          <PostListItem
            key={post?._id || `fallback-key-${index}`}
            post={post || { title: "Untitled Post" }} // Fallback post
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </InfiniteScroll>
  );
};

export default PostList;
