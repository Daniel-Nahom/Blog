import React from "react";

const Post = (props) => {
  console.log(props.post);
  return (
    <article className="post container">
      <h1>{props.post.title}</h1>
      <div className="content">{props.post.content}</div>
      <p>
        <button onClick={()=>props.deletePost(props.post.id)}>delete</button>
      </p>
    </article>
  );
};

export default Post;
