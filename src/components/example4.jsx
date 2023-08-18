import React, { useState } from "react";

// Example 4:  Naive attempt at multiple updates to a single state

let render = 0;

const Example4 = () => {
  const [count, setCount] = useState(0);

  render++;
  console.log("Render:", render);

  console.log("During render: count = ", count);

  const handleClick = () => {
    console.log("Before first setCount: count = ", count);
    setCount(count + 1);

    console.log("Before second setCount: count = ", count);
    setCount(count + 1);

    console.log("After second setCount: count = ", count);
  };

  return (
    <>
      <hr />
      <h4>Example 4: Naive attempt at multiple updates to a single state</h4>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
      <hr />
    </>
  );
};

export default Example4;
