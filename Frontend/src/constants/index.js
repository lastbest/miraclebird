export const API_BASE_URL = "https://j7c107.p.ssafy.io/api";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const NOW_ACCESS_TOKEN = localStorage.getItem("accessToken");
//export const NOW_ACCESS_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjY0MjQxMzQ2LCJleHAiOjE2NjQ0MjEzNDZ9.kZo03JPLwsoFxbYiFGc-ca6hNIHN_SQ0oAGxdOZdWZ8s-9gMh6qf8ZLb-Gt1rYixussndi0oh0anqLMEqv7raA";
export const OAUTH2_REDIRECT_URI = "https://j7c107.p.ssafy.io/oauth2/redirect";
export const KAKAO_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;
