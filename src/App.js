import "./App.css";
import USStatsPage from "./pages/StatsPage/USStatsPage";
import GlobalStatsPage from "./pages/StatsPage/GlobalStatsPage";
import GlobalMapPage from "./pages/MapPage/GlobalMapPage";
import USMapPage from "./pages/MapPage/USMapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
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
      <Router>
        <NavBar />
        <div style={{ padding: "80px 20px 10px" }}>
          <Routes>
            <Route path="/" element={<GlobalMapPage />} />
            <Route path="/statistics/global" element={<GlobalStatsPage />} />
            <Route path="/statistics" element={<USStatsPage />} />
            <Route path="/map/us" element={<USMapPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
