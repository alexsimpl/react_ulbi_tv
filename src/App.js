import React, { useMemo, useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MyInput from "./components/UI/input/MyInput"
import MyButton from "./components/UI/button/MyButton";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "жж", body: "бб" },
    { id: 2, title: "дд", body: "аа" },
    { id: 3, title: "вв", body: "яя" },
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
  setPosts([...posts, newPost])
 }

  //Получаем пост из дочернего компонента
  const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyModal />
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
    </div>
  );
}

export default App;
