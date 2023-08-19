import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Galaxy from "./scenes/Galaxy";
import Home from "./pages/Home";
import RoomScene from "./pages/RoomScene/RoomScene";
import { Provider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ExhibitionForm from "./pages/Gallery/components/ExhibitionForm/ExhibitionForm";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Exhibition from "./pages/Exhibition/Exhibition";
import MuiThemeProvider from "./theme/MuiThemeProvider";
import Layout from "./pages/Layout/Layout";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Layout>
                <Routes>
                  <Route path="/" element={<Gallery />}></Route>
                  <Route path="/Galaxy" element={<Galaxy />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/room/:id" element={<RoomScene />}></Route>
                  <Route
                    path="/gallery"
                    element={<Gallery />}
                  ></Route>
                  <Route
                    path="/exhibition/:id"
                    element={<Exhibition />}
                  ></Route>
                </Routes>
            </Layout>
          </BrowserRouter>
        </MuiThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App
