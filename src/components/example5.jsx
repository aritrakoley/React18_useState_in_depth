import React, { useState } from "react";

// Example 5: Multiple state updates using previous state value

let render = 0;

const Example5 = () => {
  const [count, setCount] = useState(0);

  render++;
  console.log("Render:", render);

  console.log("During render: count = ", count);

  const handleClick = () => {
    console.log("Before first setCount: count = ", count);
    setCount((prevCount) => prevCount + 1);

    console.log("Before second setCount: count = ", count);
    setCount((prevCount) => prevCount + 1);

    console.log("After second setCount: count = ", count);
  };

  return (
    <>
      <hr />
      <h4>Example 5: Multiple state updates using previous state value</h4>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
      <hr />
    </>
  );
};

export default Example5;
