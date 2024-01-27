import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function DTF(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;
  let teamNum = 0;

  async function setNewMatchScout(event: any, autoPath: string) {
    const body = {
      "matchIdentifier": {
        "initials": event.initials,
        "robot": event.robotnum,
        "match_event": eventname,
        "match_level": event.matchlevel,
        "match_number": event.matchnum,
        "team_number": teamNum,
      },
      "auto": {
        "auto_preload": event.preloaded,
        "auto_preload_scored": event.preloadscored,
        "auto_leave": event.leavespawn,
        "auto_amps_scored": event.auto_ampscored,
        "auto_speaker_scored": event.auto_speakerscored,
        "auto_scoring_location": event.auton_scoringloc,
        "auto_pieces_picked": event.auton_piecespicked,
        "auto_missed_pieces_amp": event.auton_missedpiecesamp,
        "auto_missed_pieces_speaker": event.auton_missedpiecesspeaker,
        "auto_path": autoPath,
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
        "OA_numbers_penalties": event.numpenalities,
        "OA_penalties_comments": event.penaltiesincurred,
        "OA_comments": event.comments,
        "OA_driver_skill": event.driverskill,
      }
    };
    try {
      await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Request-Headers": "Content-Type, Origin",
          "Content-Type": "application/json",
          "Origin": "localhost:3000",
          "Database": "MatchScouting"
        }
      }).then(response => response.json()).then(data => console.log(data));
    }
    catch (err) {
      console.log(err);
    }
  };
  function summary() {
    type FieldType = {
      initials?: string;
      matchlevel?: string;
      matchnum?: number;
      robotpos?: string;
      startingloc?: string;
      preloaded?: boolean;
    };
    const rounds = [
      { label: "Qualifications", value: "qual" },
      { label: "Elimination", value: "elim" },
      { label: "Finals", value: "final" },
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
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select placeholder='Match Level' options={rounds} className="input"/>
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber controls placeholder='Match #' min={1} className="input"/>
        </Form.Item>
        <h2>Robot Position</h2>
        <Form.Item<FieldType> name="robotpos" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select placeholder='Robot Position' options={robotpos} className="input"/>
        </Form.Item>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select placeholder='Starting Location' options={startingloc} className="input"/>
        </Form.Item>
        <h2>Preloaded</h2>
        <Form.Item<FieldType> name="preloaded">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>
    );
  }
  function Team1() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      auton_speakerscored?: number;
      auton_ampscored?: number;
      auton_missedpiecesamp?: number;
      auton_missedpiecesspeaker?: number;
      leavespawn?: boolean;
      auton_scoringloc?: string; 
      preloadscored?: boolean;
      piecespicked?: string;
      auton_comments?: string;
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
        <Form.Item<FieldType> name="auton_speakerscored" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="auton_ampscored" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesamp" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesspeaker" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
        <h2>Leave Spawn</h2>
        <Form.Item<FieldType> name="leavespawn">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true }]}>
          <Select placeholder='Starting Location' options={scoringloc} className='input'/>
        </Form.Item>
        <h2>Preload Scored</h2>
        <Form.Item<FieldType> name="preloadscored">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="piecespicked" rules={[{ required: true }]}>
          <Select placeholder='Pieces Picked' mode='multiple' options={piecespicked} className='input'/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="auton_comments" rules={[{ required: true }]}>
          <TextArea placeholder='Comments' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={canvasRef}
            width='50rem'
            height='50rem'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={color ? field_blue : field_red}
            preserveBackgroundImageAspectRatio='xMidyMid meet'
            exportWithBackgroundImage={true}
            style={{paddingBottom: '5%'}}
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
  function team2() {
    type FieldType = {
      tele_speakerscored?: number,
      tele_ampscored?: number,
      timesamplified?: number,
      groundintake?: boolean,
      sourceintake?: boolean,
      tele_scoringloc?: string,
      amplifyscored?: boolean,
      cooppressed?: boolean,
      cooppressed1st?: boolean,
      traversedstage?: boolean,
      tele_piecespicked?: string,
      tele_missedpiecesamp?: number,
      tele_missedpiecesspeaker?: number,
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
        <Form.Item<FieldType> name="tele_speakerscored" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="tele_ampscored" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Ground Intake</h2>
        <Form.Item<FieldType> name="groundintake">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Source Intake</h2>
        <Form.Item<FieldType> name="sourceintake">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="tele_scoringloc" rules={[{ required: true }]}>
          <Select placeholder='Scoring Location' options={scoringloc} className="input"/>
        </Form.Item>
        <h2>Amplified Score</h2>
        <Form.Item<FieldType> name="amplifyscored" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Coopertition Pressed</h2>
        <Form.Item<FieldType> name="cooppressed">
          <Checkbox className='input_checkbox'/> 
        </Form.Item>
        <h2>Cooperated First</h2>
        <Form.Item<FieldType> name="cooppressed1st">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Traversed Stage</h2>
        <Form.Item<FieldType> name="traversedstage">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="tele_piecespicked" rules={[{ required: true }]}>
          <Select placeholder='Pieces Picked' mode='multiple' options={piecespicked} className="input"/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesamp" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesspeaker" rules={[{ required: true }]}>
          <InputNumber controls placeholder='0' min={0} className="input"/>
        </Form.Item>
      </div>
    );
  }
  function team3() {
    type FieldType = {
      climbed?: boolean;
      timeleft?: number;
      harmony?: boolean;
      spotlit?: boolean;
      climbingaffected?: boolean;
      parked?: boolean;
      trapscored?: boolean;
    };
    return (
      <div className='matchbody'>
        <h2>Climbed</h2>
        <Form.Item<FieldType> name="climbed">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Time Left</h2>
        <Form.Item<FieldType> name="timeleft" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Harmony</h2>
        <Form.Item<FieldType> name="harmony">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Spotlit</h2>
        <Form.Item<FieldType> name="spotlit">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Climbing Affected</h2>
        <Form.Item<FieldType> name="climbingaffected">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Parked</h2>
        <Form.Item<FieldType> name="parked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Trap Scored</h2>
        <Form.Item<FieldType> name="trapscored">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>
    );
  }
  function overall() {
    type FieldType = {
      robotdied?: boolean;
      pushing?: number;
      defended?: boolean;
      hoarded?: boolean;
      wasdefended?: boolean;
      numpenalties?: number;
      penaltiesincurred?: string;
      comments?: string;
      driverskill?: number,
      counterdefense?: number,
    };
    return (
      <div className='matchbody'>
        <h2>Robot Died</h2>
        <Form.Item<FieldType> name="robotdied">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pushing</h2>
        <Form.Item<FieldType> name="pushing" rules={[{ required: true }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Counterdefense</h2>
        <Form.Item<FieldType> name="counterdefense" rules={[{ required: true }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Driver Skill</h2>
        <Form.Item<FieldType> name="driverskill" rules={[{ required: true }]}>
          <InputNumber controls min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Defended</h2>
        <Form.Item<FieldType> name="defended">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Hoarded</h2>
        <Form.Item<FieldType> name="hoarded">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Was Defended</h2>
        <Form.Item<FieldType> name="wasdefended">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Num Penalties</h2>
        <Form.Item<FieldType> name="numpenalties" rules={[{ required: true }]}>
          <InputNumber controls min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Penalties Incurred</h2>
        <Form.Item<FieldType> name="penaltiesincurred" rules={[{ required: true }]}>
          <TextArea placeholder='Penalties Incurred' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments" rules={[{ required: true }]}>
          <TextArea placeholder='Comments' style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <Input type="submit" value="Submit" className='input'/>
      </div>
    )
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Summary',
      children: summary(),
    },
    {
      key: '2',
      label: 'Team 1',
      children: Team1(),
    },
    {
      key: '3',
      label: 'Team 2',
      children: team2(),
    },
    {
      key: '4',
      label: 'Team 3',
      children: team3(),
    },
  ];
  return (
    <body>
      <div className='banner'>
        <header>
        <img src={no_image} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''></img>
          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Drive Team Feeder</h1>
            </td>
          </table>
        </header>
      </div>
      <Form
        form={form}
        onFinish={async event => {
          let imageURI = "";
          canvasRef.current?.exportImage('png').then(data => imageURI = data);
          console.log(imageURI);
          await setNewMatchScout(event, imageURI);
          window.location.reload();
        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form>
    </body>
  );
}

export default DTF;