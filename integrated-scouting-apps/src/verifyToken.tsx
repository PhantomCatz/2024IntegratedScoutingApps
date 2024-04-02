import { jwtVerify, base64url } from "jose";

async function VerifyLogin(cookie: any) {
  try {
    const hash = base64url.decode(process.env.REACT_APP_HASH as string);
    const payload = await jwtVerify(cookie, hash);
    if (payload && window.location.pathname === "/") {
      window.location.href = "/home";
    }
    else if (!payload && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }
  catch (err) {
    if (window.location.pathname === "/") {

    }
    else {
      window.location.href = "/";
    }
  }
}
async function ChangeTheme(cookie: any) {
  try {
    if (cookie === "og") {
      document.body.style.backgroundColor = "#32a7dc";
    }
    else if (cookie === "看") {
      document.body.style.backgroundColor = "#000000";
    }
    else if (cookie === "dc") {
      document.body.style.backgroundColor = "#5865F2";
    }
    else if (cookie.substring(0, 2) === "lg") {
      setInterval(() => {
        document.body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
      }, Number(cookie.substring(2)));
    }
    else if (cookie === "ds") {
      document.body.style.backgroundColor = "#4A412A";
    }
  }
  catch (err) {
  }
}
// eslint-disable-next-line
export default { VerifyLogin, ChangeTheme };
