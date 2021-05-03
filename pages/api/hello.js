// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';

export default (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('foo', 'haweuh34', {
    httpOnly: true,
    secure : process.env.NODE_ENV !== "development",
    maxAge : 60 * 60,
    sameSite: "strict",
    path: "/"
  }));
  res.status(200).json({ name: 'John Doe' })
}
