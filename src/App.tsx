import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import ReactDOM from "react-dom";
import Galaxy from "./Pages/Galaxy";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.css';
import { ChakraProvider } from '@chakra-ui/react'
import GltfScene from "./Pages/GltfScene";

function App() {

  return (
        <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/Galaxy' element={<Galaxy/>}></Route>
            <Route path='/GltfScene' element={<GltfScene/>}></Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
