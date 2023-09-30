import instance from "../Components/Axios/axios";

const getGoogleAuthUrl = async () => {
  const response = await instance({ url: "/auth/googleAuth", method: "GET" });
  return response;
};

const googlAuthentication = async (code, forLogin) => {
  const response = await instance({
    url: "/auth/googleLoginCallback",
    method: "POST",
    data: { code, forLogin },
  });
  return response;
};

export { getGoogleAuthUrl, googlAuthentication };
