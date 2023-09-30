import React, { useEffect } from "react";
import { googlAuthentication } from "../../../api/auth";
import {
  AUTH_TOKEN_EXPIRY,
  destroyCookie,
  getCookie,
  setCookie,
} from "../../../utils/Cookie";

const CookieSeter = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const forLogin = getCookie("forLogin");

    googlAuthentication(code, forLogin)
      .then((response) => {
        console.log(response);
        const { isUserAlreadyExist, isUserNotFound, token, forRegistration } =
          response.data;

        if (forLogin) {
          destroyCookie("forLogin");
        }

        if (isUserNotFound) {
          window.alert(
            "User not found try to join with your google or facebook account redirecting to join page"
          );
          window.location.href = "/join";
        }

        if (isUserAlreadyExist) {
          window.alert(
            "User already exist with your google or facebook accountredirecting to login page"
          );

          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }

        if (forRegistration && token) {
          setCookie("token", token, AUTH_TOKEN_EXPIRY);
          window.location.href = "/setup";
        } else if (token) {
          setCookie("token", token, AUTH_TOKEN_EXPIRY);
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default CookieSeter;
