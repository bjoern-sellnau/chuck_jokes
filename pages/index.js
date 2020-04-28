import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

import Head from "next/head";

export default function Home({ joke }) {
  const [likes, set_likes] = useState([]);
  const [liked_joke, set_liked_joke] = useState("");

  useEffect(() => {
    const liked = localStorage.getItem("liked");
    set_likes(liked.split(",") || []);
  }, []);

  useEffect(() => {
    if (liked_joke !== "") {
      localStorage.setItem("liked", [...likes, liked_joke]);
      set_likes([...likes, liked_joke]);
    }
  }, [liked_joke]);

  const handleLike = (joke) => {
    set_liked_joke(joke);
  };

  return (
    <div className="container">
      <h1>Chuck Norris Joke of the day.</h1>
      <p>{joke}</p>
      <br />
      <a href="/">random joke</a>
      <button onClick={() => handleLike(joke)}>like</button>
      <h2>liked jokes</h2>
      <ul>
        {likes.map((like) => (
          <li>{like}</li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
        h1,
        h2 {
          font-family: arial;
        }
        a {
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 10px;
          color: #333;
          text-decoration: none;
          background: #eee;
          display: inline-block;
        }
        a:hover {
          text-decoration: underline;
          background: #f5f5f5;
        }
        button {
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.icndb.com/jokes/random");
  const json = await res.json();
  return { joke: json.value.joke };
};
