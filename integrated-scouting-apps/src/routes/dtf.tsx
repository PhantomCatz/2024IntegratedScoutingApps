import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button, Statistic } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function DTF(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;
  let teamNum = 0;

  async function setNewDTF(event: any/*, autoPath: string*/) {
    const body = {
      "teamselections": {
        "event": eventname,
        "team_1": event.team1,
        "team_2": event.team2,
        "team_3": event.team3,
    }
  };
    try {
      await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Request-Headers": "*",
          "Content-Type": "application/json",
          "Origin": "localhost:3000",
          "Database": "MatchScouting"
        }
      }).then(response => response.json()).then(data => console.log(data))}
    catch (err) {
      console.log(err);
    }
  };

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
        <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px' }} alt=''/>

        <h2 style={{textAlign: 'center'}}>Intake Source</h2>

        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>
        <div style={{display: 'inline'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <h2 style={{textAlign: 'center'}}>Traversed Stage</h2>
        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>
        <div style={{display: 'inline'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox className='dtf-input_checkbox'/>
        <Checkbox className='dtf-input_checkbox'/>
        </div>
        <h2 style={{textAlign: 'center'}}>Driver Skill</h2>
        <div style={{textAlign: 'center'}}>
          <h2 style={{display: 'inline'}}>Team1</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team2</h2> 
          <h2 style={{display: 'inline', marginLeft: '15%'}}>Team3</h2>
        </div>
        <Statistic title="" value={1} style={{ textAlign: 'center' }} />
                
      </div>
      
    )
  }

  function Team1() {
    return null
  }

  function Team2() {
    return null
  }

  function Team3() {
    return null
  }
  
  

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Summary',
      children: Summary(),
    },
    {
        key: '2',
        label: 'Team 1',
        children: Team1(),
      },
      {
        key: '3',
        label: 'Team 2',
        children: Team2(),
      },
      {
        key: '4',
        label: 'Team 3',
        children: Team3(),
      }
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
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Drive Team Feeder</h1>
            </td>
          </table>
        </header>
      </div>
      <Form
        form={form}
        initialValues={{
          auton_speakerscored: false,
          auton_ampscored: false,
          leavespawn: false,
          preloadscored: false,

          groundintake: false,
          sourceintake: false,
          amplifyscored: false,
          cooppressed: false,
          cooppressed1st: false,
          traversedstage: false,

          climbed: false,
          harmony: false,
          spotlit: false,
          climbingaffected: false,
          parked: false,
          trapscored: false,
        }}
        onFinish={async event => {
          canvasRef.current?.exportImage('png').then(data => imageURI.current = data);
          await setNewDTF(event/*, imageURI.current as string*/);
          //window.location.reload();
        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form>
    </body>
  );

}
export default DTF;