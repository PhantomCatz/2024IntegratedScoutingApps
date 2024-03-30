import '../public/stylesheets/style.css';
import '../public/stylesheets/match.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';

import { useEffect, useState, useRef } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(true);
  const [roundIsVisible, setRoundIsVisible] = useState(false);
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
    teleopHoardedPieces: 0,
    numPenalties: 0,
    pushingRating: 0, 
    counterDefenseRating: 0,
    driverSkillRating: 0,
    timeLeft: 0,
  });
  const eventname = process.env.REACT_APP_EVENTNAME;
  useEffect(() => { document.title = props.title; return () => {}; }, [props.title]);
  const [cookies] = useCookies(['login', 'theme']);
  const autonCanvasRef = useRef<ReactSketchCanvasRef>(null);
  const autonImageURI = useRef<string>();
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  useEffect(() => {
    if ((document.getElementById("auton_speakerscored") as HTMLInputElement) !== null) {
      (document.getElementById("auton_speakerscored") as HTMLInputElement).value = formValue.autonSpeakerScored.toString();
      form.setFieldValue('auton_speakerscored', formValue.autonSpeakerScored);
    }
    if ((document.getElementById("auton_ampscored") as HTMLInputElement) !== null) {
      (document.getElementById("auton_ampscored") as HTMLInputElement).value = formValue.autonAmpScored.toString();
      form.setFieldValue('auton_ampscored', formValue.autonAmpScored);
    }
    if ((document.getElementById("auton_missedpiecesamp") as HTMLInputElement) !== null) {
      (document.getElementById("auton_missedpiecesamp") as HTMLInputElement).value = formValue.autonMissedAmpPieces.toString();
      form.setFieldValue('auton_missedpiecesamp', formValue.autonMissedAmpPieces);
    }
    if ((document.getElementById("auton_missedpiecesspeaker") as HTMLInputElement) !== null) {
      (document.getElementById("auton_missedpiecesspeaker") as HTMLInputElement).value = formValue.autonMissedSpeakerPieces.toString();
      form.setFieldValue('auton_missedpiecesspeaker', formValue.autonMissedSpeakerPieces);
    }
    if ((document.getElementById("tele_speakerscored") as HTMLInputElement) !== null) {
      (document.getElementById("tele_speakerscored") as HTMLInputElement).value = formValue.teleopSpeakerScored.toString();
      form.setFieldValue('tele_speakerscored', formValue.teleopSpeakerScored);
    }
    if ((document.getElementById("tele_ampscored") as HTMLInputElement) !== null) {
      (document.getElementById("tele_ampscored") as HTMLInputElement).value = formValue.teleopAmpScored.toString();
      form.setFieldValue('tele_ampscored', formValue.teleopAmpScored);
    }
    if ((document.getElementById("tele_missedpiecesamp") as HTMLInputElement) !== null) {
      (document.getElementById("tele_missedpiecesamp") as HTMLInputElement).value = formValue.teleopMissedAmpPieces.toString();
      form.setFieldValue('tele_missedpiecesamp', formValue.teleopMissedAmpPieces);
    }
    if ((document.getElementById("tele_missedpiecesspeaker") as HTMLInputElement) !== null) {
      (document.getElementById("tele_missedpiecesspeaker") as HTMLInputElement).value = formValue.teleopMissedSpeakerPieces.toString();
      form.setFieldValue('tele_missedpiecesspeaker', formValue.teleopMissedSpeakerPieces);
    }
    if ((document.getElementById("tele_hoardedpieces") as HTMLElement) !== null) {
      (document.getElementById("tele_hoardedpieces") as HTMLInputElement).value = formValue.teleopHoardedPieces.toString();
      form.setFieldValue('tele_hoardedpieces', formValue.teleopHoardedPieces);
    }
    if ((document.getElementById("timeleft") as HTMLElement) !== null) {
      (document.getElementById("timeleft") as HTMLInputElement).value = formValue.timeLeft.toString();
      form.setFieldValue('timeleft', formValue.timeLeft);
    }
    if ((document.getElementById("numpenalties") as HTMLElement) !== null) {
      (document.getElementById("numpenalties") as HTMLInputElement).value = formValue.numPenalties.toString();
      form.setFieldValue('numpenalties', formValue.numPenalties);
    }
    if ((document.getElementById("pushing") as HTMLElement) !== null) {
      (document.getElementById("pushing") as HTMLInputElement).value = formValue.pushingRating.toString();
      form.setFieldValue('pushing', formValue.pushingRating);
    }
    if ((document.getElementById("counterdefense") as HTMLElement) !== null) {
      (document.getElementById("counterdefense") as HTMLInputElement).value = formValue.counterDefenseRating.toString();
      form.setFieldValue('counterdefense', formValue.counterDefenseRating);
    }
    if ((document.getElementById("driverskill") as HTMLElement) !== null) {
      (document.getElementById("driverskill") as HTMLInputElement).value = formValue.driverSkillRating.toString();
      form.setFieldValue('driverskill', formValue.driverSkillRating);
    }
    return () => {};
  }, [formValue, form]);
  async function setNewMatchScout(event: any) {
    if (teamNum === 0) {
      window.alert("Team number is 0, please check in Pre.");
    }
    else {
      const body = {
        "matchIdentifier": {
          "Initials": event.initials,
          "match_event": eventname,
          "match_level": event.matchlevel + (event.roundnum !== undefined ? event.roundnum : ""),
          "match_number": event.matchnum,
          "team_number": teamNum,
          "robot_position": event.robotpos,
          "starting_position": event.startingloc,
        },
        "auto": {
          "auto_preload_scored": false,
          "auto_leave": event.leavespawn,
          "auto_amps_scored": event.auton_ampscored,
          "auto_speaker_scored": formValue.autonSpeakerScored,
          "auto_scoring_location": event.auton_scoringloc,
          "auto_pieces_picked": event.piecespicked,
          "auto_missed_pieces_amp": event.auton_missedpiecesamp,
          "auto_missed_pieces_speaker": event.auton_missedpiecesspeaker,
          "auto_path": autonImageURI.current,
          "auto_total_points": 0,
        },
        "teleop": {
          "teleop_coop_pressed": false,
          "teleop_coop_first": false,
          "teleop_amps_scored": event.tele_ampscored,
          "teleop_speaker_scored": event.tele_speakerscored,
          "teleop_times_amplify": 0,
          "intake": event.intake,
          "teleop_traverse_stage": false,
          "teleop_missed_pieces_amp": event.tele_missedpiecesamp,
          "teleop_missed_pieces_speaker": event.tele_missedpiecesspeaker,
          "teleop_scoring_location": event.tele_scoringloc,
          "teleop_total_points": 0,
          "teleop_shooting_location": event.shootingloc,
          "teleop_hoarded_pieces": event.tele_hoardedpieces,
          "teleop_path": "removed lol",
        },
        "engGame": {
          "EG_climbed": event.climbed,
          "EG_timeLeft_when_climb": event.timeleft,
          "EG_parked": event.parked,
          "EG_trapScored": event.trapscored,
          "EG_harmony": event.harmony,
          "EG_mic_score": false,
          "EG_climbing_affect": false,
        },
        "overAll": {
          "OA_robot_died": event.robotdied,
          "OA_was_defend": event.wasdefended,
          "OA_was_defend_team": event.wasdefendedteam,
          "OA_defend": event.defended,
          "OA_defend_team": event.defendedteam,
          "OA_pushing_rating": event.pushing,
          "OA_counter_defense": event.counterdefense,
          "OA_numbers_penalties": event.numpenalties,
          "OA_penalties_comments": event.penaltiesincurred,
          "OA_driver_skill": event.driverskill,
          "OA_comments": event.comments,
        }
      };
      // eslint-disable-next-line
      const TESTDONOTREMOVE = {
        "matchIdentifier": {
          "Initials": "test",
          "match_event": "test",
          "match_level": "test",
          "match_number": -1,
          "team_number": -1,
          "robot_position": "test",
          "starting_position": "test"
        },
        "auto": {
          "auto_preload_scored": false,
          "auto_leave": false,
          "auto_amps_scored": -1,
          "auto_speaker_scored": -1,
          "auto_scoring_location": "test",
          "auto_pieces_picked": [],
          "auto_missed_pieces_amp": -1,
          "auto_missed_pieces_speaker": -1,
          "auto_path": "test",
          "auto_total_points": -1,
        },
        "teleop": {
          "teleop_coop_pressed": false,
          "teleop_coop_first": false,
          "teleop_amps_scored": -1,
          "teleop_speaker_scored": -1,
          "teleop_times_amplify": -1,
          "intake": "test",
          "teleop_traverse_stage": false,
          "teleop_missed_pieces_amp": -1,
          "teleop_missed_pieces_speaker": -1,
          "teleop_scoring_location": "test",
          "teleop_total_points": -1,
          "teleop_shooting_location": [],
          "teleop_hoarded_pieces": -1,
          "teleop_path": "test",
        },
        "engGame": {
          "EG_climbed": false,
          "EG_timeLeft_when_climb": -1,
          "EG_parked": false,
          "EG_trapScored": false,
          "EG_harmony": false,
          "EG_mic_score": false,
          "EG_climbing_affect": false,
        },
        "overAll": {
          "OA_hoarded": false,
          "OA_robot_died": false,
          "OA_was_defend": false,
          "OA_was_defend_team":[],
          "OA_defend": false,
          "OA_defend_team":[],
          "OA_pushing_rating": -1,
          "OA_counter_defense": -1,
          "OA_numbers_penalties": -1,
          "OA_penalties_comments": "test",
          "OA_driver_skill": -1,
          "OA_comments": "test",
        }
      }
      try {
        if (!window.navigator.onLine) {
          window.alert("Your device is offline; please download the following .json file and give it to a Webdev member.");
          saveAs(new Blob([JSON.stringify(body)], { type: "text/json" }), event.initials + event.matchnum + ".json");
        }
        else {
          await fetch(process.env.REACT_APP_MATCH_URL as string, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            }
          })
          .then(async (response) => await response.json()).then(async (data) => {
            window.alert(data.insertedId);
          });
        }
      }
      catch (err) {
        console.log(err);
        window.alert("Error occured, please do not do leave this message and notify a Webdev member!");
        window.alert(err);
      }
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
        const team_color = form.getFieldValue('robotpos').substring(0, form.getFieldValue('robotpos').indexOf('_'));
        setColor((team_color === "red" ? true : false));
        const team_num = form.getFieldValue('robotpos').substring(form.getFieldValue('robotpos').indexOf('_') + 1) - 1;
        const fullTeam = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
        setTeamNum(Number(fullTeam.substring(3)));
        updateDefendedList();
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
        const team_color = form.getFieldValue('robotpos').substring(0, form.getFieldValue('robotpos').indexOf('_'));
        setColor((team_color === "red" ? true : false));
        const team_num = form.getFieldValue('robotpos').substring(form.getFieldValue('robotpos').indexOf('_') + 1) - 1;
        const fullTeam = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
        setTeamNum(Number(fullTeam.substring(3)));
        updateDefendedList();
      }
    }
    catch (err) {
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
        let result: any[] = [];
        for (const team in data.alliances[color ? 'red' : 'blue'].team_keys) {
          result.push(data.alliances[color ? 'blue' : 'red'].team_keys[team].substring(3));
        }
        setOpposingTeamNum(result);
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
        let result: any[] = [];
        for (const team in data.alliances[color ? 'red' : 'blue'].team_keys) {
          result.push(data.alliances[color ? 'blue' : 'red'].team_keys[team].substring(3));
        }
        setOpposingTeamNum(result);
      }
    }
    catch (err) {
    }
  }
  function preMatch() {
    type FieldType = {
      initials: string,
      matchlevel: string,
      matchnum: number,
      robotpos: string,
      preloaded: boolean,
      roundnum: number,
    };
    const rounds = [
      { label: "Qualifications", value: "qm" },
      { label: "Semi-Finals", value: "sf" },
      { label: "Finals", value: "f" },
    ];
    const robotpos = [
      { label: "R1", value: "red_1" },
      { label: "R2", value: "red_2" },
      { label: "R3", value: 'red_3' },
      { label: "B1", value: "blue_1" },
      { label: "B2", value: "blue_2" },
      { label: "B3", value: 'blue_3' },
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
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Next</Button>
        </Flex>
      </div>
    );
  }
  function AutonMatch() {
    type FieldType = {
      auton_speakerscored: number,
      auton_ampscored: number,
      auton_missedpiecesamp: number,
      auton_missedpiecesspeaker: number,
      leavespawn: boolean,
      auton_scoringloc: string,
      preloadscored: boolean,
      piecespicked?: string,
      auton_comments: string,
      imagepath: string,
      startingloc: string,
    };
    const scoringloc = [
      { label: "Amp", value: "Amp" },
      { label: "Speaker", value: "Speaker" },
      { label: "Both", value: 'Both' },
      { label: "None", value: 'None' },
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
    const startingloc = [
      { label: "Upper Speaker", value: "Upper Speaker" },
      { label: "Middle Speaker", value: "Middle Speaker" },
      { label: "Lower Speaker", value: 'Lower Speaker' },
      { label: "Lower", value: 'Lower' },
    ];
    return (
      <div>
        <div style={{ alignContent: 'center' }}>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select options={startingloc} className="input" />
        </Form.Item>
        <ReactSketchCanvas
          ref={autonCanvasRef}
          strokeWidth={8}
          height='882px'
          strokeColor='#32a7dc'
          backgroundImage={color ? field_red : field_blue}
          exportWithBackgroundImage
          svgStyle={{width: '882px', height: '882px'}}
          style={{ marginBottom: '5%' }}
        />
        <Flex justify='in-between'>
          <Button onClick={() => autonCanvasRef.current?.undo()} className='pathbutton'>Undo</Button>
          <Button onClick={() => autonCanvasRef.current?.redo()} className='pathbutton'>Redo</Button>
          <Button onClick={() => autonCanvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
        </Flex>
        <h2>Leave</h2>
        <Form.Item<FieldType> name="leavespawn" valuePropName="checked">
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
              if (Number(formValue.autonAmpScored) > 0) {
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
        <h2>Scoring Location</h2>
        <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true, message: 'Please input the scoring location!' }]}>
          <Select options={scoringloc} className='input' />
        </Form.Item>
        <h2>Pieces Picked</h2>
        <Form.Item<FieldType> name="piecespicked">
          <Select mode='multiple' options={piecespicked} className='input' showSearch={false} />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={async () => {setTabNum("1"); await autonCanvasRef.current?.exportImage('png').then( (data) => {autonImageURI.current = data;})}} className='tabbutton'>Back</Button>
          <Button onClick={async () => {setTabNum("3"); await autonCanvasRef.current?.exportImage('png').then( (data) => {autonImageURI.current = data;})}} className='tabbutton'>Next</Button>
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
      tele_hoardedpieces: number,
      timesamplified: number,
      // speakerscored_amplified: number,
    };
    const scoringloc = [
      { label: "Amp", value: "Amp" },
      { label: "Speaker", value: "Speaker" },
      { label: "Both", value: 'Both' },
      { label: "None", value: 'None' },
    ];
    const shootingloc = [
      { label: "US", value: "Upper Speaker" },
      { label: "CS", value: "Center Speaker" },
      { label: "LS", value: 'Lower Speaker' },
      //{ label: "A", value: 'amp' },
      // { label: "AW", value: 'aw' },
      { label: "UT", value: 'Upper Truss' },
      { label: "St", value: 'Stage' },
      { label: "LT", value: 'Lower Truss' },
      { label: "LOT", value: 'Lower Opponent Truss' },
      { label: "P", value: 'Podium'},
    ];
    const intake = [
      { label: "Ground", value: "Ground" },
      { label: "Source", value: "Source" },
      { label: "Both", value: 'Both' },
      { label: "None", value: 'None' },
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
        <h2>Pieces Hoarded</h2>
        <Form.Item<FieldType> name="tele_hoardedpieces" rules={[{ required: false }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, teleopHoardedPieces: formValue.teleopHoardedPieces + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.teleopHoardedPieces) > 0) {
                setFormValue({...formValue, teleopHoardedPieces: formValue.teleopHoardedPieces - 1});
              }
            }} className='decrementbutton'>-</Button>}
            />
          </Form.Item>
        <h2>Ground/Source Intake</h2>
        <Form.Item<FieldType> name="intake" rules={[{ required: true, message: 'Please input the intake type!' }]}>
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
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Next</Button>
        </Flex>
      </div>
      //</div>
    );
  }
  function endMatch() {
    type FieldType = {
      climbed: boolean,
      timeleft: number,
      harmony: boolean,
      climbingaffected: boolean,
      parked: boolean,
      trapscored: boolean,
    };
    return (
      <div className='matchbody'>
        <h2>Time Left</h2>
        <Form.Item<FieldType> name="timeleft" rules={[{ required: true, message: 'Please input the time left!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            disabled
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, timeLeft: formValue.timeLeft + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.timeLeft) > 0) {
                setFormValue({...formValue, timeLeft: formValue.timeLeft - 1});
              }
            }} className='decrementbutton'>-</Button>}
            />
        </Form.Item>
        <h2>Climbed</h2>
        <Form.Item<FieldType> name="climbed" valuePropName="checked">
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
        <h2>Harmony</h2>
        <Form.Item<FieldType> name="harmony" valuePropName="checked">
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
      penaltiesincurred?: string;
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
        <h2>Pushing (1-4) (0 if N/A)</h2>
        <Form.Item<FieldType> name="pushing" rules={[{ required: true, message: 'Please input the pushing rating!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0} max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              if(Number(formValue.pushingRating) < 4)
              {
                setFormValue({...formValue, pushingRating: formValue.pushingRating + 1});
              }
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.pushingRating) > 0) {
                setFormValue({...formValue, pushingRating: formValue.pushingRating - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Count. Defense (1-4) (0 if N/A)</h2>
        <Form.Item<FieldType> name="counterdefense" rules={[{ required: true, message: 'Please input the counterdefense rating!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0} max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              if (Number(formValue.counterDefenseRating) < 4) {
                setFormValue({...formValue, counterDefenseRating: formValue.counterDefenseRating + 1});
              }
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.counterDefenseRating) > 0) {
                setFormValue({...formValue, counterDefenseRating: formValue.counterDefenseRating - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Driver Skill (1-4) (0 if N/A)</h2>
        <Form.Item<FieldType> name="driverskill" rules={[{ required: true, message: 'Please input the driverskill rating!' }]}>
          <InputNumber
            type='number'
            pattern="\d*"
            onWheel={(event) => (event.target as HTMLElement).blur()}
            min={0} max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              if (Number(formValue.driverSkillRating) < 4) {
                setFormValue({...formValue, driverSkillRating: formValue.driverSkillRating + 1});
              }
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.driverSkillRating) > 0) {
                setFormValue({...formValue, driverSkillRating: formValue.driverSkillRating - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Defended</h2>
        <Form.Item<FieldType> name="defended" valuePropName="checked">
          <Checkbox className='input_checkbox' onChange={() => { updateDefendedList(); setDefendedIsVisible(!defendedIsVisible); }} />
        </Form.Item>
        <h2 style={{ display: defendedIsVisible ? 'inherit' : 'none' }}>Defended whom?</h2>
        <Form.Item<FieldType> name="defendedteam" valuePropName="checked" style={{ display: defendedIsVisible ? 'inherit' : 'none' }}>
          <Select mode='multiple' options={opposingTeamNum.map((team) => ({ label: team, value: team }))} className="input" showSearch={false} style={{ display: defendedIsVisible ? 'inherit' : 'none' }} />
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
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, numPenalties: formValue.numPenalties + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.numPenalties) > 0) {
                setFormValue({...formValue, numPenalties: formValue.numPenalties - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Penalties Incurred</h2>
        <Form.Item<FieldType> name="penaltiesincurred">
          <TextArea style={{ verticalAlign: 'center' }} className='input' />
        </Form.Item>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments">
          <TextArea style={{ verticalAlign: 'center' }} className='input' />
        </Form.Item>
        <h2 style={{ display: isLoading ? 'inherit' : 'none' }}>Submitting data...</h2>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Back</Button>
          <Input type="submit" value="Submit" className='submitbutton' />
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
    <div>
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
          amplifyscored: false,
          traversedstage: false,
          climbed: false,
          harmony: false,
          climbingaffected: false,
          parked: false,
          trapscored: false,
          robotdied: false,
          defended: false,
          wasdefended: false,
          wasdefendedteam: [],
          defendedteam: [],
          piecespicked: [],
          shootingloc: [],
          penaltiesincurred: " ",
          comments: " ",
        }}
        onFinish={async (event) => {
          try {
            setLoading(true);
            await setNewMatchScout(event);
            setFormValue({
              autonSpeakerScored: 0,
              autonAmpScored: 0,
              autonMissedAmpPieces: 0,
              autonMissedSpeakerPieces: 0,
              teleopSpeakerScored: 0,
              teleopAmpScored: 0,
              teleopMissedAmpPieces: 0,
              teleopMissedSpeakerPieces: 0,
              teleopHoardedPieces: 0,
              numPenalties: 0,
              pushingRating: 0, 
              counterDefenseRating: 0,
              driverSkillRating: 0,
              timeLeft: 0,
            });
            const initials = form.getFieldValue("initials");
            const matchnum = form.getFieldValue("matchnum");
            const matchlevel = form.getFieldValue("matchlevel");
            const robotpos = form.getFieldValue("robotpos");
            form.resetFields();
            form.setFieldValue("initials", initials);
            form.setFieldValue("matchnum", matchnum + 1);
            form.setFieldValue("matchlevel", matchlevel);
            form.setFieldValue("robotpos", robotpos);
            await calculateMatchLevel();
            await updateTeamNumber();
            await updateDefendedList();
          }
          catch (err) {
            console.log(err);
            window.alert("Error occured, please do not do leave this message and notify a Webdev member immediately.");
            window.alert(err);
          }
          finally {
            setLoading(false);
          }
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => { if (Number(key) === 1 || Number(key) === 3) {await autonCanvasRef.current?.exportImage('png').then( (data) => {autonImageURI.current = data; console.log(data)})} setTabNum(key); }} />
      </Form>
    </div>
  );
}

export default MatchScout;