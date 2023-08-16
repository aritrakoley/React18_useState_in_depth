import { useState, useRef } from "react";
import { flushSync } from "react-dom";

const Example = () => {
  const renderRef = useRef(1);
  const render = renderRef.current;

  const [count, setCount] = useState(0);
  console.log("-----> render", renderRef.current);
  console.log("count", count);

  const handleClickCase1 = () => {
    // Case 1: sequential state updates | single batch | single render | value as argument
    setCount(count + 1);
    setCount(count + 1);
  };

  const handleClickCase2 = () => {
    // Case 2: sequential state updates | single batch | single render | function as argument
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const handleClickCase3 = () => {
    // Case 3: sequential state updates | 1 batches | 2 renders | function as argument
    flushSync(() => setCount((prev) => prev + 1));
    flushSync(() => setCount((prev) => prev + 1));
  };

  const handleClickCase4 = () => {
    // Case 4: sequential state updates | 2 batches | 2 renders | value as argument
    console.log("handleClickCase4 call", render);
    flushSync(() => setCount(count + 1));
    flushSync(() => setCount(count + 1));
    console.log("handleClickCase4 exit", render);
  };

  const divStyle = {
    display: "flex",
    border: "solid 2px",
    borderRadius: "4px",
    padding: "2px",
    width: "fit-content",
    margin: "4px",
  };

  renderRef.current++;
  return (
    <>
      <h4>Count: {count}</h4>
      <div style={divStyle}>
        Case 1: sequential state updates | single batch | single render | value
        as argument
        <span style={{ width: "50px" }}></span>
        <button className="btn" onClick={handleClickCase1}>
          Increment
        </button>
      </div>
      <div style={divStyle}>
        Case 2: sequential state updates | single batch | single render |
        function as argument
        <span style={{ width: "50px" }}></span>
        <button className="btn" onClick={handleClickCase2}>
          Increment
        </button>
      </div>
      <div style={divStyle}>
        Case 3: sequential state updates | 2 batches | 2 renders | value as
        argument
        <span style={{ width: "50px" }}></span>
        <button className="btn" onClick={handleClickCase3}>
          Increment
        </button>
      </div>
      <div style={divStyle}>
        Case 4: sequential state updates | 2 batches | 2 renders | function as
        argument
        <span style={{ width: "50px" }}></span>
        <button className="btn" onClick={handleClickCase4}>
          Increment
        </button>
      </div>
    </>
  );
};

export default Example;
