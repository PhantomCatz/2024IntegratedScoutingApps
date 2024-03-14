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

export default VerifyLogin;