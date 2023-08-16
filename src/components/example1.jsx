import React, { useState } from "react";

// Example 1: Simple Use Case
const Example1 = () => {
  const [text, setText] = useState("The Basics");

  return (
    <>
      <hr />
      <h4>Example 1: Simple Example</h4>
      <h1>{text}</h1>
      <button onClick={() => setText("Makes Sense")}>
        Update State One Way
      </button>
      <button onClick={() => setText((prevText) => "Still " + prevText)}>
        Update State Another Way
      </button>
      <hr />
    </>
  );
};

export default Example1;
