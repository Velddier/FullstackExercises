import React, { useState } from "react";

const componentStyle = {
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: "20vh",
    marginBottom: 24,
    fontSize: 30,
  },
  history: {
    background: "#333",
    color: "#eee",
    padding: 16,
    borderRadius: 16,
    marginRight: 80,
    marginLeft: 80,
    width: "fit-content",
  },
  message: {
    background: "#333",
    color: "#eee",
    padding: 16,
    marginRight: 80,
    marginLeft: 80,
    borderRadius: 16,
    textAlign: 'center',
  },
  counterDial: {
    fontFamily: "roboto",
    fontWeight: 800,
    fontSize: 72,
    backgroundColor: "#eee",
    color: "#222",
    textAlign: "center",
    margin: "auto",
    width: 100,
    height: 100,
    padding: 12,
    borderRadius: 24,
  },
  button: {
    padding: 12,
    fontSize: 32,
    color: "lightblue",
    background: "linear-gradient(-225deg, cyan, darkblue)",
    height: 80,
    width: 80,
    border: "none",
    borderRadius: 100,
  },
  GetGreeted: {
    borderRadius: 100,
    padding: 8,
    width: "8rem",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 5rem)",
  },
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div style={componentStyle.message}>
        The app is used by pressing left or right
      </div>
    );
  }
  return (
    <div style={componentStyle.history}>
      <em>history</em> | {props.allClicks.join(" · ")}
    </div>
  );
};

const Button = ({ buttonStyle, text, handleClick }) => {
  return (
    <button style={buttonStyle} onClick={handleClick}>
      {text}
    </button>
  );
};

const CounterDial = ({ indicator }) => {
  return <p style={componentStyle.counterDial}>{indicator}</p>;
};

const greet = (who) => () => {
  return console.log("hello", who);
};

const GetGreeted = ({ who }) => {
  return (
    <div>
      <button style={componentStyle.GetGreeted} onClick={greet(who)}>
        Hello
      </button>
    </div>
  );
};

const App = () => {
  const [allClicks, setAll] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("◀"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("▶"));
    setRight(right + 1);
  };

  return (
    <div>
      <div style={componentStyle.layout}>
        <CounterDial indicator={left} />
        <Button
          buttonStyle={componentStyle.button}
          handleClick={handleLeftClick}
          text="◀"
        />
        <Button
          buttonStyle={componentStyle.button}
          handleClick={handleRightClick}
          text="▶"
        />
        <CounterDial indicator={right} />
      </div>
      <GetGreeted who="world" />
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
