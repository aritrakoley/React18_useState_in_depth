import React, { useState } from "react";

// Example 2: State Updates Trigger Re-Renders
let render = 0;

const Example2 = () => {
  const [answer, setAnswer] = useState("");

  const handleYesClick = () => {
    setAnswer("Yes");
  };

  const handleNoClick = () => {
    setAnswer("No");
  };

  render++;
  console.log("render: ", render);
  return (
    <>
      <hr />
      <h4>Example 2: State Updates Trigger Re-Renders</h4>
      <h1>Does This Make Sense? {answer}</h1>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>
      <hr />
    </>
  );
};

export default Example2;
