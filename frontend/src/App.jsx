import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Community from "./pages/Community";
import CommunityDetails from "./components/Community/CommunityDetails";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex flex-col min-h-screen bg-[#0B1120] text-white">
        <Navbar />

        <div class="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:id" element={<CommunityDetails />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/profile/:id" element={<Profile />} /> */}
            </Route>
          </Routes>
        </div>
        <Footer />
        </div>
        
    </AuthProvider>
  );
}

export default App;
