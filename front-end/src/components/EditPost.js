import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const EditPost = (props) => {
  const [post, setPost] = useState(props.post);
 // let history = useHistory();
console.log(post)


  const handlePostForm = (event) => {
    event.preventDefault();
    console.log(post);
    if (post.title) {
      props.updatePost(post);
    } else {
      alert("Title required");
    }
  };

  return (
    <form className="container" onSubmit={handlePostForm}>
      <h1>Create a new Post</h1>
      <p>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="form-title"
          value={post.title}
          onChange={(event) =>
            setPost({
              ...post,
              title: event.target.value,
            })
          }
        />
      </p>
      <p>
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          rows="4"
          cols="98"
          name="form-content"
          id="form-content"
          value={post.content}
          onChange={(event) =>
            setPost({
              ...post,
              content: event.target.value,
            })
          }
        />
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </form>
  );
};

export default EditPost;
