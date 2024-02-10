import '../public/stylesheets/style.css';
import '../public/stylesheets/match.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import full_field from '../public/images/full_field.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tabNum, setTabNum] = useState("1");
  const autonImageURI = useRef<string>();
  const teleopImageURI = useRef<string>();
  const autonCanvasRef = useRef<ReactSketchCanvasRef>(null);
  const teleopCanvasRef = useRef<ReactSketchCanvasRef>(null);
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
        "auto_path": autonImageURI.current,
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
        "teleop_path": teleopImageURI.current,
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
      await fetch(process.env.REACT_APP_MATCH_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(response => response.json()).then(data => console.log(data));
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
      { label: "Upper Speaker", value: "upper_s" },
      { label: "Middle Speaker", value: "midde_s" },
      { label: "Lower Speaker", value: 'lower_s' },
    ];
    return (
      <div>
        <h2>Scouter Initials</h2>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input maxLength={2} className="input"/>
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber min={1} onChange={updateTeamNumber} className="input" type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} />
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select options={rounds} onChange={()=> {calculateMatchLevel(); updateTeamNumber();}} className="input"/>
        </Form.Item>
        <h2 style={{ display: isVisible ? 'inherit' : 'none' }}>Round #</h2>
        <Form.Item<FieldType> name="roundnum" rules={[{ required: isVisible ? true : false, message: 'Please input the round number!' }]}>
            <InputNumber min={1} onChange={updateTeamNumber} style={{ display: isVisible ? 'inherit' : 'none' }} className="input" type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()}/>
        </Form.Item>
        <h2>Robot Position</h2>
        <Form.Item<FieldType> name="robotpos" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select options={robotpos} onChange={updateTeamNumber} className="input"/>
        </Form.Item>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select options={startingloc} className="input"/>
        </Form.Item>
        <h2>Preloaded</h2>
        <Form.Item<FieldType> name="preloaded" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <Flex justify='in-between' style={{paddingBottom: '10%'}}>
          <Button onClick={() => setTabNum("1")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Next</Button>
        </Flex>
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
        <h2>Leave</h2>
        <Form.Item<FieldType> name="leavespawn" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="auton_speakerscored" rules={[{ required: true, message: 'Please input the number of speaker notes scored!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="auton_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of misssed speaker pieces!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select options={scoringloc} className='input'/>
        </Form.Item>
        <h2>Preload Scored</h2>
        <Form.Item<FieldType> name="preloadscored" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="piecespicked" rules={[{ required: true, message: 'Please input the pieces picked!' }]}>
          <Select mode='multiple' options={piecespicked} className='input' showSearch={false}/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="auton_comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={autonCanvasRef}
            id="teleop"
            width='800px'
            height='800px'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={color ? field_red : field_blue}
            exportWithBackgroundImage={true}
            style={{paddingBottom: '5%'}}
            onChange={async () => await autonCanvasRef.current?.exportImage('png').then(data => autonImageURI.current = data)}
          />
          <Flex justify='in-between'>
            <Button onClick={() => autonCanvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => autonCanvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => autonCanvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
          <Flex justify='in-between' style={{paddingBottom: '10%'}}>
            <Button onClick={() => setTabNum("1")} className='tabbutton'>Back</Button>
            <Button onClick={() => setTabNum("3")} className='tabbutton'>Next</Button>
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
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="tele_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of missed speaker pieces!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} className="input"/>
        </Form.Item>
        <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true, message: 'Please input the number of times the speaker was amplified!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Amplified Score</h2>
        <Form.Item<FieldType> name="amplifyscored" rules={[{ required: true, message: 'Please input the number of notes scored during the amplifier period!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
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
          <Select options={scoringloc} className="input"/>
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
        <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={teleopCanvasRef}
            width='800px'
            height='400px'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={full_field}
            exportWithBackgroundImage={true}
            style={{paddingBottom: '5%'}}
            onChange={async () => await teleopCanvasRef.current?.exportImage('png').then(data => teleopImageURI.current = data)}
          />
          <Flex justify='in-between'>
            <Button onClick={() => teleopCanvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => teleopCanvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => teleopCanvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
          <Flex justify='in-between' style={{paddingBottom: '10%'}}>
            <Button onClick={() => setTabNum("2")} className='tabbutton'>Back</Button>
            <Button onClick={() => setTabNum("4")} className='tabbutton'>Next</Button>
          </Flex>
        </div>
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
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
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
        <Flex justify='in-between' style={{paddingBottom: '10%'}}>
          <Button onClick={() => setTabNum("3")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("5")} className='tabbutton'>Next</Button>
        </Flex>
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
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Counterdefense (0-4)</h2>
        <Form.Item<FieldType> name="counterdefense" rules={[{ required: true, message: 'Please input the counterdefense rating!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} value={0} className="input"/>
        </Form.Item>
        <h2>Driver Skill (0-4)</h2>
        <Form.Item<FieldType> name="driverskill" rules={[{ required: true, message: 'Please input the driver skill rating!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} value={0} className="input"/>
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
        <h2>Number of Penalties</h2>
        <Form.Item<FieldType> name="numpenalties" rules={[{ required: true, message: 'Please input the number of penalties incurred!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
        </Form.Item>
        <h2>Penalties Incurred</h2>
        <Form.Item<FieldType> name="penaltiesincurred" rules={[{ required: true, message: 'Please describe the penalties incurred!' }]}>
          <TextArea style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item>
        <Flex justify='in-between' style={{paddingBottom: '10%'}}>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Back</Button>
          <Input type="submit" value="Submit" className='tabbutton'/>
        </Flex>
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
        <meta name="viewport" content="user-scalable=no" />
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
            const initials = form.getFieldValue('initials');
            const matchnum = form.getFieldValue('matchnum');
            form.resetFields();
            form.setFieldValue('initials', initials);
            form.setFieldValue('matchnum', matchnum + 1);
          }
          catch (err) {
            console.log(err);
          }
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => {
          setTabNum(key);
          await autonCanvasRef.current?.exportImage('png').then(data => autonImageURI.current = data);
        }}/>
      </Form>
    </body>
  );
}

export default MatchScout;