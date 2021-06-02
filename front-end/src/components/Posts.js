import React from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
console.log(props.posts)




  return (
    <article className="posts container">
      <h1>Posts</h1>
      <ul>
        {props.posts.length < 1 && <li key="empty">No posts yet!</li>}
        {props.posts.map((post) => (
          <li key={post.id}>
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p>
              <Link to={`/edit/${post.id}`}>Edit</Link>
            </p>
            
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Posts;
