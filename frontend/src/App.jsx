import "./App.css";
import Navbar from "./components/Navbar";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <>
      <Navbar />
      <PublicRoutes />
    </>
  );
}

export default App;
