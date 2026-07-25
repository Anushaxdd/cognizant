import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [rupees, setRupees] = useState("");
  const [euro, setEuro] = useState("");

  // Increment Counter
  const increment = () => {
    setCount(count + 1);
  };

  // Hello Message
  const sayHello = () => {
    alert("Hello! Have a nice day.");
  };

  // Multiple Methods
  const handleIncrement = () => {
    increment();
    sayHello();
  };

  // Decrement Counter
  const decrement = () => {
    setCount(count - 1);
  };

  // Welcome Function
  const sayWelcome = (msg) => {
    alert(msg);
  };

  // Synthetic Event
  const onPress = () => {
    alert("I was clicked");
  };

  // Currency Convertor
  const handleSubmit = () => {
    const result = (parseFloat(rupees) / 90).toFixed(2);
    setEuro(result);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>React Event Examples</h1>

      <h2>Counter: {count}</h2>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={decrement} style={{ marginLeft: "10px" }}>
        Decrement
      </button>

      <br />
      <br />

      <button onClick={() => sayWelcome("Welcome")}>
        Say Welcome
      </button>

      <br />
      <br />

      <button onClick={onPress}>OnPress</button>

      <hr />

      <h2>Currency Convertor</h2>

      <input
        type="number"
        placeholder="Enter Rupees"
        value={rupees}
        onChange={(e) => setRupees(e.target.value)}
      />

      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Convert
      </button>

      {euro && (
        <h3>
          Euro: €{euro}
        </h3>
      )}
    </div>
  );
}

export default App;