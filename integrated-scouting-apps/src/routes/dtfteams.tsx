import '../public/stylesheets/dtf.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsProps, Input, Form, Select, Checkbox, InputNumber, Flex, Button, Statistic } from 'antd';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

function DTFTeams(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  const { team_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);

  let team1_number = '2637';//null protection
  let team2_number = '2637';//null protection
  let team3_number = '2637';//null protection

  function generateSquare(width: number, height: number, x: number, y: number) { //width: width of square, height: height of square, x: x-coordinte of square, y: y-coordinate of square, fyi: there are all percent input
    return (
      <svg width={width + x + '%'} height={height + y + '%'}>
        <rect x={x + '%'} y={y + '%'} width={width + '%'} height={height + '%'} fill="none" stroke="white" strokeWidth="4" />
      </svg>
    );
  }

  if(team_number){
    const teams = team_number.split(',');
    console.log(teams);

    team1_number = teams[0];
    
    if(teams[1]) {
      team2_number = teams[1];
    } else {
      team2_number = ' ';
    }

    if(teams[2]) {
      team3_number = teams[2];
    } else {
      team3_number = ' ';
    }
  }
  
  console.log(team1_number, team2_number, team3_number);
  
  function Summary() {
    return (
      <div>
        <h2 style={{textAlign:'center'}}>Allience Average Score</h2>
          <InputNumber controls placeholder='team 1' min={1} className="input"/>
        <h2 style={{textAlign: 'center'}}>Auton Path</h2>
        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '7%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '7%'}}>Team3</h2>
        </div>
        <div style={{textAlign: 'center'}}>
        <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px', marginLeft: '2%' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px', marginLeft: '2%' }} alt=''/>
        </div>
        

        <h2 style={{textAlign: 'center'}}>Intake Source</h2>

        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>
        <div style={{display: 'inline'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <h2 style={{textAlign: 'center'}}>Traversed Stage</h2>
        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>
        <div style={{display: 'inline'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='checkboxRedFixed'/>
        <Checkbox className='checkboxRedFixed'/>
        </div>
        <h2 style={{textAlign: 'center'}}>Driver Skill</h2>
        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>

        <div style={{display: 'inline'}}>
        <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber"/>
        <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{marginLeft: "4%"}}/>
        <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{marginLeft: "5%"}}/>
        </div>
        

        <h2 style={{textAlign: 'center'}}>Graph</h2> 
        <img src={logo} style={{ height: 100 + '%', marginLeft: 'auto', marginRight: 'auto', width: 100 + '%'}} alt=''/>
        
      </div>
    );
  }

  function Team1() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        {generateSquare(90, 50, 5, 50)} 
        <svg width="95%" height="-1000000%" > 
          <rect x="5%" y="0%" width="90%" height="100%" fill="none" stroke="white" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  function Team2() {
    if(team2_number == ' ') {
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

  function Team3() {
    if(team3_number == ' ') {
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
