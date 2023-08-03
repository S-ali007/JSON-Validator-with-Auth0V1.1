import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth0 from "auth0-js";
import { User } from "@auth0/auth0-react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

function LoginPopup({ onClose, setToken }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginError(null);

      const webAuth = new auth0.WebAuth({
        domain: "techtribe.us.auth0.com",
        clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
        redirectUri: "https://melodic-cassata-2af0ea.netlify.app/",
      });

      const { email, password } = formData;
      webAuth.login(
        {
          connection: "JSON-Validator",
          username: email,
          password: password,
          responseType: "token",
        },
        async function (err, authResult) {
          setLoading(false);

          if (err) {
            console.error("Error logging in:", err);
            setLoginError("Error logging in. Please check your credentials.");
            alert(err.description);
            return;
          }

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
              setUserProfile(user);

              sessionStorage.setItem("username", user.sub);
              console.log(user);
            });
          }

          // // After successful signup, login the user to get the accessToken
          webAuth.login(
            {
              connection: "JSON-Validator",
              username: email,
              password: password,
            },
            function (err, authResult) {
              if (err) {
                console.error("Error logging in:", err.code);
                alert("Error logging in. Please check your credentials.");
                return;
              }
              navigate("/");
            }
          );
        }
      );
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Error logging in. Please try again later.");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-[600px]">
        <div className="border- border-[2px] max-w-[500px] w-full  rounded-[20px]">
          <form className="max-w-[500px] w-full p-[2px]">
            <div className="bg-sky-500  rounded-[20px] text-white">
              <h3 className="max-w-[250px] w-full items-center text-center font-bold text-[30px] py-4 ">
                Log In To JSON VALIDATOR
              </h3>
            </div>
            <div className="px-[4px] mt-[20px]">
              <div className="mb-3 flex gap-[30px] h-[50px]">
                <label className="w-full max-w-[100px] text-center flex justify-center items-center">
                  Email address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control w-full border border-blue-300 rounded-[5px] px-[4px] outline-none hover:border-sky-700 hover:border-b-4"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3 flex gap-[60px] h-[50px]">
                <label className="w-full max-w-[70px] flex justify-center items-center">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="form-control w-full border border-blue-300 rounded-[5px] px-[4px] outline-none hover:border-sky-700  hover:border-b-4"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-primary border-[2px] font-bold text-sky-500 hover:text-white text-[16px] rounded-[10px] max-w-[200px] w-full text-center  py-[5px]  hover:bg-sky-500"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
              {loginError && (
                <div className="text-red-600 mt-2 text-center">
                  {loginError}
                </div>
              )}
              {userProfile && (
                <div className="text-green-600 mt-2 text-center">
                  Logged in successfully as {userProfile.name}
                </div>
              )}
            </div>
          </form>
          <div className="flex items-center justify-center">
            <Link to="/Signup">
              <button className="mt-4">
                Not Have an Account ? Sign up now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPopup;
