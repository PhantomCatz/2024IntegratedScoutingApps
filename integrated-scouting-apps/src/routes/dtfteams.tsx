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
      <div>

        {/* Auton Start */}
        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> {/* don't touch width value...it's calculated */}
          <h2 style={{textAlign: 'center'}}>Autonomous</h2>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
          <h2 style={{textAlign: 'center'}}>Speaker</h2>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
          <h2 style={{textAlign: 'center'}}>Amp</h2>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Average Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Average Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Peak Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Peak Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Lowest Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Auton Lowest Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Auton Scoring Ratio (Speaker : Amp)</h1>
          <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Robot Starting Position</h1>
            <div style={{textAlign: 'center'}}>
              <h2 style={{display: 'inline', marginLeft: '2%'}}>LEFT</h2>   {/* don't touch these values */}
              <h2 style={{display: 'inline', marginLeft: '10%'}}>MIDDLE</h2> 
              <h2 style={{display: 'inline', marginLeft: '9%'}}>RIGHT</h2>
            </div>
            <div>
              <Checkbox className='checkboxRedFixed' style={{width: '20%', marginLeft: '7%'}}/>
              <Checkbox className='checkboxRedFixed' style={{width: '20%', marginLeft: '12%'}}/>
              <Checkbox className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
            </div>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%'}}> 
          <h2 style={{textAlign: 'center'}}>Auton Path</h2>
          <img src={logo} style={{ height: 100 + '%', marginLeft: 'auto', marginRight: 'auto', width: 100 + '%'}} alt=''/>
        </div>

        {/* Teleop start */}

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h2 style={{textAlign: 'center'}}>Teleop</h2>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
          <h2 style={{textAlign: 'center'}}>Speaker</h2>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
          <h2 style={{textAlign: 'center'}}>Amp</h2>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Average Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Average Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Peak Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Peak Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
          <div style={{border: 'solid', width: '50%', height: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
            <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
          </div>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%'}}> 
          <h1 style={{textAlign: 'center'}}>Teleop Scoring Ratio (Speaker : Amp)</h1>
          <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
        </div>

        {/* EndGame Start */}
        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h2 style={{textAlign: 'center'}}>Endgame</h2>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Climbing Ratio (Speaker : Amp)</h1>
          <InputNumber controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Harmony</h1>
          <Checkbox className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Traverse Under Stage</h1>
          <Checkbox className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%'}}> 
          <h1 style={{textAlign: 'center'}}>Trap Score</h1>
          <Checkbox className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
        </div>

        {/* Overall Start */}
        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h2 style={{textAlign: 'center'}}>Overall</h2>
        </div>

        <div style={{border: 'solid', width: '99.6%', height: '100%'}}> 
          <h1 style={{textAlign: 'center'}}>Intake Source</h1>
            <div style={{textAlign: 'center'}}>
              <h2 style={{display: 'inline'}}>Ground</h2>
              <h2 style={{display: 'inline', marginLeft: '10%'}}>Source</h2>
            </div>
            <div>
              <Checkbox className='checkboxRedFixed' style={{width: '20%', marginLeft: '24%'}}/>
              <Checkbox className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
            </div>
        </div>

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
    <body className='body'>
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
