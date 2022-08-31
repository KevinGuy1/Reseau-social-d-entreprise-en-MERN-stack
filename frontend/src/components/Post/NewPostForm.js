import React, { useState } from "react";
// import { userStore } from "../Store";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePost = ({ posts, setPosts }) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const pseudo = Cookies.get("pseudo");

  // const userId = userStore((state) => state.userId);
  // const pseudo = userStore((state) => state.pseudo);

  const [input, setInput] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image.data);
    formData.append(
      "post",
      JSON.stringify({
        pseudo,
        userId,
        message: input,
      })
    );

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/posts`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        async function fetchPost() {
          const getAllPosts = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            headers: { 'Authorization': `Bearer ${token}` }
          }
          let res = await axios(getAllPosts)
          console.log(res.data)
          if (res.status === 200) {
            const sortedPost = res.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            })
            return setPosts(sortedPost)
          }
        }
        fetchPost();
        setInput("");
        setImage({ preview: "", data: "" });
      })
      .catch(function (response) {
        console.log(response);
      });
    return;
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="m-auto  w-4/5 bg-secondary rounded-xl shadow-secondary shadow-lg">
      <div className="p-3">
        <h2>{pseudo}</h2>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <textarea
          className="w-full mx-3 px-3 py-2 h-16 rounded-lg resize-none"
          name="input"
          value={input}
          onChange={handleChange}
          type="text"
          required
          placeholder={`Quoi de neuf ?`}
        />
        <div
          className=""
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        // }}
        >
          <div className="relative">
            <img className="absolute" src="./img/icons/picture.svg" alt="icons-img" />
            <input
              className="w-10 h-10 rounded-full absolute opacity-0"
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>
          {image.preview ? (
            <img
              // style={{ width: "50px" }} 
              src={image.preview} alt="preview" />
          ) : null}
        </div>
        <button
          className="bg-secondary rounded-2xl px-3 py-1 hover:bg-primary hover:text-white"
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default CreatePost;


