import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { Button } from 'antd';
import { useEffect } from 'react';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
function ScoutingPage(props: any) {
  useEffect(() => { document.title = props.title; return () => { } }, [props.title]);
  const [cookies] = useCookies(['login', 'theme']);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => { } }, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => { } }, [cookies.theme]);

  return (
    <div>
      <meta name="viewport" content="maximum-scale=1.0" />
      <div className='banner'>
        <header>
          <a href='/home'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Strategic Scout</h1>
                </td>
              </tr>
            </tbody>

          </table>
        </header>
      </div>
      <div>
        <Button className='mainbutton' href='/scoutingapp/strategic/comment'>Comment</Button>
        <Button className='mainbutton' href='/scoutingapp/strategic/driverskill'>Driver Skill</Button>
      </div>
    </div>
  );
}

export default ScoutingPage;
