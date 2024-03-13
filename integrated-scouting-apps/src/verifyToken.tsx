import { jwtVerify, base64url } from "jose";

async function VerifyLogin(cookie: any) {
  try {
    const hash = base64url.decode(process.env.REACT_APP_HASH as string);
    const payload = await jwtVerify(cookie, hash);
    if (!payload) {
      window.location.href = "/";
    }
  }
  catch (err) {
    console.log(err);
    window.location.href = "/";
  }
}
async function ChangeTheme(cookie: any) {
  try {
    if (cookie === "og") {
      setTimeout(() => {}, 50);
      document.body.style.backgroundColor = "#32a7dc";
    }
    else if (cookie === "看") {
      document.body.style.backgroundColor = "black";
    }
    else if (cookie === "dc") {
      document.body.style.backgroundColor = "#5865F2";
    }
    else if (cookie.substring(0, 2) === "lg") {
      setInterval(() => {
        const colors = ["black", "#433C3C", "#692090", "#32a7dc", "indigo", "violet"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
      }, Number(cookie.substring(2)));
    }
  }
  catch (err) {
    console.log(err);
  }
}
export default {VerifyLogin, ChangeTheme};