import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useHref } from 'react-router-dom';

function DTFhome(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;
  let teamNum = 0;

  async function setNewDTFhome(event: any/*, autoPath: string*/) {
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

  function teamSelections() {
    type FieldType = {
      team1: number,
      team2: number,
      team3: number,
    };

    return (
      <div>
        <h2>Team 1</h2>
        <Form.Item<FieldType> name="team1" rules={[{ required: true, message: 'Please input the team 1!' }]}>
          <InputNumber controls placeholder='team 1' min={1} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <h2>Team 2</h2>
        <Form.Item<FieldType> name="team2" rules={[{ required: true, message: 'Please input the team 2!' }]}>
          <InputNumber controls placeholder='team 2' min={1} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <h2>Team 3</h2>
        <Form.Item<FieldType> name="team3" rules={[{ required: true, message: 'Please input the team 3!' }]}>
          <InputNumber controls placeholder='team 3' min={1} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <a href='/dtf'>
          <Input type="submit" value="Submit" className='input'/>
        </a>
        
      </div>
    );
  }

  function openLink() {
    window.location.href = "/dtf";
  }  

  async function updateTeamNumber() {
    try {
      if (isVisible) {
        const matchID = eventname + "_" + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum') + "m" + form.getFieldValue('roundnum');
        const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + matchID,
          {
            method: "GET",
            headers: {
              'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
            }
          });
        const data = await response.json();
        console.log(data);
        const team_color = form.getFieldValue('robotpos').substring(0, form.getFieldValue('robotpos').indexOf('_'));
        setColor((team_color === "red" ? true : false));
        const team_num = form.getFieldValue('robotpos').substring(form.getFieldValue('robotpos').indexOf('_') + 1) - 1;
        const fullTeam = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
        teamNum = fullTeam.substring(3);
        console.log(teamNum);
      }
      else {
        const matchID = eventname + "_" + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum');
        const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + matchID,
          {
            method: "GET",
            headers: {
              'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
            }
          });
        const data = await response.json();
        console.log(data);
        const team_color = form.getFieldValue('robotpos').substring(0, form.getFieldValue('robotpos').indexOf('_'));
        setColor((team_color === "red" ? true : false));
        const team_num = form.getFieldValue('robotpos').substring(form.getFieldValue('robotpos').indexOf('_') + 1) - 1;
        const fullTeam = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
        teamNum = fullTeam.substring(3);
        console.log(teamNum);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Team Selection',
      children: teamSelections(),
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
          await setNewDTFhome(event/*, imageURI.current as string*/);
          //window.location.reload();
          teamSelections();
          openLink();

        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form>
    </body>
  );
}

export default DTFhome;