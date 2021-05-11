import axios from 'axios';
import Router from 'next/router';
import { server } from '../config/server';

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
        Cookie: cookie,
        Authorization: tokenAccess,
        "Content-Type": 'application/json',
      },
    });
    console.log(response);
  } catch (err) {
    console.log(err);
    if (err.response.status >= 400 && err.response.status < 600) {
      ctx.res.writeHead(302, {
        Location: `${process.env.SERVER_URL}/login`,
      });
      ctx.res.end();
      return {
        data: err.response.data,
      };
    }

    // if (err.response.status >= 400 && err.response.status < 600) {
      Router.replace('/login');
      // return {
      //   data: err.response.data,
      // };
    // }
  }

  return response.data;
}
