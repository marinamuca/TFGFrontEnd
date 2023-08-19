import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Galaxy from "./scenes/Galaxy";
import RoomScene from "./pages/RoomScene/RoomScene";
import { Provider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Exhibition from "./pages/Exhibition/Exhibition";
import MuiThemeProvider from "./theme/MuiThemeProvider";
import Layout from "./pages/Layout/Layout";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthRoute>
                      <Gallery />
                    </AuthRoute>
                  }
                ></Route>
                {/* <Route path="/Galaxy" element={<Galaxy />}></Route> */}

                <Route
                  path="/room/:id"
                  element={
                    <AuthRoute>
                      <RoomScene />
                    </AuthRoute>
                  }
                ></Route>
                <Route
                  path="/gallery"
                  element={
                    <AuthRoute>
                      <Gallery />
                    </AuthRoute>
                  }
                ></Route>
                <Route
                  path="/exhibition/:id"
                  element={
                    <AuthRoute>
                      <Exhibition />
                    </AuthRoute>
                  }
                ></Route>
                
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
              </Routes>
            </Layout>
          </BrowserRouter>
        </MuiThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
