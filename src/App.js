/* 
  Start here and work your way down the nested components.
  Not all files in the project need code added.
  Look at each file to see what props need to be passed!
*/

// Import the state hook
import React, { useState } from "react";

// Import the Posts (plural!) and SearchBar components, since they are used inside App component
import Posts from "./components/Posts/Posts";
import SearchBar from "./components/SearchBar/SearchBar";

// Import the dummyData
import dummyData from "./dummy-data";

// Import CSS
import "./App.css";

// Import extra dependencies
import { gsap } from "gsap";

const App = () => {
  // Create a state called `posts` to hold the array of post objects, **initializing to dummyData**.
  const [posts, setPosts] = useState(dummyData);

  // This state is the source of truth for the data inside the app. You won't be needing dummyData anymore.
  // To make the search bar work (which is stretch) we'd need another state to hold the search term.

  // Function to add a like to specific post
  const likePost = (postId, from) => {
    /*
      This function serves the purpose of increasing the number of likes by one, of the post with a given id.

      The state of the app lives at the top of the React tree, but it wouldn't be fair for nested components not to be able to change state!
      This function is passed down to nested components through props, allowing them to increase the number of likes of a given post.

      Invoke `setPosts` and pass as the new state the invocation of `posts.map`.
      The callback passed into `map` performs the following logic:
        - if the `id` of the post matches `postId`, return a new post object with the desired values (use the spread operator).
        - otherwise just return the post object unchanged.
     */

    // Get all posts into a variable to not mutate original
    const getPosts = [...posts];

    // Iterate through all posts and then change the value to the specified post
    const changedPosts = getPosts.map((post) => {
      if (postId === post.id) {
        if (post.isLiked !== true) {
          post.likes += 1;
        }

        post.isLiked = true;
      }

      return post;
    });

    // Animate the like icon
    gsap.to(`#post-${postId} svg.no-like`, { rotation: 180, scale: 0, display: "none", duration: 0.2 });
    gsap.to(`#post-${postId} svg.liked`, {
      scale: 1.2,
      duration: 0.5,
      delay: 0.3,
      rotation: 0,
      display: "block",
    });
    gsap.to(`#post-${postId} svg.liked`, {
      scale: 1,
      duration: 0.5,
      delay: 0.8,
    });

    if (from === "image") {
      gsap.to(`#post-${postId} svg.post-like`, {
        scale: 1.4,
        duration: 0.3,
      });
      gsap.to(`#post-${postId} svg.post-like`, {
        scale: 1,
        duration: 0.1,
        delay: 0.3,
      });
      gsap.to(`#post-${postId} svg.post-like`, {
        scale: 0,
        duration: 0.3,
        delay: 1,
      });
    }

    // Set the new array into the state
    setPosts(changedPosts);
  };

  // Function to remove like of specific post, if post was already liked
  const removeLikePost = (postId) => {
    // Get all posts into a variable to not mutate original
    const getPosts = [...posts];

    // Iterate through all posts and then change the value to the specified post
    const changedPosts = getPosts.map((post) => {
      if (postId === post.id) {
        post.likes -= 1;
        post.isLiked = false;
      }

      return post;
    });

    // Animate the like icon
    gsap.to(`#post-${postId} svg.liked`, { rotation: 180, scale: 0, display: "none", duration: 0.2 });
    gsap.to(`#post-${postId} svg.no-like`, {
      scale: 1.2,
      duration: 0.5,
      delay: 0.3,
      rotation: 0,
      display: "block",
    });
    gsap.to(`#post-${postId} svg.no-like`, {
      scale: 1,
      duration: 0.5,
      delay: 0.8,
    });

    // Set the new array into the state
    setPosts(changedPosts);
  };

  // Function to post a comment
  function postComment(postId, e, commentMessage) {
    // Prevent form of reloading page
    e.preventDefault();

    // Get all posts into a variable to not mutate original
    const getPosts = [...posts];

    // Iterate through all posts and then change the value to the specified post
    const changedPosts = getPosts.map((post) => {
      if (postId === post.id) {
        // New comment to add
        const newComment = {
          id: post.comments[post.comments.length - 1].id + 1,
          text: commentMessage,
          username: "Richard",
        };

        post.comments.push(newComment);
      }

      return post;
    });

    // Slide form back up after submission
    gsap.to(`#post-${postId} .comment-form`, { height: 0, scale: 0, duration: 0.2 });

    // Set the new array into the state
    setPosts(changedPosts);
  }

  // Function to make a search
  function searchPosts(e, queryStr) {
    // Prevent form of reloading page
    e.preventDefault();

    // If the no results message is there, remove it
    gsap.to(`.no-results`, { opacity: 0, display: "none", duration: 0 });

    // Convert the queried string as array
    const queryArr = queryStr.split(" ");

    // Get all posts into a variable to not mutate original
    const getPosts = [...dummyData];

    // Declare the array that will hold the queried posts
    let getQueriedPosts = [];

    // Go through each post to check
    getPosts.forEach((post) => {
      // Go through each of the keywords from the search query string
      queryArr.forEach((str) => {
        // Get the main comparison variable
        const comparisonStr = JSON.stringify(post.comments[0]).toLowerCase();

        // If the comparison returns true, add it to the query posts array
        if (comparisonStr.indexOf(str.toLowerCase()) !== -1) {
          getQueriedPosts.push(post);
        }
      });
    });

    // Sort the getQueriedPosts by id
    const sortedArr = getQueriedPosts.slice();
    sortedArr.sort((a, b) => a.id - b.id);

    // Get loading element
    gsap.to(`.loading`, { opacity: 1, display: "block", duration: 0.3 });

    // Unload the data first
    setPosts([]);

    // Load the data
    setTimeout(() => {
      setPosts(sortedArr);
      gsap.to(`.loading`, { opacity: 0, display: "none", duration: 0 });

      // If there are no results, display no results message
      if (sortedArr.length < 1) {
        gsap.to(`.no-results`, { opacity: 1, display: "block", duration: 0.3 });
      }
    }, 1000);
  }

  return (
    <div className="App">
      {/* Add SearchBar and Posts here to render them */}
      <SearchBar searchPosts={searchPosts} />
      <Posts posts={posts} likePost={likePost} removeLike={removeLikePost} postComment={postComment} />
      {/* Check the implementation of each component, to see what props they require, if any! */}
    </div>
  );
};

export default App;
