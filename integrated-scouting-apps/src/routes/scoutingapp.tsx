import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { Button } from 'antd';
import { useEffect } from 'react';

function ScoutingPage(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    <body>
      <div className='banner'>
        <header>
          <a href='/'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
            </td>
            <td>
              <h1 style={{ display: 'inline-block' }}>Scouting App</h1>
            </td>
          </table>
        </header>
      </div>
      <div className='body'>
        <Button className='mainbutton' href='/scoutingapp/match'>Match</Button>
        <Button className='mainbutton' href='/scoutingapp/strategic'>Strategic</Button>
        <Button className='mainbutton' href='/scoutingapp/pit'>Pit</Button>
        <Button className='mainbutton' href='/scoutingapp/lookup'>Data Lookup</Button>
        <Button className='mainbutton' href='/scoutingapp/picklists'>Picklists</Button>
      </div>
      <iframe height="500px" width="500px" src="https://vclock.com/embed/timer/#date=2024-02-28&title=finish+scouting+app+and+enjoy+life&theme=1" title='lisa gay'></iframe>
    </body>
  );
}

export default ScoutingPage;
