# Automatic Batching behvaiour of useState in React 18

The `useState` hook, probably the most commonly used react hook, has some quirks that might trip up new users. This article is my attempt at explaining some things that had confused me when I was first learning about useState.

## The Basics

Treat this section as the basecamp in **'Makes Sense Valley'** , from where we shall venture out to conquer the **'Quirky Peaks'** of the **'WTF JS Ranges'**.

### Simple Example

```jsx
import React, { useState } from "react";

// Example 1: Simple Use Case
const Example1 = () => {
  const [text, setText] = useState("This Makes Sense");

  return (
    <>
      <h1>{text}</h1>
      <button onClick={() => setText("Still Makes Sense")}>Update State</button>
    </>
  );
};

export default Example1;
```

We set up a state for our component using the useState hook. The initial state is a string with the value of "This Makes Sense" and on a click of the 'Update State' button, that state is updated to another string with the value of "Still Makes Sense". As simple as it gets.

### State Updates Trigger Re-Renders, But Not Always

In the following code, we have a component with a state set up with an inital value of an empty string. Clicking the 'Yes' button sets the state to the string "Yes". Similarly, clicking the 'No' button, sets the state to the string, "No".
The important bit here is that every time the component is rendered, i.e. the component function is called, we increase the value of the global variable `render` and log it to the console. This way we can detect when the component is being rendered.

Now, try this:
Click "Yes" -> Console shows that a second render has taken place.
Click "No" -> Console shows that a third render has taken place.
Click "No" again -> A fourth render? Why though?

React is not supposed to render if the state is being set to the same value, right?

Click "No" again -> Voila! No renders.

Well, even if the new state value and the existing state value are the same, sometimes React needs to render the component once before [bailing out](https://legacy.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update). That's just how useState behaves.

> I have not found any further explanation of why this happens exactly and would greatly appreciate any
> resources that throw light on this behaviour.

```jsx
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
```

### State Updates Are Automatically Batched

In general, if you have multiple state updates one after the other, they will not trigger re-renders after each one. Instead, the updates will be grouped (i.e. batched) together and only one re-render will trigger. This has performance benefits.

In the following code, even though there are 2 state updates within each of the click handlers, there will be only one re-render triggered for each button click.

Note: React 17 and below behave the same for React event handlers but do not batch state updates for promises, setTimeout calls, native event handlers, or any other event.

> [React 18: Automatic Batching Blog post](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18) > [React 18: Automatic Batching Github Discussion](https://github.com/reactwg/react-18/discussions/21)

```jsx
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
```

That covers the basics before we head into the somewhat confusing behaviours.

TODO

1. Updating count twice 4 different variations
