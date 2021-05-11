import Head from 'next/head';
import Link from 'next/link';

const DefaultLayout = (props) => (
  <>
    <Head>
      <title>Admin Wedding</title>
      <meta charSet="utf-8" />
    </Head>
    <div>
      <div>{props.children}</div>
    </div>
  </>
);

export default DefaultLayout;
