import React from "react";
import Post from "./Post";
import "./Posts.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const Posts = (props) => {
  // 🔥 Make sure the parent of Posts is passing the right props!
  const { likePost, posts, removeLike, postComment } = props;

  console.log(posts.length);

  return (
    <div className="posts-container-wrapper">
      {/* Map through the posts array returning a Post component at each iteration */}
      <h2 className="no-results">No Results</h2>
      <div className="loading">
        <FontAwesomeIcon icon={faRedoAlt} spin />
      </div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            likePost={likePost}
            removeLike={removeLike}
            postComment={postComment}
          />
        );
      })}

      {/* Check the implementation of Post to see what props it requires! */}
    </div>
  );
};

export default Posts;
