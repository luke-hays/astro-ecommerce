import type { AstroCookies } from "astro"

interface ApiRouteProps {
  request: Request,
  cookies: AstroCookies,
  key: string,
}

// The reason for checking cookies and the url is that we may make a request from the server
// In this instance we do not have the cookie, so we can make use of a query param
export const getValueFromApiRoute = ({request, cookies, key}: ApiRouteProps) => {
  const cookie = cookies.get("cart")

  if (cookie && cookie.value) {
    return cookie.value
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  
  return searchParams.get(key)
}