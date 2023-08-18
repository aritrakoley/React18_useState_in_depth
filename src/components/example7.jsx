import React, { useState } from "react";
import { flushSync } from "react-dom";

// Example 7: Multiple state updates without batching

let render = 0;

const Example7 = () => {
  const [count, setCount] = useState(0);

  render++;
  console.log("Render:", render);

  console.log("During render: count = ", count);

  const handleClick = () => {
    console.log("Before first setCount: count = ", count);
    flushSync(() => setCount((prevCount) => prevCount + 1));

    console.log("Before second setCount: count = ", count);
    flushSync(() => setCount((prevCount) => prevCount + 1));

    console.log("After second setCount: count = ", count);
  };

  return (
    <>
      <hr />
      <h4>Example 7: Multiple state updates without batching</h4>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
      <hr />
    </>
  );
};

export default Example7;
