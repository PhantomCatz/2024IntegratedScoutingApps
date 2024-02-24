import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import { Button } from 'antd';
import { useEffect } from 'react';

function HomePage(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    <body>
      <div>
        <header className='banner'>
          <img src={no_image} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''></img>
          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Strateg<span><a href='/buh'>y</a></span> App</h1>
            </td>
          </table>
        </header>
      </div>
      <div style={{height: '1250px'}}>
        <Button className='homebutton' href='/scoutingapp'>Scouting App</Button>
        <Button className='homebutton' href='/dtf'>DTF</Button>
      </div> 
    </body>
  );
}

export default HomePage;
