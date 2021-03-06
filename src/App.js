import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import USStatsPage from "./pages/StatsPage/USStatsPage";
import GlobalStatsPage from "./pages/StatsPage/GlobalStatsPage";
import GlobalMapPage from "./pages/MapPage/GlobalMapPage";
import USMapPage from "./pages/MapPage/USMapPage";
import GlobalVaccinesPage from "./pages/VaccinePage/GlobalVaccinesPage";
import USVaccinesPage from "./pages/VaccinePage/USVaccinesPage";
import NavBar from "./NavBar/NavBar";
import AppFooter from "./NavBar/AppFooter";
import { HashRouter, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/400.css";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HashRouter basename="/">
        <NavBar />
        <div style={{ padding: "80px 40px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistics" element={<GlobalStatsPage />} />
            <Route path="/map" element={<GlobalMapPage />} />
            <Route path="/statistics/us" element={<USStatsPage />} />
            <Route path="/map/us" element={<USMapPage />} />
            <Route path="/vaccines" element={<GlobalVaccinesPage />} />
            <Route path="/vaccines/us" element={<USVaccinesPage />} />
          </Routes>
        </div>
        <AppFooter />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
