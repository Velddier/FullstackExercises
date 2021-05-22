import React from "react";

const Header = (courseTitle) => <h1>{courseTitle.name}</h1>;

// Part
const Part = (part) => {
  console.log(part);
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// List content
const Content = (arr) => {
  console.log(arr);
  return (
    <div>
      <Part name={arr.parts[0].name} exercises={arr.parts[0].exercises} />
      <Part name={arr.parts[1].name} exercises={arr.parts[1].exercises} />
      <Part name={arr.parts[2].name} exercises={arr.parts[2].exercises} />
    </div>
  );
};

// Total exercises
const Total = (prop) => {
  let arrTotal = 0;

  // Added all 
  prop.array.forEach((el) => {
    arrTotal += el;
  });

  return <div>total exercises: {arrTotal}</div>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  const partArray = parts.map((i) => i.exercises);


  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total array={partArray} />
    </div>
  );
};

export default App;
