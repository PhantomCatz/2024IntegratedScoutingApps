import '../public/stylesheets/style.css';
import '../public/stylesheets/match.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
// import full_field from '../public/images/full_field.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false); //red if true blue if false
  const [roundIsVisible, setRoundIsVisible] = useState(false);
  const [coopPressed, setCoopPressed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tabNum, setTabNum] = useState("1");
  const [teamNum, setTeamNum] = useState(0);
  const [defendedIsVisible, setDefendedIsVisible] = useState(false);
  const [wasDefendedIsVisible, setWasDefendedIsVisible] = useState(false);
  const [opposingTeamNum, setOpposingTeamNum] = useState([""]);
  const [formValue, setFormValue] = useState({
    autonSpeakerScored: 0,
    autonAmpScored: 0,
    autonMissedAmpPieces: 0,
    autonMissedSpeakerPieces: 0,
    teleopSpeakerScored: 0,
    teleopAmpScored: 0,
    teleopMissedAmpPieces: 0,
    teleopMissedSpeakerPieces: 0,
  });

  const [penaltyNum, setPenaltyNum] = useState(0);
  const autonImageURI = useRef<string>();
  //const teleopImageURI = useRef<string>();
  const autonCanvasRef = useRef<ReactSketchCanvasRef>(null);
  //const teleopCanvasRef = useRef<ReactSketchCanvasRef>(null);
  const eventname = process.env.REACT_APP_EVENTNAME;
  useEffect(() => { document.title = props.title; return () => { }; }, [props.title]);
  const [cookies] = useCookies(['login']);
  useEffect(() => { VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  useEffect(() => { if ((document.getElementById("auton_speakerscored") as HTMLInputElement) !== null) {
    (document.getElementById("auton_speakerscored") as HTMLInputElement).value = formValue.autonSpeakerScored.toString();
    form.setFieldValue('auton_speakerscored', formValue.autonSpeakerScored);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("auton_ampscored") as HTMLInputElement) !== null) {
    (document.getElementById("auton_ampscored") as HTMLInputElement).value = formValue.autonAmpScored.toString();
    form.setFieldValue('auton_ampscored', formValue.autonAmpScored);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("auton_missedpiecesamp") as HTMLInputElement) !== null) {
    (document.getElementById("auton_missedpiecesamp") as HTMLInputElement).value = formValue.autonMissedAmpPieces.toString();
    form.setFieldValue('auton_missedpiecesamp', formValue.autonMissedAmpPieces);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("auton_missedpiecesspeaker") as HTMLInputElement) !== null) {
    (document.getElementById("auton_missedpiecesspeaker") as HTMLInputElement).value = formValue.autonMissedSpeakerPieces.toString();
    form.setFieldValue('auton_missedpiecesspeaker', formValue.autonMissedSpeakerPieces);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("tele_speakerscored") as HTMLInputElement) !== null) {
    (document.getElementById("tele_speakerscored") as HTMLInputElement).value = formValue.teleopSpeakerScored.toString();
    form.setFieldValue('tele_speakerscored', formValue.teleopSpeakerScored);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("tele_ampscored") as HTMLInputElement) !== null) {
    (document.getElementById("tele_ampscored") as HTMLInputElement).value = formValue.teleopAmpScored.toString();
    form.setFieldValue('tele_ampscored', formValue.teleopAmpScored);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("tele_missedpiecesamp") as HTMLInputElement) !== null) {
    (document.getElementById("tele_missedpiecesamp") as HTMLInputElement).value = formValue.teleopMissedAmpPieces.toString();
    form.setFieldValue('tele_missedpiecesamp', formValue.teleopMissedAmpPieces);
    return () => {};
  }}, [formValue]);
  useEffect(() => { if ((document.getElementById("tele_missedpiecesspeaker") as HTMLInputElement) !== null) {
    (document.getElementById("tele_missedpiecesspeaker") as HTMLInputElement).value = formValue.teleopMissedSpeakerPieces.toString();
    form.setFieldValue('tele_missedpiecesspeaker', formValue.teleopMissedSpeakerPieces);
    return () => {};
  }}, [formValue]);

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
        "auto_preload_scored": event.preloadscored,
        "auto_leave": event.leavespawn,
        "auto_amps_scored": event.auton_ampscored,
        "auto_speaker_scored": formValue.autonSpeakerScored,
        "auto_scoring_location": event.auton_scoringloc,
        "auto_pieces_picked": event.piecespicked,
        "auto_missed_pieces_amp": event.auton_missedpiecesamp,
        "auto_missed_pieces_speaker": event.autonmissedpiecesspeaker,
        "auto_path": autonImageURI.current,
        "auto_total_points": 0,
        "auto_comments": event.auton_comments,
      },
      "teleop": {
        "teleop_coop_pressed": event.cooppressed,
        "teleop_coop_first": event.cooppressed1st,
        "teleop_amps_scored": event.tele_ampscored,
        "teleop_speaker_scored": event.tele_speakerscored,
        "intake": event.intake,
        // "teleop_traverse_stage": event.traversedstage,
        "teleop_traverse_stage": false,
        "teleop_missed_pieces_amp": event.tele_missedpiecesamp,
        "teleop_missed_pieces_speaker": event.tele_missedpiecesspeaker,
        "teleop_scoring_location": event.tele_scoringloc,
        "teleop_total_points": 0,
        // "teleop_path": teleopImageURI.current,
        "teleop_path": "",
        "teleop_shooting_location": event.shootingloc,
        // "teleop_times_amplify": event.timesamplified,
        "teleop_times_amplify": 0,
        "teleop_pieces_note_amplifying_scored": event.speakerscored_amplified,
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
        "OA_numbers_penalties": penaltyNum,
        "OA_penalties_comments": event.penaltiesincurred,
        "OA_comments": event.comments,
        "OA_driver_skill": event.driverskill,
        "OA_was_defend_team": event.wasdefendedteam,
        "OA_defend_team": event.defendedteam,
      }
    };
    const TESTDONOTREMOVE = {
      "matchIdentifier": {
        "Initials": "Loren Liu",
        "match_event": "2024CALA",
        "match_level": "Practice",
        "match_number": 8,
        "team_number": 254,
        "robot_position": "R1",
        "starting_position": "middle"
      },
      "auto": {
        "auto_preLoad": false,
        "auto_preload_scored": true,
        "auto_leave": true,
        "auto_amps_scored": 6,
        "auto_speaker_scored": 2,
        "auto_scoring_location": "strategy list",
        "auto_pieces_picked": [0, 0, 0, 0, 0, 0, 0, 0],
        "auto_missed_pieces_amp": 0,
        "auto_missed_pieces_speaker": 0,
        "auto_path": "pic askdfghkjaegflaier",
        "auto_total_points": 0,
        "auto_comments": "comments"
      },
      "teleop": {
        "teleop_coop_pressed": true,
        "teleop_coop_first": false,
        "teleop_amps_scored": 1,
        "teleop_speaker_scored": 5,
        "teleop_times_amplify": 5,
        "teleop_pieces_note_amplifying_scored": 7,
        "intake": "string",
        "teleop_traverse_stage": true,
        "teleop_missed_pieces_amp": 2,
        "teleop_missed_pieces_speaker": 3,
        "teleop_scoring_location": "strategyyyy",
        "teleop_total_points": 0,
        "teleop_shooting_location": "i hate ethan",
        "teleop_path": "dfkahjsljkhfglwqekjh"
      },
      "engGame": {
        "EG_climbed": true,
        "EG_timeLeft_when_climb": 12,
        "EG_parked": false,
        "EG_climbing_time": 11,
        "EG_trapScored": true,
        "EG_harmony": true,
        "EG_mic_score": true,
        "EG_climbing_affect": false
      },
      "overAll": {
        "OA_hoarded": true,
        "OA_robot_died": false,
        "OA_was_defend": true,
        "OA_was_defend_team": "2637",
        "OA_defend": false,
        "OA_defend_team": "2637",
        "OA_pushing_rating": 3,
        "OA_counter_defense": 3,
        "OA_numbers_penalties": 1,
        "OA_penalties_comments": "attacking others?",
        "OA_driver_skill": 3,
        "OA_comments": "comments"
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
      if (roundIsVisible) {
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
        setTeamNum(Number(fullTeam.substring(3)));
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
        setTeamNum(Number(fullTeam.substring(3)));
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  async function calculateMatchLevel() {
    const matchlevel = form.getFieldValue('matchlevel');
    if (matchlevel !== "qm") {
      setRoundIsVisible(true);
    }
    else {
      setRoundIsVisible(false);
    }
  }
  async function updateDefendedList() {
    const matchID = eventname + "_" + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum');
    const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + matchID,
      {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
        }
      });
    const data = await response.json();
    let result: any[] = [];
    for (const team in data.alliances[color ? 'red' : 'blue'].team_keys) {
      result.push(data.alliances[color ? 'red' : 'blue'].team_keys[team].substring(3));
    }
    setOpposingTeamNum(result);
    console.log(opposingTeamNum);
  }
  function preMatch() { //final do not change
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
      { label: "Semifinals", value: "sf" },
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
        <h2 style={{ color: 'white', paddingBottom: '35px' }}>Team: {teamNum}</h2>
        <h2>Scouter Initials</h2>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input maxLength={2} className="input" />
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber min={1} onChange={updateTeamNumber} className="input" type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} />
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select options={rounds} onChange={() => { calculateMatchLevel(); updateTeamNumber(); }} className="input" />
        </Form.Item>
        <h2 style={{ display: roundIsVisible ? 'inherit' : 'none' }}>Round #</h2>
        <Form.Item<FieldType> name="roundnum" rules={[{ required: roundIsVisible ? true : false, message: 'Please input the round number!' }]} style={{ display: roundIsVisible ? 'inherit' : 'none' }}>
          <InputNumber min={1} onChange={updateTeamNumber} style={{ display: roundIsVisible ? 'inherit' : 'none' }} className="input" type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} />
        </Form.Item>
        <h2>Robot Position</h2>
        <Form.Item<FieldType> name="robotpos" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select options={robotpos} onChange={updateTeamNumber} className="input" />
        </Form.Item>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select options={startingloc} className="input" />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Next</Button>
        </Flex>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work (2024-03-06) DONE YAY
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
      { label: "W1", value: "w1" },
      { label: "W2", value: "w2" },
      { label: "W3", value: 'w3' },
      { label: "C1", value: "c1" },
      { label: "C2", value: "c2" },
      { label: "C3", value: 'c3' },
      { label: "C4", value: 'c4' },
      { label: "C5", value: 'c5' },
    ];
    return (
      <div>
        <h2>Leave</h2>
        <Form.Item<FieldType> name="leavespawn" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Preload Scored</h2>
        <Form.Item<FieldType> name="preloadscored" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="auton_speakerscored" rules={[{ required: true, message: 'Please input the number of speaker notes scored!' }]}>
          <InputNumber
            id="auton_speakerscored"
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLInputElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, autonSpeakerScored: formValue.autonSpeakerScored + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.autonSpeakerScored) > 0) {
                setFormValue({...formValue, autonSpeakerScored: formValue.autonSpeakerScored - 1});
              }
            }} className='decrementbutton'>-</Button>}
            value={formValue.autonSpeakerScored}
          />
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="auton_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, autonAmpScored: formValue.autonAmpScored + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.autonSpeakerScored) > 0) {
                setFormValue({...formValue, autonAmpScored: formValue.autonAmpScored - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, autonMissedAmpPieces: formValue.autonMissedAmpPieces + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.autonMissedAmpPieces) > 0) {
                setFormValue({...formValue, autonMissedAmpPieces: formValue.autonMissedAmpPieces - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="auton_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of misssed speaker pieces!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, autonMissedSpeakerPieces: formValue.autonMissedSpeakerPieces + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.autonMissedSpeakerPieces) > 0) {
                setFormValue({...formValue, autonMissedSpeakerPieces: formValue.autonMissedSpeakerPieces - 1});
                (document.getElementById("auton_ampscored") as HTMLInputElement).value = formValue.autonAmpScored.toString();
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select options={scoringloc} className='input' />
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="piecespicked">
          <Select mode='multiple' options={piecespicked} className='input' showSearch={false} />
        </Form.Item>
        {/* <h2>Comments</h2>
        <Form.Item<FieldType> name="auton_comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea style={{verticalAlign: 'center'}} className='input'/>
        </Form.Item> */}
        <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={autonCanvasRef}
            id="teleop"
            width='882px'
            height='882px'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={color ? field_red : field_blue}
            exportWithBackgroundImage={true}
            style={{ paddingBottom: '5%' }}
            onChange={async () => await autonCanvasRef.current?.exportImage('png').then(data => autonImageURI.current = data)}
          />
          <Flex justify='in-between'>
            <Button onClick={() => autonCanvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => autonCanvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => autonCanvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
          <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
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
      intake: string,
      tele_scoringloc: string,
      shootingloc: string,
      cooppressed: boolean,
      cooppressed1st: boolean,
      traversedstage: boolean,
      tele_missedpiecesamp: number,
      tele_missedpiecesspeaker: number,
      timesamplified: number,
      speakerscored_amplified: number,
    };
    const scoringloc = [
      { label: "Amp", value: "amp" },
      { label: "Speaker", value: "speaker" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const shootingloc = [
      { label: "US", value: "us" },
      { label: "CS", value: "cs" },
      { label: "LS", value: 'ls' },
      { label: "A", value: 'amp' },
      { label: "AW", value: 'aw' },
      { label: "UT", value: 'ut' },
      { label: "CT", value: 'ct' },
      { label: "LT", value: 'lt' },
      // { label: "LOT", value: 'lot' },
      // { label: "P", value: 'pod'},
    ];
    const intake = [
      { label: "Ground", value: "us" },
      { label: "Source", value: "cs" },
      { label: "Both", value: 'ls' },
      { label: "None", value: 'amp' },
    ];
    return (
      <div>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="tele_speakerscored" rules={[{ required: true, message: 'Please input the number of speaker notes scored!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, teleopSpeakerScored: formValue.teleopSpeakerScored + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.teleopSpeakerScored) > 0) {
                setFormValue({...formValue, teleopSpeakerScored: formValue.teleopSpeakerScored - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="tele_ampscored" rules={[{ required: true, message: 'Please input the number of amp notes scored!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, teleopAmpScored: formValue.teleopAmpScored + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.teleopAmpScored) > 0) {
                setFormValue({...formValue, teleopAmpScored: formValue.teleopAmpScored - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        {/* <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true, message: 'Please input the times the speaker was amplified!' }]}>
          <InputNumber 
          type='number'
          pattern="\d*"
            disabled
          onWheel={(event) => (event.target as HTMLElement).blur()} 
          min={0}
          className="input"/>
        </Form.Item> */}
        {/* <h2>Speaker Scored during Amp</h2>
        <Form.Item<FieldType> name="speakerscored_amplified" rules={[{ required: true, message: 'Please input the number of notes scored during the amplification period!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"/>
        </Form.Item> */}
        <h2>Missed Amp Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesamp" rules={[{ required: true, message: 'Please input the number of missed amp pieces!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, teleopMissedAmpPieces: formValue.teleopMissedAmpPieces + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.teleopMissedAmpPieces) > 0) {
                setFormValue({...formValue, teleopMissedAmpPieces: formValue.teleopMissedAmpPieces - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Missed Speaker Pieces</h2>
        <Form.Item<FieldType> name="tele_missedpiecesspeaker" rules={[{ required: true, message: 'Please input the number of missed speaker pieces!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, teleopMissedSpeakerPieces: formValue.teleopMissedSpeakerPieces + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.teleopMissedSpeakerPieces) > 0) {
                setFormValue({...formValue, teleopMissedSpeakerPieces: formValue.teleopMissedSpeakerPieces - 1});
              }
            }} className='decrementbutton'>-</Button>}
            />
        </Form.Item>
        <h2>Ground/Source Intake</h2>
        <Form.Item<FieldType> name="intake" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select options={intake} className="input" />
        </Form.Item>
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="tele_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select options={scoringloc} className="input" />
        </Form.Item>
        <h2>Shooting Location</h2>
        <Form.Item<FieldType> name="shootingloc">
          <Select mode='multiple' options={shootingloc} className='input' showSearch={false} />
        </Form.Item>
        <h2>Coopertition Pressed</h2>
        <Form.Item<FieldType> name="cooppressed" valuePropName="checked">
          <Checkbox className='input_checkbox' onClick={() => setCoopPressed(!coopPressed)} />
        </Form.Item>
        <h2 style={{ display: coopPressed ? 'inherit' : 'none' }}>Cooperated First</h2>
        <Form.Item<FieldType> name="cooppressed1st" valuePropName="checked" style={{ display: coopPressed ? 'inherit' : 'none' }}>
          <Checkbox className='input_checkbox' style={{ display: coopPressed ? 'inherit' : 'none' }} />
        </Form.Item>
        {/* <h2>Traversed Stage</h2>
        <Form.Item<FieldType> name="traversedstage" valuePropName="checked">
          <Checkbox className='input_checkbox'/>
        </Form.Item> */}
        {/* <div style={{ alignContent: 'center' }}>
          <ReactSketchCanvas
            ref={teleopCanvasRef}
            width='882px'
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
         </Flex> */}
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Next</Button>
        </Flex>
      </div>
      //</div>
    );
  }
  function endMatch() { //final do not touch
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
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Time Left</h2>
        <Form.Item<FieldType> name="timeleft" rules={[{ required: true, message: 'Please input the time left!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input" />
        </Form.Item>
        <h2>Harmony</h2>
        <Form.Item<FieldType> name="harmony" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Spotlit</h2>
        <Form.Item<FieldType> name="spotlit" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Climbing Affected</h2>
        <Form.Item<FieldType> name="climbingaffected" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Parked</h2>
        <Form.Item<FieldType> name="parked" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Trap Scored</h2>
        <Form.Item<FieldType> name="trapscored" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
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
      defendedteam: string;
      hoarded: boolean;
      wasdefended: boolean;
      wasdefendedteam: string;
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
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Pushing (0-4)</h2>
        <Form.Item<FieldType> name="pushing" rules={[{ required: true, message: 'Please input the pushing rating!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} className="input" />
        </Form.Item>
        <h2>Counterdefense (0-4)</h2>
        <Form.Item<FieldType> name="counterdefense" rules={[{ required: true, message: 'Please input the counterdefense rating!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} className="input" />
        </Form.Item>
        <h2>Driver Skill (0-4)</h2>
        <Form.Item<FieldType> name="driverskill" rules={[{ required: true, message: 'Please input the driver skill rating!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} max={4} className="input" />
        </Form.Item>
        <h2>Defended</h2>
        <Form.Item<FieldType> name="defended" valuePropName="checked">
          <Checkbox className='input_checkbox' onChange={() => { updateDefendedList(); setDefendedIsVisible(!defendedIsVisible); }} />
        </Form.Item>
        <h2 style={{ display: defendedIsVisible ? 'inherit' : 'none' }}>Defended whom?</h2>
        <Form.Item<FieldType> name="defendedteam" valuePropName="checked" style={{ display: defendedIsVisible ? 'inherit' : 'none' }}>
          <Select mode='multiple' options={opposingTeamNum.map((team) => ({ label: team, value: team }))} className="input" showSearch={false} style={{ display: defendedIsVisible ? 'inherit' : 'none' }} />
        </Form.Item>
        <h2>Hoarded</h2>
        <Form.Item<FieldType> name="hoarded" valuePropName="checked">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Was Defended</h2>
        <Form.Item<FieldType> name="wasdefended" valuePropName="checked">
          <Checkbox className='input_checkbox' onChange={() => { updateDefendedList(); setWasDefendedIsVisible(!wasDefendedIsVisible); }} />
        </Form.Item>
        <h2 style={{ display: wasDefendedIsVisible ? 'inherit' : 'none' }}>Was defended by whom?</h2>
        <Form.Item<FieldType> name="wasdefendedteam" valuePropName="checked" style={{ display: wasDefendedIsVisible ? 'inherit' : 'none' }}>
          <Select mode='multiple' options={opposingTeamNum.map((team) => ({ label: team, value: team }))} className="input" showSearch={false} style={{ display: wasDefendedIsVisible ? 'inherit' : 'none' }} />
        </Form.Item>
        <h2>Number of Penalties</h2>
        <Form.Item<FieldType> name="numpenalties" rules={[{ required: true, message: 'Please input the number of penalties incurred!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input" />
        </Form.Item>
        <h2>Penalties Incurred</h2>
        <Form.Item<FieldType> name="penaltiesincurred" rules={[{ required: true, message: 'Please describe the penalties incurred!' }]}>
          <TextArea style={{ verticalAlign: 'center' }} className='input' />
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments" rules={[{ required: true, message: 'Please input the comments!' }]}>
          <TextArea style={{ verticalAlign: 'center' }} className='input' />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Back</Button>
          <Input type="submit" value="Submit" className='submitbutton' />
        </Flex>
        <h2 style={{ display: isLoading ? 'inherit' : 'none' }}>Submitting data...</h2>
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
    <div>
      <meta name="viewport" content="maximum-scale=1.0" />
      <div className='banner'>
        <header>
          <a href='/scoutingapp'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Match Scout</h1>
                </td>
              </tr>
            </tbody>

          </table>
        </header>
      </div>
      <Form
        form={form}
        initialValues={{
          leavespawn: false,
          preloadscored: false,

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
          wasdefendedteam: [],
          defendedteam: [],
        }}
        onFinish={async event => {
          try {
            setLoading(true);
            console.log(event);
            saveAs(new Blob([JSON.stringify(event)], { type: "text/json" }), event.initials + event.matchnum + ".json");
            await setNewMatchScout(event);
            const initials = form.getFieldValue('initials');
            const matchnum = form.getFieldValue('matchnum');
            form.resetFields();
            form.setFieldValue('initials', initials);
            form.setFieldValue('matchnum', matchnum + 1);
            setTeamNum(0);
            //autonCanvasRef.current?.clearCanvas();
            // teleopCanvasRef.current?.clearCanvas()
            setLoading(false);
          }
          catch (err) {
            console.log(err);
          }
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => { setTabNum(key) }} />
      </Form>
    </div>
  );
}

export default MatchScout;