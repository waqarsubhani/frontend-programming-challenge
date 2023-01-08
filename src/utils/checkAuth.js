import jwtDecode from "jwt-decode";
import { LocalService } from "./LocalStorage";

export function checkAuth() {
  // Get the JWT from local storage or a cookie
  const jwt = LocalService.getData("jwt");

  // If there is no JWT, the user is not authenticated
  if (!jwt) {
    return false;
  }

  // Otherwise, decode the JWT to get the expiry time
  const expiry = jwtDecode(jwt).exp;

  // If the expiry time is in the past, the token is no longer valid
  if (expiry < Date.now() / 1000) {
    return false;
  }

  // If the JWT is valid, the user is authenticated
  return true;
}
