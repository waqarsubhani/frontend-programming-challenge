import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/login"
import Home from "./components/Home/home";
import { checkAuth } from "./utils/checkAuth";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();

  // Check the authentication status
  const isAuthenticated = checkAuth();

  useEffect(() => {
     // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
