import React from "react";
import EyeTracking from "./components/EyeSensor";
import Cards from "./components/Cards";
function App() {
  return (
    <>
      <div>
        <EyeTracking />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </>
  );
}

export default App;
