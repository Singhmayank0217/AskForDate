"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from './Button'; 
import { Input } from './Input';  
import gif1 from "../assests/gif1.gif"
import gif2 from "../assests/gif3.gif"
import gif3 from "../assests/gif4.gif"
import gif4 from "../assests/date.gif"
import musicFile from "../assests/AnathHu.mp3"; 

export default function AskForDate() {
  const [name, setName] = useState("");
  const [askingName, setAskingName] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  
  const audioRef = useRef(null); 

  const gifUrls = [
    gif1,
    gif2,
    gif3,
    gif4,
  ]; 

  useEffect(() => {
    if (noCount > 1) {
      const intervalId = setInterval(() => {
        setNoButtonStyle({
          position: 'absolute',
          left: `${Math.random() * 80}%`,
          top: `${Math.random() * 80}%`,
        });
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [noCount]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    if (audioRef.current) {
      audioRef.current.play(); 
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setAskingName(false);
    }
  };

  if (askingName) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-purple-400">
        <form onSubmit={handleNameSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">What's your name?</h1>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mb-4 p-2 border flex border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg p-2 transition duration-300">Submit</Button>
        </form>
      </div>
    );
  }

  if (yesPressed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-purple-400">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-purple-800">I knew it, {name}! 😍</h1>
          <p className="text-xl text-gray-600">It's a date then!</p>
          <img
            src={gif4} // GIF for "It's a date" response
            alt="It's a date!"
            className="mt-4 rounded-md shadow-md"
            width={300}
            height={200}
          />
        </div>
      </div>
    );
  }

  const currentGif = gifUrls[noCount % gifUrls.length]; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-red-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center relative border border-gray-300">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">{name}, will you go on a date with me?</h1>
        <img
          src={currentGif}
          alt="Cute GIF"
          style={{ marginLeft: "25px" }}
          className="mb-4 rounded-md shadow-md lg:ml-24 "
          width={300}
          height={200}
        />
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={handleYesClick} className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg p-2 transition duration-300">
            Yes
          </Button>
          <Button
            onClick={handleNoClick}
            style={noCount > 1 ? noButtonStyle : {}}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition duration-300"
          >
            No
          </Button>
        </div>
        {noCount > 0 && (
          <p className="mt-4 text-lg font-semibold text-gray-800">
            {noCount === 1 ? "Are you sure? Think again!" : "Please reconsider!"}
          </p>
        )}
      </div>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={musicFile} />
    </div>
  );
}
