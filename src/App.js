import logo from "./logo.svg";
import "./App.css";
import {ThemeProvider} from "@mui/system";
import theme from "./theme/theme";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
