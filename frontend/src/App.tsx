import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const Home = () => {
  return (
    <div>
      <button className="btn btn-primary">test</button>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
