import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
//import Message from "./components/Message";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
//import PostForm from "./components/PostForm";
//import NotFound from "./components/NotFound";

const axios = require("axios").default;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  let history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      axios
        .get("http://localhost:3001/posts")
        .then((response) => setPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  // const setFlashMessage = (message) => {
  //   setMessage(message);
  //   setTimeout(() => {
  //     setMessage(null);
  //   }, 1600);
  // };

  const addNewPost = (post) => {
    console.log(post);
    try {
      axios
        .post("http://localhost:3001/posts", {
          title: post.title,
          content: post.content,
        })
        .then((response) => {
          console.log(response);
          getPosts();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post) => {
    console.log(post)
    try {
      axios
        .post("http://localhost:3001/posts/edit", {post})
        .then((res) => {getPosts(); window.location.replace('/')});
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      axios
        .delete("http://localhost:3001/posts", {data: {id:postId}})
        .then((res) => {getPosts(); window.location.replace('/')});
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div className="App">
        <Header />
        {/* {message && <Message type={message} />} */}
        <Switch>
          <Route exact path="/" ><Posts posts={posts} /></Route> 
          <Route
            path="/post/:id"
            render={(props) => {
              const post = posts.find(
                (post) => post.id === props.match.params.id
              );
              if (post) {
                return <PostDetails post={post} deletePost={deletePost} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route
            path="/new"
            render={() => (
              <CreatePost
                addNewPost={addNewPost}
                post={{ title: "", content: "" }}
              />
            )}
          />
          <Route
            path="/edit/:id"
            render={(props) => {
              const post = posts.find(
                (post) => post.id === props.match.params.id
              );
              if (post) {
                return <EditPost post={post} updatePost={updatePost}  />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          {/* <Route
            path="/delete/:id"
            render={(props) => {
              const post = posts.find(
                (post) => post.id === props.match.params.id
              );
              if (post) {
                return <EditPost post={post} updatePost={updatePost}  />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          /> */}

          {/* <Route
            exact
            path="/new"
            render={() => (
              <PostForm
                addNewPost={addNewPost}
                post={{ id: 0, title: "", content: "" }}
              />
            )}
          /> */}
          {/* <Route
            path="/edit/:id"
            render={(props) => {
              const post = posts.find(
                (post) => post.id === props.match.params.id
              );
              if (post) {
                return <PostForm updatePost={updatePost} post={post} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
