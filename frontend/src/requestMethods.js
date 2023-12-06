import axios from "axios";

import { config } from "./urlconstant";
const URL = config.url;

const BASE_URL = URL


// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken || " ";
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${'pk.eyJ1Ijoic2FtMDA3ayIsImEiOiJjbGxkc3hmdTEwY29wM2hvMTY5M2I2ODgxIn0.UYmLlrxhuMxP5YVll-ZiHg'}` },
});