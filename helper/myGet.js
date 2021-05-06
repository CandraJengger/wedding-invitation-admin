import axios from 'axios';
import Router from 'next/router';

export async function myGet(url, ctx) {
  let response = '';
  const cookie = ctx.req.headers.cookie;
  const tokenAccess =
    ctx.req.cookies.tokenAccess === undefined
      ? ''
      : ctx.req.cookies.tokenAccess;

  try {
    response = await axios.get(url, {
      headers: {
        cookie: cookie,
        Authorization: tokenAccess,
      },
    });
  } catch (err) {
    console.log(err)
    if (err.response.status >= 400 && err.response.status < 600) {
      ctx.res.writeHead(302, {
        Location: 'http://localhost:3000/login',
      });
      ctx.res.end();
      return {
        data: err.response.data,
      };
    }

    if (err.response.status >= 400 && err.response.status < 600) {
      Router.replace('/login');
      return {
        data: err.response.data,
      };
    }
  }

  return response.data;
}