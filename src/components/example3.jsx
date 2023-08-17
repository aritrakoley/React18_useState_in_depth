import React, { useState } from "react";

// Example 3: State Updates Are Automatically Batched
let render = 0;

const Example3 = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const handlePetAClick = () => {
    setType("Dog");
    setColor("Black");
  };

  const handlePetBClick = () => {
    setType("Cat");
    setColor("White");
  };

  const handlePetCClick = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
      console.log("fetch complete");
      setType("Hamster");
      setColor("Brown");
    });
  };

  render++;
  console.log("E3 render: ", render);
  return (
    <>
      <hr />
      <h4>Example 3: State Updates Are Automatically Batched</h4>
      <h1>Pet Type: {type}</h1>
      <h1>Pet Color: {color}</h1>
      <button onClick={handlePetAClick}>Pet A</button>
      <button onClick={handlePetBClick}>Pet B</button>
      <button onClick={handlePetCClick}>Get Pet C</button>
      <hr />
    </>
  );
};

export default Example3;
