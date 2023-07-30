import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Galaxy from "./pages/scenes/Galaxy";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.css';
import RoomScene from "./pages/scenes/RoomScene";
import { Provider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NewExhibitionForm from "./pages/Exhibition/NewExhibition";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ListExhibitions from "./pages/Exhibition/ListExhibitions";
import Navbar from "./components/Navbar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import appTheme from "./themes/theme";
import Exhibition from "./pages/Exhibition/Exhibition";
import AppModal from "./components/Modal";

function App() {

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <AppModal/>
          <div className="App">
            <Router>
              <Navbar/>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/Galaxy' element={<Galaxy />}></Route>
                <Route path='/room/:id' element={<RoomScene />}></Route>
                <Route path='/new/exhibition' element={<NewExhibitionForm />}></Route>
                {/* <Route path='/new/illustration/:id_exhibition' element={<NewIllustrationForm />}></Route> */}
                <Route path='/exhibition' element={<ListExhibitions />}></Route>
                <Route path='/exhibition/:id' element={<Exhibition />}></Route>
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  )
}

export default App
