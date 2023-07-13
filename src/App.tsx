import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Galaxy from "./pages/scenes/Galaxy";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.css';
import RoomScene from "./pages/scenes/RoomScene";
import { Provider } from "react-redux";
import { store } from "./store";
import NewExhibitionHome from "./pages/NewExhibition";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Galaxy' element={<Galaxy />}></Route>
            <Route path='/GltfScene' element={<RoomScene />}></Route>
            <Route path='/new/exhibition' element={<NewExhibitionHome />}></Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  )
}

export default App
