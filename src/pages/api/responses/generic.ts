export const badRequest = () => new Response(null, {status: 400})

export const missingResource = () => new Response(null, {status: 404})

export const emptyJsonBody = () => new Response(JSON.stringify({}), {
  status: 200,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const jsonBody = (body: unknown) => new Response(JSON.stringify(body), {
  status: 200,
  headers: {
    'Content-Type': 'application/json'
  }
})