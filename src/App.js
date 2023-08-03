import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import All_Components from "./Components/All_Components";
import SignupPage from "./Features/Signup";
import LoginPopup from "./Features/LoginPopup";
import Page_404 from "./Components/Page_404";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";

function App() {
  const [loading, setLoading] = useState(true);
  const [uData, SetuData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const webAuth = new auth0.WebAuth({
      domain: "techtribe.us.auth0.com",
      clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
    });
    const parseAccessToken = () => {
      const hash = window.location.hash;
      const tokenIndex = hash.indexOf("access_token=");
      if (tokenIndex !== -1) {
        const endTokenIndex = hash.indexOf("&", tokenIndex);
        const accessToken = hash.substring(
          tokenIndex + "access_token=".length,
          endTokenIndex !== -1 ? endTokenIndex : undefined
        );
        return accessToken;
      }
      return null;
    };

    const accessToken = parseAccessToken();
    if (accessToken) {
      webAuth.client.userInfo(accessToken, function (err, user) {
        if (err) {
          console.error("Error fetching user profile:", err);
          return;
        }
        // Store the user profile in state
        SetuData(user);
        sessionStorage.setItem("username", JSON.stringify(user));
        setLoading(false);
      });
    } else {
      const userInfo = sessionStorage.getItem("username");
      if (!userInfo && location.pathname == "/") {
        navigate("/login");
      } else if (userInfo) {
        SetuData(JSON.parse(userInfo));
      }
      setLoading(false);
    }
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen absolute">
          <img src="/loader.svg" />
        </div>
      ) : (
        <Routes>
          <Route path={"/signup"} element={<SignupPage />} />
          <Route path={"/login"} element={<LoginPopup />} />
          <Route path={"/"} element={<All_Components uData={uData} />} />
          <Route path={"/*"} element={<Page_404 />} />
        </Routes>
      )}
    </>
  );
}

export default App;
