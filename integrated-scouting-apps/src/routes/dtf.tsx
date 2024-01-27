import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import { useEffect } from 'react';

function DTF(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    //@Hyoungjun07 leave this here; it is the logo
    <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Drive Team Feeder</h1>
        </header>
    </div>
    // <Layout>
    //   <Header>
    //   </Header>
    //   <Layout>
    //     <Sider>left sidebar</Sider>
    //     <Content>main content</Content>
    //     <Sider>right sidebar</Sider>
    //   </Layout>
    //   <Footer>footer</Footer>
    // </Layout>
  );
}

export default DTF;