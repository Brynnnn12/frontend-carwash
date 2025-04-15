import { BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {MainRoutes}
        {DashboardRoutes}
      </Routes>
    </Router>
  );
}

export default App;
