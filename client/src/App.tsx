import { Route, Routes } from "react-router-dom";
import { Principal } from "./pages/Principal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Principal />} />
      </Routes>
    </>
  );
}

export default App;
