import { Route, Routes } from "react-router-dom";

import React from "react";

const Home = () => {
  return <div>App</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
