import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { addPost, deletePost } from "./features/posts";

function App() {
  const postsList = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");

  const handleClick = () => {
    if (inputName === "" || inputContent === "") return;
    const id =
      postsList.length === 0 ? 0 : postsList[postsList.length - 1].id + 1;
    dispatch(addPost({ id: id, name: inputName, content: inputContent }));
    setInputName("");
    setInputContent("");
  };
  const handleDeleteClick = (id) => {
    console.log("handleDelete");
    dispatch(deletePost({id}));
  };
  return (
    <div className="App">
      <div>
        <h1>React-Redux掲示板</h1>
      </div>
      <div className="addPost">
        <input
          type="text"
          placeholder="お名前"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          placeholder="投稿内容"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <button onClick={handleClick}>投稿</button>
        <hr />
      </div>
      <div className="displayPosts">
        {postsList.map((post) => (
          <div key={post.id} className="post">
            <h1 className="postName">{post.name}</h1>
            <h1 className="postContent">{post.content}</h1>
            <button onClick={() => handleDeleteClick(post.id)}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
