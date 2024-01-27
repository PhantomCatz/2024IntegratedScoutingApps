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
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/strategic'>Strategic</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/pit'>Pit</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/lookup'>Data Lookup</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/picklists'>Picklists</Button>
      </div>
      <iframe width="475" height="250" className='timer' src="https://vclock.com/embed/timer/#date=2024-02-28&title=Scouting+App+Done!&theme=1&ampm=1&sound=xylophone" frameBorder="0" allowFullScreen></iframe>
    </body>
  );
}

export default ScoutingPage;
