import type { AstroCookies } from "astro";
import { COOKIE_KEY_CART, PARAM_SESSION_ID } from "../../../utils/constants";

interface ApiRouteProps {
  request: Request;
  cookies: AstroCookies;
}

// The reason for checking cookies and the url is that we may make a request from the server
// In this instance we do not have the cookie, so we can make use of a query param
export const getCartValueFromApiRoute = ({
  request,
  cookies,
}: ApiRouteProps) => {
  const cookie = cookies.get(COOKIE_KEY_CART);

  if (cookie && cookie.value) {
    return cookie.value;
  }

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  return searchParams.get(PARAM_SESSION_ID);
};
