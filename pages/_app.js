import LayoutWrapper from '../layouts/layout-wrapper';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <LayoutWrapper {...pageProps}>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}

export default MyApp;
