import React, { useState } from "react";

// Components

// Header component
const Header = ({ text, theme }) => (
  <div style={theme}>
    <h1>{text}</h1>
  </div>
);

// Buttons
const RatingButton = ({ type, style, handleClick }) => {
  return (
    <div>
      <button style={style} onClick={handleClick}>
        {type}
      </button>
    </div>
  );
};

// Display rating counters
const StatRatings = ({ value }) => {
  const [good, neutral, bad] = value;
  return (
    <div>
      <Header text="Statistics" theme={componentStyle.smallHeader} />
      <div style={componentStyle.statistics}>
        <div style={componentStyle.counter}>😀{good}</div>
        <div style={componentStyle.counter}>😐{neutral}</div>
        <div style={componentStyle.counter}>😟{bad}</div>
      </div>
    </div>
  );
};

// Single stat
const Stat = ({ data, title }) => {
  return (
    <div style={componentStyle.statistics}>
      <Header text={title} theme={componentStyle.smallHeader} />
      <div style={componentStyle.counter}>{data}</div>
    </div>
  );
};

// Display statistics list
const StatData = ({ data }) => {
  if (data.statAll === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <Stat title="All" data={data.statAll} />
      <Stat title="Average" data={data.statAvg()} />
      <Stat title="Positive ratio" data={data.statRatio()} />
    </div>
  );
};

const StatTable = ({ data }) => {
  if (data.statAll === 0) {
    return null;
  }
  return (
    <table style={{ fontSize: 16, width: 320 }}>
      <tbody>
        <tr>
          <td colSpan='2'><strong>Votes</strong></td>
        </tr>
        <tr>
          <td>Good: </td>
          <td>{data.good}</td>
        </tr>
        <tr>
          <td>Neutral: </td>
          <td>{data.neutral}</td>
        </tr>
        <tr>
          <td>Bad: </td>
          <td>{data.bad}</td>
        </tr>
        <tr>
          <td>All: </td>
          <td>{data.statAll}</td>
        </tr>
        <tr>
          <th colSpan='2'>▪</th>
        </tr>
        <tr>
          <td colSpan='2'><strong>Details</strong></td>
        </tr>
        <tr>
          <td>Average: </td>
          <td>{data.statAvg()}</td>
        </tr>
        <tr>
          <td>Positive ratio: </td>
          <td>{data.statRatio()}</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newGood) => {
    setGood(newGood);
  };
  const setToBad = (newBad) => {
    setBad(newBad);
  };
  const setToNeutral = (newNeutral) => {
    setNeutral(newNeutral);
  };

  const statData = {
    good: good,
    neutral: neutral,
    bad: bad,
    statAll: good + bad + neutral,
    statGood: good * 1,
    statNeutral: 0,
    statBad: bad * -1,
    statAvg() {
      return ((this.statGood + this.statBad + this.statNeutral) / 3).toFixed(1);
    },
    statRatio() {
      let ratio = ((good / (good + neutral + bad)) * 100).toFixed(0);
      const result = ratio.toString().concat("%");
      return result;
    },
  };

  return (
    <div style={componentStyle.all}>
      <div style={componentStyle.panel1}>
        <Header text="Leave your feedback" theme={componentStyle.header} />
        <div style={componentStyle.controls}>
          <RatingButton
            style={componentStyle.button.good}
            type="Good"
            handleClick={() => setToGood(good + 1)}
          />
          <RatingButton
            style={componentStyle.button.neutral}
            type="Neutral"
            handleClick={() => setToNeutral(neutral + 1)}
          />
          <RatingButton
            style={componentStyle.button.bad}
            type="Bad"
            handleClick={() => setToBad(bad + 1)}
          />
        </div>
      </div>
      <div style={componentStyle.panel1}>
        <StatRatings value={[good, neutral, bad]} />
      </div>
      <div style={componentStyle.panel1}>
        <StatData data={statData} />
      </div>
      <div style={componentStyle.panel1}>
        <StatTable data={statData} />
      </div>
    </div>
  );
};

// Styling
const componentStyle = {
  all: {
    fontFamily: "josefin sans",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  panel1: {
    background: "#eee",
    color: "#222",
    borderRadius: 16,
    padding: 16,
    paddingBottom: 16 * 1.62,
    minWidth: 380,
    width: "fit-content",
    marginBottom: 16 / 1.62,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    letterSpacing: -0.5,
  },
  controls: {
    display: "flex",
    margin: 12,
  },
  button: {
    good: {
      color: "#fff",
      border: "none",
      fontWeight: 600,
      fontSize: 14,
      padding: 10,
      width: 120,
      height: 120 / 3.24,
      background: "blue",
      borderRadius: 10,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    neutral: {
      color: "#fff",
      border: "none",
      fontWeight: 600,
      fontSize: 14,
      padding: 10,
      width: 120,
      height: 120 / 3.24,
      background: "orange",
      borderRadius: 0,
    },
    bad: {
      color: "#fff",
      border: "none",
      fontWeight: 600,
      fontSize: 14,
      padding: 10,
      width: 120,
      height: 120 / 3.24,
      background: "red",
      borderRadius: 10,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  smallHeader: {
    fontSize: 8,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  statistics: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    width: 320,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    fontSize: 32,
    minWidth: 80,
  },
};

export default App;
