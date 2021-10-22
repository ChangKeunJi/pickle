import { useCallback } from "react";
import { useSelector } from "react-redux";

import Card from "../component/Card";

const CardSection = () => {
  const { allPosts } = useSelector((state) => state.post);

  return (
    <div className="grid gap-4 p-4 pb-36 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
      {allPosts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </div>
  );
};

export default CardSection;
