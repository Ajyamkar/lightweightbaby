import Cookies from "universal-cookie";

const cookies = new Cookies();

const AUTH_TOKEN_EXPIRY = 60 * 60 * 24;

const getCookie = (key) => {
  return cookies.get(key);
};

const setCookie = (key, value, expiresIn) => {
  cookies.set(key, value, {
    path: "/",
    expiresIn,
  });
};

const destroyCookie = (key) => {
  cookies.remove(key);
};

export { AUTH_TOKEN_EXPIRY, getCookie, setCookie, destroyCookie };
