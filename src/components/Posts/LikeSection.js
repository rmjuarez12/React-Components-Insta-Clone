// Look at the number of likes on line 26. Right now it's hard coded to '100'.
// Use a piece of data coming in through props to display the correct number of likes.
// You will also add an onClick handler that utilizes `likePost` to increase the count of likes.
// (As a stretch goal, you might want to prevent your user from "liking" the same post more than once.)
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

// Import extra dependencies
import { gsap } from "gsap";

const LikeSection = (props) => {
  // 🔥 Make sure the parent of LikeSection is passing the right props!
  const { likePost, numberOfLikes, removeLike, postComment, postId } = props;

  // Set the state for the form
  const [commentMessage, setCommentMessage] = useState("");

  // Open the comment form
  function openCommentForm() {
    // Get the form container
    const formContainer = document.querySelector(`#post-${postId} .comment-form`);

    // Toggle active class
    formContainer.classList.toggle("active");

    if (formContainer.classList.contains("active")) {
      gsap.to(`#post-${postId} .comment-form`, { height: "auto", scale: 1, duration: 0.2 });

      // Focus on field after opening
      const formField = document.querySelector(`#post-${postId} .comment-form input`);

      formField.focus();
    } else {
      gsap.to(`#post-${postId} .comment-form`, { height: 0, scale: 0, duration: 0.2 });
    }

    console.log("Open Form");
  }

  return (
    <div>
      <div className="like-section" key="likes-icons-container">
        <div className="like-section-wrapper">
          <FontAwesomeIcon icon={faHeart} onClick={likePost} className="no-like" />
          <FontAwesomeIcon icon={solidHeart} onClick={removeLike} className="liked" />
        </div>
        <div className="like-section-wrapper">
          <FontAwesomeIcon icon={faComment} onClick={openCommentForm} />
        </div>
      </div>

      <div className="comment-form">
        <form
          onSubmit={(e) => {
            setCommentMessage("");
            postComment(e, commentMessage);
          }}
        >
          <input
            type="text"
            name="add-comment"
            value={commentMessage}
            placeholder="Enter Comment"
            onChange={(text) => setCommentMessage(text.target.value)}
          />
        </form>
      </div>
      <p className="like-number">{numberOfLikes} likes</p>
    </div>
  );
};

export default LikeSection;
