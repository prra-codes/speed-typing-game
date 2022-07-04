import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 15;

  const [text, setText] = useState(""); //text is initially empty string
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);

  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const [wordCount, setWordCount] = useState(0);

  const textBoxRef = useRef(null); // used to focus on textbox, intially set to null

  function startGame() {
    setIsTimeRunning(true); //restarts game
    setTimeRemaining(STARTING_TIME); //restarts timer to 15s
    setText(""); //resets textbox so it's empty
  }

  function endGame() {
    setIsTimeRunning(false); // when timer hits 0, timeRunning state is false
    setWordCount(calculatewordCount()); //setting wordCount into state, which is displayed below once game is done
  }

  useEffect(() => {
    console.log("LET'S GO");

    if (isTimeRunning && timeRemaining > 0) {
      textBoxRef.current.focus(); // when game starts, focuses on textarea
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1); //arrow func because it requires the previous time to update the new time
      }, 1000); // when the time remaining is greater than 0, the timeRemaining state is decremented by 1 every second
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [isTimeRunning, timeRemaining]); // when timeRemaining OR isTimeRunning changes, the useEffect will run again

  function handleTextChange(e) {
    setText(e.target.value);
  } // func to set the textarea value to state, so user can type input which is controlled by react. e allows to get current value of the input box, which is updated by setText

  function calculatewordCount() {
    const wordsArr = text.trim().split(" "); // used to get an array of words that are typed

    const filteredWords = wordsArr.filter((word) => word !== ""); // only get words that aren't an empty string

    const wordCount = filteredWords.length;

    console.log(wordCount);
    return wordCount; //returns the actual word count
  }
  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      {/* value of textarea is equal to the state text, and handleTextChange is the function used to update the state */}
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
