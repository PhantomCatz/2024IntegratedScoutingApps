import '../public/stylesheets/dtf.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useParams } from 'react-router-dom';

function DTFTeams(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  const { team_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);

  let team1_number = '2637';//null protection
  let team2_number = '2637';//null protection
  let team3_number = '2637';//null protection

  if(team_number){
    const teams = team_number.split(',');
    console.log(teams);

    team1_number = teams[0];
    
    if(teams[1]) {
      team2_number = teams[1];
    } else {
      team2_number = 'OwO';
    }

    if(teams[2]) {
      team3_number = teams[2];
    } else {
      team3_number = 'OwO';
    }
  }
  
  console.log(team1_number, team2_number, team3_number);
  
  function Summary() {
    return (
      <div>
        <h2>working</h2>
      </div>
    );
  }

  function Team1() {
    return (
      <div>
        <h2>working</h2>
      </div>
    );
  }

  function Team2() {
    if(team2_number == 'OwO') {
      return (
        <div>
          <h2>working</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>working</h2>
      </div>
    )
  }

  function Team3() {
    if(team3_number == 'OwO') {
      return (
        <div>
          <h2>tOwOt</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>working</h2>
      </div>
    )
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Summary',
      children: Summary(),
    },
    {
      key: '2',
      label: team1_number,
      children: Team1(),
    },
    {
      key: '3',
      label: team2_number,
      children: Team2(),
    },
    {
      key: '4',
      label: team3_number,
      children: Team3(),
    },
  ];
  return (
    <body>
      <div className='banner'>
        <header>
          <a href='/dtf'>
            <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''/>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Team {team_number}</h1>
            </td>
          </table>
        </header>
      </div>
      <Tabs defaultActiveKey="1" items={items} className='tabs' />
    </body>
  );
}

export default DTFTeams;
