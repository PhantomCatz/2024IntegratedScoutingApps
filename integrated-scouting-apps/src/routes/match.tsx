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

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;
  let teamNum = 0;

  async function setNewMatchScout(event: any) {
    const body = {
      "matchIdentifier": {
        "Initials": event.initials,
        "robot_position": event.robotpos,
        "match_event": eventname,
        "match_level": event.matchlevel + (event.roundnum !== undefined ? event.roundnum : ""),
        "match_number": event.matchnum,
        "team_number": teamNum,
        "starting_position": event.startingloc,
      },
      "auto": {
        "auto_preLoad": event.preloaded,
        "auto_preload_scored": event.preloadscored,
        "auto_leave": event.leavespawn,
        "auto_amps_scored": event.auton_ampscored,
        "auto_speaker_scored": event.auton_speakerscored,
        "auto_scoring_location": event.auton_scoringloc,
        "auto_pieces_picked": event.piecespicked,
        "auto_missed_pieces_amp": event.auton_missedpiecesamp,
        "auto_missed_pieces_speaker": event.auton_missedpiecesspeaker,
        "auto_path": imageURI.current,
        "auto_total_points": 0,
        "auto_comments": event.auton_comments,
      },
      "teleop": {
        "teleop_coop_pressed": event.cooppressed,
        "teleop_coop_first": event.cooppressed1st,
        "teleop_amps_scored": event.tele_ampscored,
        "teleop_speaker_scored": event.tele_speakerscored,
        "teleop_times_amplify": event.timesamplified,
        "teleop_pieces_note_amplifying_scored": event.amplifyscored,
        "teleop_ground": event.groundintake,
        "teleop_source": event.sourceintake,
        "teleop_traverse_stage": event.traversedstage,
        "teleop_missed_pieces_amp": event.tele_missedpiecesamp,
        "teleop_missed_pieces_speaker": event.tele_missedpiecesspeaker,
        "teleop_scoring_location": event.tele_scoringloc,
        "teleop_total_points": 0,
      },
      "engGame": {
        "EG_climbed": event.climbed,
        "EG_timeLeft_when_climb": event.timeleft,
        "EG_parked": event.parked,
        "EG_trapScored": event.trapscored,
        "EG_harmony": event.harmony,
        "EG_mic_score": event.spotlit,
        "EG_climbing_affect": event.climbingaffected,
      },
      "overAll": {
        "OA_hoarded": event.hoarded,
        "OA_robot_died": event.robotdied,
        "OA_was_defend": event.wasdefended,
        "OA_defend": event.defended,
        "OA_pushing_rating": event.pushing, 
        "OA_counter_defense": event.counterdefense,
        "OA_numbers_penalties": event.numpenalties,
        "OA_penalties_comments": event.penaltiesincurred,
        "OA_comments": event.comments,
        "OA_driver_skill": event.driverskill,
      }
    };
    const WORKING_TEST_DO_NOT_REMOVE_OR_YOU_WILL_BE_FIRED = {
      "matchIdentifier": {
        "Initials": "nk",
        "robot_position": "red_3",
        "match_event": "2024test",
        "match_level": "qm",
        "match_number": 1,
        "team_number": 0,
        "starting_position": "middle"
      },
      "auto": {
        "auto_preLoad": true,
        "auto_preload_scored": true,
        "auto_leave": true,
        "auto_amps_scored": 2,
        "auto_speaker_scored": 1,
        "auto_scoring_location": "both",
        "auto_pieces_picked": [
          0,0
        ],
        "auto_missed_pieces_amp": 3,
        "auto_missed_pieces_speaker": 4,
        "auto_path": "test",
        "auto_total_points": 0,
        "auto_comments": "test"
      },
      "teleop": {
        "teleop_coop_pressed": true,
        "teleop_coop_first": true,
        "teleop_amps_scored": 1,
        "teleop_speaker_scored": 1,
        "teleop_times_amplify": 1,
        "teleop_pieces_note_amplifying_scored": 12,
        "teleop_ground": true,
        "teleop_source": true,
        "teleop_traverse_stage": true,
        "teleop_missed_pieces_amp": 1,
        "teleop_missed_pieces_speaker": 2,
        "teleop_scoring_location": "both",
        "teleop_total_points": 0
      },
      "engGame": {
        "EG_climbed": true,
        "EG_timeLeft_when_climb": 1,
        "EG_parked": true,
        "EG_trapScored": true,
        "EG_harmony": false,
        "EG_mic_score": true,
        "EG_climbing_affect": true
      },
      "overAll": {
        "OA_hoarded": true,
        "OA_robot_died": false,
        "OA_was_defend": true,
        "OA_defend": true,
        "OA_pushing_rating": 1,
        "OA_counter_defense": 1,
        "OA_numbers_penalties": 1,
        "OA_penalties_comments": "test",
        "OA_comments": "test",
        "OA_driver_skill": 1
      }
    }
    try {
      await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => response.json()).then(data => console.log(data));
    }
    catch (err) {
      console.log(err);
    }
  };
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
        teamNum = Number(fullTeam.substring(3));
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
        teamNum = Number(fullTeam.substring(3));
        console.log(teamNum);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  async function calculateMatchLevel() {
    const matchlevel = form.getFieldValue('matchlevel');
    if (matchlevel !== "qm") {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }
  function preMatch() {
    type FieldType = {
      initials: string,
      matchlevel: string,
      matchnum: number,
      robotpos: string,
      startingloc: string,
      preloaded: boolean,
      roundnum: number,
    };
    const rounds = [
      { label: "Qualifications", value: "qm" },
      { label: "Semifinals", value: "sf"},
      { label: "Finals", value: "f1" },
    ];
    const robotpos = [
      { label: "R1", value: "red_1" },
      { label: "R2", value: "red_2" },
      { label: "R3", value: 'red_3' },
      { label: "B1", value: "blue_1" },
      { label: "B2", value: "blue_2" },
      { label: "B3", value: 'blue_3' },
    ];
    const startingloc = [
      { label: "Left", value: "left" },
      { label: "Middle", value: "middle" },
      { label: "Right", value: 'right' },
    ];
    return (
      <div>
        <h2>Scouter Initials</h2>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='NK' maxLength={2} className="input"/>
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber controls placeholder='Match #' min={1} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select placeholder='Match Level' options={rounds} onChange={()=> {calculateMatchLevel(); updateTeamNumber();}} className="input"/>
        </Form.Item>
        <h2 style={{ display: isVisible ? 'inherit' : 'none' }}>Round #</h2>
        <Form.Item<FieldType> name="roundnum" rules={[{ required: isVisible ? true : false, message: 'Please input the round number!' }]}>
          <InputNumber controls placeholder='Round #' min={1} onChange={updateTeamNumber} style={{ display: isVisible ? 'inherit' : 'none' }} className="input"/>
        </Form.Item>
        <h2>Robot Position</h2>
        <Form.Item<FieldType> name="robotpos" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select placeholder='Robot Position' options={robotpos} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select placeholder='Starting Location' options={startingloc} className="input"/>
        </Form.Item>
        <h2>Preloaded</h2>
        <Form.Item<FieldType> name="preloaded" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      auton_speakerscored: number,
      auton_ampscored: number,
      auton_missedpiecesamp: number,
      auton_missedpiecesspeaker: number,
      leavespawn: boolean,
      auton_scoringloc: string,
      preloadscored: boolean,
      piecespicked: string,
      auton_comments: string,
      imagepath: string,
    };
    const scoringloc = [
      { label: "Amp", value: "amp" },
      { label: "Speaker", value: "speaker" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const piecespicked = [
      { label: "W1", value: "wing1" },
      { label: "W2", value: "wing2" },
      { label: "W3", value: 'wing3' },
      { label: "C1", value: "center1" },
      { label: "C2", value: "center2" },
      { label: "C3", value: 'center3' },
    ];
    return (
      <div>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="auton_speakerscored" rules={[{ required: true, message: 'Please input the number of speaker notes scored!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="auton_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of misssed speaker pieces!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
        <h2>Leave Spawn</h2>
        <Form.Item<FieldType> name="leavespawn" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select placeholder='Scoring Location' options={scoringloc} className='input'/>
        </Form.Item>
        <h2>Preload Scored</h2>
        <Form.Item<FieldType> name="preloadscored" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="piecespicked" rules={[{ required: true, message: 'Please input the pieces picked!' }]}>
          <Select placeholder='Pieces Picked' mode='multiple' options={piecespicked} className='input'/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="auton_comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea placeholder='Comments' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={canvasRef}
            width='50rem'
            height='50rem'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={color ? field_red : field_blue}
            exportWithBackgroundImage={true}
            style={{paddingBottom: '5%'}}
            onChange={(value) => {canvasRef.current?.exportImage('png').then(async data => imageURI.current = data);}}
          />
          <Flex justify='in-between' style={{paddingBottom: '10%'}}>
            <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
        </div>
      </div>
    );
  }
  function teleopMatch() {
    type FieldType = {
      tele_speakerscored: number,
      tele_ampscored: number,
      timesamplified: number,
      groundintake: boolean,
      sourceintake: boolean,
      tele_scoringloc: string,
      amplifyscored: boolean,
      cooppressed: boolean,
      cooppressed1st: boolean,
      traversedstage: boolean,
      tele_missedpiecesamp: number,
      tele_missedpiecesspeaker: number,
    };
    const scoringloc = [
      { label: "Amp", value: "amp" },
      { label: "Speaker", value: "speaker" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    return (
      <div>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="tele_speakerscored" rules={[{ required: true, message: 'Please input the number of speaker notes scored!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="tele_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true, message: 'Please input the number of times the speaker was amplified!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Ground Intake</h2>
        <Form.Item<FieldType> name="groundintake" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Source Intake</h2>
        <Form.Item<FieldType> name="sourceintake" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="tele_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select placeholder='Scoring Location' options={scoringloc} className="input"/>
        </Form.Item>
        <h2>Amplified Score</h2>
        <Form.Item<FieldType> name="amplifyscored" rules={[{ required: true, message: 'Please input the number of notes scored during the amplifier period!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Coopertition Pressed</h2>
        <Form.Item<FieldType> name="cooppressed" valuePropName="checked">
          <Checkbox className='input_checkbox'/> 
        </Form.Item>
        <h2>Cooperated First</h2>
        <Form.Item<FieldType> name="cooppressed1st" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Traversed Stage</h2>
        <Form.Item<FieldType> name="traversedstage" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of missed speaker pieces!' }]}>
          <InputNumber controls min={0} className="input"/>
        </Form.Item>
      </div>
    );
  }
  function endMatch() {
    type FieldType = {
      climbed: boolean,
      timeleft: number,
      harmony: boolean,
      spotlit: boolean,
      climbingaffected: boolean,
      parked: boolean,
      trapscored: boolean,
    };
    return (
      <div className='matchbody'>
        <h2>Climbed</h2>
        <Form.Item<FieldType> name="climbed" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Time Left</h2>
        <Form.Item<FieldType> name="timeleft" rules={[{ required: true, message: 'Please input the time left!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Harmony</h2>
        <Form.Item<FieldType> name="harmony" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Spotlit</h2>
        <Form.Item<FieldType> name="spotlit" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Climbing Affected</h2>
        <Form.Item<FieldType> name="climbingaffected" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Parked</h2>
        <Form.Item<FieldType> name="parked" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Trap Scored</h2>
        <Form.Item<FieldType> name="trapscored" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>
    );
  }
  function overall() {
    type FieldType = {
      robotdied: boolean;
      pushing: number;
      defended: boolean;
      hoarded: boolean;
      wasdefended: boolean;
      numpenalties: number;
      penaltiesincurred: string;
      comments: string;
      driverskill: number,
      counterdefense: number,
    };
    return (
      <div className='matchbody'>
        <h2>Robot Died</h2>
        <Form.Item<FieldType> name="robotdied" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pushing (0-4)</h2>
        <Form.Item<FieldType> name="pushing" rules={[{ required: true, message: 'Please input the pushing rating!' }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Counterdefense (0-4)</h2>
        <Form.Item<FieldType> name="counterdefense" rules={[{ required: true, message: 'Please input the counterdefense rating!' }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Driver Skill (0-4)</h2>
        <Form.Item<FieldType> name="driverskill" rules={[{ required: true, message: 'Please input the driver skill rating!' }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Defended</h2>
        <Form.Item<FieldType> name="defended" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Hoarded</h2>
        <Form.Item<FieldType> name="hoarded" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Was Defended</h2>
        <Form.Item<FieldType> name="wasdefended" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Num Penalties</h2>
        <Form.Item<FieldType> name="numpenalties" rules={[{ required: true, message: 'Please input the number of penalties incurred!' }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Penalties Incurred</h2>
        <Form.Item<FieldType> name="penaltiesincurred" rules={[{ required: true, message: 'Please describe the penalties incurred!' }]}>
          <TextArea placeholder='Penalties Incurred' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea placeholder='Comments' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <Input type="submit" value="Submit" className='input'/>
      </div>
    )
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Pre',
      children: preMatch(),
    },
    {
      key: '2',
      label: 'Auton',
      children: AutonMatch(),
    },
    {
      key: '3',
      label: 'Teleop',
      children: teleopMatch(),
    },
    {
      key: '4',
      label: 'End',
      children: endMatch(),
    },
    {
      key: '5',
      label: 'OA',
      children: overall(),
    },
  ];
  return (
    <body>
      <div className='banner'>
        <header>
          <a href='/scoutingapp'>
            <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''/>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Match Scout</h1>
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

          robotdied: false,
          defended: false,
          hoarded: false,
          wasdefended: false,
        }}
        onFinish={async event => {
          try {
            await setNewMatchScout(event);
            form.resetFields();
          }
          catch (err) {
            console.log(err);
          }
        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs'/>
      </Form>
    </body>
  );
}

export default MatchScout;