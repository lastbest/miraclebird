export const API_BASE_URL = "https://j7c107.p.ssafy.io/api";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const NOW_ACCESS_TOKEN = localStorage.getItem("accessToken");
//export const NOW_ACCESS_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjY0MjU4OTg2LCJleHAiOjE2NjQ0Mzg5ODZ9.LaPb16LAjh-mUAswIPK46hz1aBLCsd6IXUKa4lc_6VP484U4xWpKbZvU9lYNigze2YZlXk4KLvVlSJGBltAfcw";
export const OAUTH2_REDIRECT_URI = "https://j7c107.p.ssafy.io/oauth2/redirect";
export const KAKAO_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;
