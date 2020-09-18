import React from "react";
import Comments from "../Comments/Comments";
import LikeSection from "./LikeSection";
import PostHeader from "./PostHeader";

//Import extra dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Post = (props) => {
  // 🔥 Make sure the parent of Post is passing the right props!
  const { post, likePost } = props;

  return (
    <div id={`post-${post.id}`} className="post-border">
      <PostHeader username={post.username} thumbnailUrl={post.thumbnailUrl} />
      <div className="post-image-wrapper" onClick={() => likePost(post.id, "image")}>
        <img alt="post thumbnail" className="post-image" src={post.imageUrl} />
        <FontAwesomeIcon icon={solidHeart} className="post-like" />
      </div>
      {/* Is LikeSection getting all the props it needs to work correctly? */}
      <LikeSection likePost={() => likePost(post.id, "heart")} numberOfLikes={post.likes} />
      {/* Comments also wants its props! */}
      <Comments comments={post.comments} />
    </div>
  );
};

export default Post;
