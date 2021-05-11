import axios from 'axios';
import Router from 'next/router';
import { server } from '../config/server';

export async function myGet(url, ctx) {
  let response = '';

  try {
    response = await axios.get(url, {
      headers: ctx.req
        ? {
            cookie: ctx.req.headers.cookie,
            Authorization:
              ctx.req.cookies.tokenAccess === undefined
                ? ''
                : ctx.req.cookies.tokenAccess,
          }
        : undefined,
    });
  } catch (err) {
    if (err.response.status >= 400 && err.response.status < 600) {
      ctx.res.writeHead(302, {
        Location: `${process.env.SERVER_URL}/login`,
      });
      ctx.res.end();
      // return {
      //   data: err.response.data,
      // };
    }

    if (err.response.status >= 400 && err.response.status < 600) {
      Router.push('/login');
      // return {
      //   data: err.response.data,
      // };
    }
  }

  return response.data;
}
