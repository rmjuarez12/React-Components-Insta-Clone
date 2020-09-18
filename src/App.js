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
    const getPosts = posts.slice();

    // Get the object of the clicked object
    const getClickedPost = getPosts.filter((post) => post.id === postId);

    // Get the index in the array of the clicked object
    const indexOfClickedPost = getPosts.map((post) => post.id).indexOf(postId);

    // Add a like to the post
    getClickedPost[0].likes = getClickedPost[0].likes + 1;

    // Add the edited object to all the posts
    getPosts[indexOfClickedPost] = getClickedPost[0];

    console.log(from);

    // Change the classes to liked
    gsap.to(`#post-${postId} svg.no-like`, { rotation: 180, scale: 0, display: "none", duration: 0.2 });
    gsap.to(`#post-${postId} svg.liked`, {
      scale: 1.2,
      duration: 0.5,
      delay: 0.3,
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
        duration: 0.3,
        delay: 0.3,
      });
      gsap.to(`#post-${postId} svg.post-like`, {
        scale: 0,
        duration: 0.3,
        delay: 1.5,
      });
    }

    // Set the new array into the state
    setPosts(getPosts);
  };

  return (
    <div className="App">
      {/* Add SearchBar and Posts here to render them */}
      <SearchBar />
      <Posts posts={posts} likePost={likePost} />
      {/* Check the implementation of each component, to see what props they require, if any! */}
    </div>
  );
};

export default App;
