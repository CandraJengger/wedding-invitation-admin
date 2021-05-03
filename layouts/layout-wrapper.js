import DefaultLayout from './default';
import PlainLayout from './plain';

const layouts = {
  default: DefaultLayout,
  plain: PlainLayout,
};

const LayoutWrapper = (props) => {
  const Layout = layouts[props.children.type.layout];
  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>;
  }
  return <DefaultLayout {...props}>{props.children}</DefaultLayout>;
};

export default LayoutWrapper;
