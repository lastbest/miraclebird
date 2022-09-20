import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import kakaoLogo from "../assets/button/kakao_logo.png";
import { KAKAO_AUTH_URL } from "../constants";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);
  return (
    <>
      Sign in
      <BrowserView>
        <div className="App">
          <a href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo} alt="Kakao"></img>
          </a>
        </div>
      </BrowserView>
      <MobileView>
        <div className="App">
          <a href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo}></img>
          </a>
        </div>
      </MobileView>
    </>
  );
}

export default Login;
