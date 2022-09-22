import React from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../store/user";

function OAuth2RedirectHandler() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const token = new URL(window.location.href).searchParams.get("token");
  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, null);

    return <Navigate to="/" />;
  }
}

export default OAuth2RedirectHandler;
