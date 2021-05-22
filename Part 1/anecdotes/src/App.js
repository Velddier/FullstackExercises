import React, { useState } from "react";

// COMPONENTS
const ButtonRefresh = (props) => {
  return (
    <div>
      <button style={styling.buttonRefresh} onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  );
};

const ButtonVote = (props) => {
  return (
    <div>
      <button style={styling.buttonVote} onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  );
};

const DisplayAnecdote = ({ ofTheDay, top, pick, rating }) => {
  return (
    <div style={top === false ? styling.anecdote : styling.topAnecdote}>
      <span style={{ alignSelf: "flex-end" }}>
        {top === false ? "👍" + rating : ""}
      </span>
      <span>{top === false ? pick : ofTheDay}</span>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  // Initialize with random anecdote
  const pickRandom = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(() => pickRandom());

  // Pick random new anecdote
  const pickNewAnecdote = (prev) => {
    prev = setSelected(() => pickRandom());
  };

  // Vote and scoring
  const [scoreChart, setScore] = useState(new Array(anecdotes.length).fill(0));

  // Place a vote
  const placeVote = () => {
    const newArr = [...scoreChart];
    newArr[selected] += 1;
    setScore(newArr);
    // console.log(scoreChart);
  };

  // Display top anecdote
  const topOfTheDay = () => {
    let newArr = [];
    newArr.push(...scoreChart);
    const indexOfTop = newArr.indexOf(Math.max(...newArr));
    console.log(indexOfTop);
    // console.log(anecdotes[inadexOfTop])
    return anecdotes[indexOfTop];
  };

  return (
    <div>
      <DisplayAnecdote
        top={true}
        ofTheDay={"anecdote of the day: " + topOfTheDay()}
        rating={scoreChart[selected]}
      />
      <DisplayAnecdote
        top={false}
        pick={anecdotes[selected]}
        rating={scoreChart[selected]}
      />
      <div style={styling.controls}>
        <ButtonRefresh
          handleClick={pickNewAnecdote}
          text="Grant me wisdom 🧙‍♂️"
        />
        <ButtonVote handleClick={placeVote} text="vote" />
      </div>
    </div>
  );
};

const styling = {
  anecdote: {
    fontFamily: "Helvetica",
    fontSize: 24,
    fontWeight: 700,
    textTransform: "capitalize",
    textAlign: "center",
    wordSpacing: 24 / 30,
    letterSpacing: 24 / 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20 / 1.62,
    padding: "12vh",
    paddingLeft: "30vw",
    paddingRight: "30vw",
    maxWidth: "fit-content",
    height: 160,
    borderRadius: 20,
  },
  topAnecdote: {
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: 600,
    textAlign: "center",
    textTransform: "capitalize",
    textAlign: "center",
    color: "darkblue",
    background: "gold",
    padding: 12,
    paddingLeft: "8vw",
    paddingRight: "8vw",
    borderRadius: 20,
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 20 / 1.62,
  },
  buttonRefresh: {
    border: "none",
    borderRadius: 12 / 1.62,
    padding: 12,
    width: 200,
  },
  buttonVote: {
    border: "none",
    borderRadius: 12 / 1.62,
    padding: 12,
    width: 200,
  },
};

export default App;
