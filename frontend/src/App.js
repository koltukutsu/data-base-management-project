// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from './components/Auth';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Authentication />} />
          <Route path="/home" element={<Home />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
