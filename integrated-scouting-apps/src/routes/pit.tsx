/**
 * @author Robin Kang, add more...
 * @since 2023-10-29
 * @version 1.0.0
 * @description pit scout 
 */
import '../public/stylesheets/style.css';
import '../public/stylesheets/pit.css';
import '../public/stylesheets/match.css';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, message, Select, Tabs, TabsProps } from 'antd';
import { useRef } from 'react';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react'
import back from '../public/images/back.png'
import { useParams } from 'react-router-dom';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';


function PitScout(props: any) {
  const [tabNum, setTabNum] = useState("1");
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
	useEffect(() => {document.title = props.title; return () => {}}, [props.title]);
  const [cookies] = useCookies(['login', 'theme']);
  // useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  // useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);

  const { team_number } = useParams();
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  useEffect(() => {
    async function fetchData(team_number: number) {
      let parsedData = "";
      try {
        const url = process.env.REACT_APP_PIT_URL + "?team_number=" + team_number;
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < data.documents.length; i++) {
          const matches = data.documents[i];
          for (let pitInfo in matches) {
            const pitData = matches[pitInfo];
            for (let pitStats in pitData) {
              if (Number.isNaN(Number(pitStats))) {
                parsedData = parsedData.concat("\n" + pitStats + ":" + pitData[pitStats]);
              }
            }
          }
          parsedData = parsedData.concat("\n");
        }
        setFetchedData(parsedData);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }} );

  const submitPitData = async function submitData(values:any) {
    const body ={
      // "robot_pic": values.base64String,  
      "robot_events": values.robot_events,
      "team_number": values.team_number,
      "robot_drive_train": values.robot_drive_train,
      "robot_weight": values.robot_weight,
      "robot_motor_type": values.robot_motor_type,
      "robot_motor_counter": values.robot_motor_counter,
      "robot_wheel_type": values.robot_wheel_type,
      "robot_intake_capability": values.robot_intake_capability,
      "robot_shooting_capability": values.robot_shooting_capability,
      "robot_ability_traversed_stage": values.robot_ability_traversed_stage,
      "robot_climbing_capabilities": values.robot_climbing_capabilities,
      "robot_trap_detail": values.robot_trap_detail,
      "robot_pit_organization": values.robot_pit_organization,
      "robot_team_safety": values.robot_team_safety,
      "robot_team_workmanship": values.robot_team_workmanship,
      "robot_GP": values.robot_GP,
      "robot_auton_path": imageURI.current,
      "robot_auton_path_detail": values.robot_auton_path_detail,
      // "pit_question": question,
      // "pit_answer": values.pit_answer,
      
    }
    try {
      const url = process.env.REACT_APP_PIT_URL as string;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log('Data successfully submitted!');
        console.log(response);
        console.log(team_number);
        console.log(body);
        // window.location.reload();
      } else {
        console.log('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.log('Error submitting data:', error);
      console.log('Failed to submit data. Please try again.');
    }
  };
  


  const [image, setImage] = useState(String);

  // const handleImageUpload = (e: any) => {
  //   setImage(URL.createObjectURL(e.target.files[0]));
  // };
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = reader.result?.toString();
      // Do something with the base64String, such as storing it in state
      console.log(base64String); // Log the base64 string to the console for demonstration
    };
  
    reader.readAsDataURL(file);
  };


  function pitInput() {
    type FieldType = {
      // robot_pic: string;
      robot_events: number;
      team_number: number;
      robot_drive_train: string;
      robot_weight: number;
      robot_motor_type: string;
      robot_motor_counter: number,
      robot_wheel_type: string,
      robot_intake_capability: string;
      robot_shooting_capability: string;
      robot_ability_traversed_stage: boolean;
      robot_climbing_capabilities: string;
      robot_trap_detail: string,
      robot_pit_organization: number,
      robot_team_safety: number,
      robot_team_workmanship: number,
      robot_GP: number,
      robot_auton_path: string,
      robot_auton_path_detail: string;
      // pit_question: string,
      // pit_answer: string,
    };

    const drive_train = [
      { label: "Tank", value: "tank" },
      { label: "Swerve", value: "swerve" },
      { label: "H-Drive", value: 'hdrive' },
      { label: "Other", value: 'other' },
    ];
    const motor_type = [
      { label: "Falcon 500", value: "falcon500" },
      { label: "Kraken", value: "kraken"},
      { label: "NEO", value: "neo" },
      { label: "CIM", value: 'cim' },
      { label: "Other", value: 'other' },
    ];
    const wheel_type = [
      { label: "Nitrile / Neoprene / Plaction", value: "nnp" },
      { label: "HiGrip", value: "hgrip" },
      { label: "Colson", value: 'colson' },
      { label: "Stealth / Smooth grip", value: 'ss' },
      { label: "Pneumatasic", value: 'pneumatasic' },
      { label: "Omni", value: 'omni' },
      { label: "Mechanum", value: 'mechanum' },
      { label: "Other", value: 'other' },

    ];
    const intakeCap = [
      { label: "Source", value: "source" },
      { label: "Ground", value: "ground" },
      { label: "Both", value: 'both' },
    ];
    const shootingCap = [
      { label: "Speaker", value: "speaker" },
      { label: "Amp", value: "amp" },
      { label: "Both", value: 'both' },
    ];
    const climbingCap = [
      { label: "Solo Climb", value: "solo_climb" },
      { label: "Harmonize", value: "harmonize" },
      { label: "Triple Climb", value: 'triple_climb' },
      { label: "No Climb", value: "no_climb"}
    ];




    return (
    
      <div>
        <Form 
        form={form}
        initialValues={{
          // robot_pic: '',
          robot_events: 0,
          team_number: 0,
          robot_drive_train: '',
          robot_weight: 0,
          robot_motor_type: '',
          robot_motor_counter: 0,
          robot_wheel_type: '',
          robot_intake_capability: '',
          robot_shooting_capability: '',

          robot_ability_traversed_stage: false,
          robot_climbing_capabilities: '',
          robot_trap_detail: '',
          robot_pit_organization: 0,
          robot_team_safety: 0,
          robot_team_workmanship: 0,
          robot_GP: 0,
          robot_auton_path: '',
          robot_auton_path_detail: '',
          // pit_question: '',
          // pit_answer: '',
        }}

        onFinish={async event => {
        try{
          await submitPitData(event);
          form.resetFields();
        }
        catch (error) {
          console.log('Error submitting data:', error);
          console.log('Failed to submit data. Please try again.');
        }
      }} >
     
        {/* how many events */}
 
          <h1 style={{ marginTop: "10%" }} className='pitBody'>How many events have you competed in?</h1>
          <Form.Item<FieldType> name="robot_events" rules={[{ required: true, message: 'Please input the robot position!' }]}>
            <InputNumber controls min={0} className="pitinput" />
          </Form.Item>
        

        {/* team # */}
          <h1 className='pitBody'>Team #</h1>
          <Form.Item<FieldType> name="team_number">
            <InputNumber controls min={0} className="pitinput" />
          </Form.Item>

        {/* drive train type */}
          <h1 className='pitBody'>Drive Train Type</h1>
          <Form.Item<FieldType> name="robot_drive_train" rules={[{ required: true, message: 'Please input the drive train type!' }]}>
            <Select placeholder='' options={drive_train} className="pitinput" />
          </Form.Item>

        {/* robot weight */}
          <h1 className='pitBody'>Robot Weight</h1>
          <Form.Item<FieldType> name="robot_weight">
            <InputNumber controls min={0} className="pitinput" />
          </Form.Item>

        {/* motor type */}
          <h1 className='pitBody'>Motor Type</h1>
          <Form.Item<FieldType> name="robot_motor_type" rules={[{ required: true, message: 'Please input the motor type!' }]}>
            <Select placeholder='' options={motor_type} className="pitinput" />
          </Form.Item>

        {/* motor counter */}
          <h1 className='pitBody'># of Motors</h1>
          <Form.Item<FieldType> name="robot_motor_counter">
            <InputNumber controls min={0} className="pitinput" />
          </Form.Item>

        {/* motor type */}
          <h1 className='pitBody'>Wheel Type</h1>
          <Form.Item<FieldType> name="robot_wheel_type" rules={[{ required: true, message: 'Please input the wheel type!' }]}>
            <Select placeholder="" options={wheel_type} className="pitinput" />
          </Form.Item>

        {/* intake capability/*/}
          <h1 className='pitBody'>Intake capability</h1>
          <Form.Item<FieldType> name="robot_intake_capability" rules={[{ required: true, message: 'Please input the intake capability!' }]}>
            <Select placeholder='' options={intakeCap} className="input" />
          </Form.Item>

        {/* shooting capability/*/}
          <h1 className='pitBody' style={{ marginTop: "7%" }}>Shooting capability</h1>
          <Form.Item<FieldType> name="robot_shooting_capability" rules={[{ required: true, message: 'Please input the shooting capability!' }]}>
            <Select placeholder='' options={shootingCap} className="input" />
          </Form.Item>

        {/* go under stage */}
          <h1 className='pitBody'  style={{ marginTop: "7%" }}>Under Stage</h1>
          <Form.Item<FieldType> valuePropName="checked" name="robot_ability_traversed_stage" >
            <Checkbox className='input_checkbox' />
          </Form.Item>

        {/* climbing capabilities */}
          <h1 className='pitBody' style={{ marginTop: "7%" }}>Climbing capability</h1>
          <Form.Item<FieldType> name="robot_climbing_capabilities" rules={[{ required: true, message: 'Please input the climbing capability!' }]}>
            <Select placeholder='' options={climbingCap} className="input" />
          </Form.Item>

        {/* How does robot trap? */}
          <h1 className='pitBody' style={{ marginTop: "7%" }}>How does robot trap?</h1>
          <Form.Item<FieldType> name="robot_trap_detail">
            <label>
              <textarea className="pitComment" name="eventNum" rows={3} />
            </label>
          </Form.Item>

        {/* pit organization */}
          <h1 className='pitBody'>Pit organization</h1>
          <Form.Item<FieldType> name="robot_pit_organization">
            <InputNumber controls min={1} max={4} className="pitinput" />
          </Form.Item>

        {/* Team safety */}
          <h1 className='pitBody'>Team safety</h1>
          <Form.Item<FieldType> name="robot_team_safety">
            <InputNumber controls min={1} max={4} className="pitinput" />
          </Form.Item>

        {/* Team workmenship# */}
          <h1 className='pitBody'>Team workmanship</h1>
          <Form.Item<FieldType> name="robot_team_workmanship">
            <InputNumber controls min={1} max={4} className="pitinput" />
          </Form.Item>

        {/* Gracious professionalism */}
          <h1 className='pitBody'>Gracious professionalism</h1>
          <Form.Item<FieldType> name="robot_GP">
            <InputNumber controls min={1} max={4} className="pitinput" />
          </Form.Item>

        {/* <div style={{ alignContent: 'center' }}> */}
          <ReactSketchCanvas
            ref={canvasRef}
            width='50rem'
            height='50rem'
            strokeWidth={8}
            strokeColor='#32a7dc'
            backgroundImage={color ? field_red : field_blue}
            exportWithBackgroundImage={true}
            style={{ paddingBottom: '5%' }}
            onChange={async () => { canvasRef.current?.exportImage('png').then((data: any) => imageURI.current = data)}}
          />
          <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
            <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
        {/* </div> */}

        {/* auton path details */}
          <h1 className='pitBody' style={{ marginTop: "7%" }}>Auton path details</h1>
          <Form.Item<FieldType> name="robot_auton_path_detail">
            <label>
              <textarea className="pitComment" name="eventNum" rows={3} />
            </label>
          </Form.Item>
        

        {/* robot pictures */}
        {/* <div style={{ marginBottom: "5%" }}> */}
          {/* <h1 className='pitBody' style={{ fontSize: '260%', marginTop: '0%' }}>Robot Pictures</h1>
          <input className='uploadButton' style={{ opacity: "1" }} type="file" accept="image/*" onChange={handleImageUpload} />
          {image ? <img src={image} className="image" alt="preview" width={"100%"} height={"100%"} /> : null} */}


        {/* submit */}
          {/* <Button style={{ marginLeft: '25%', marginTop: '10%' }} className='pitButton'>Submit</Button> */}
          <Input type="submit" value="Submit" className='submit' />

        </Form>
      </div>
    );
  }

  {/* function answers() {
    type FieldType = {
      answer: string,


    };
    const questions = [
      { label: "team", value: "team" },
      { label: "team", value: "team" },
      { label: "team", value: 'team' },
    ];

    return (
      <div>
        <div>
          <h1 style={{ marginTop: "10%" }}></h1>
          <Form.Item<FieldType> rules={[{ required: true, message: 'Please input.' }]}>
            <Select placeholder='Question' options={questions} className="input" />
          </Form.Item>
        </div>

        <div>
          <h1 style={{ marginTop: "10%" }} className='pitBody'>Answer</h1>
          <Form.Item<FieldType> name="answer">
            <label>
              <textarea className="pitComment" name="answer" rows={3} />
            </label>
          </Form.Item>
        </div>

        {/* submit */}
      //   <div>
      //     <Button style={{ marginLeft: '25%', marginTop: '10%' }} className='pitButton'>Submit</Button>
      //   </div>
      // </div>
     
  //   );
  // } }
  

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Inputs',
      children: pitInput()
      
    }
  ];

    // {
    //   key: '2',
    //   label: 'Answer',
    //   children: answers(),
    // },
  // ];


  return (
    <div>
      <div>
        <header className='banner'>
          <a href='/scoutingapp'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>
          <table>
            <tr>
              <td>
                <img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
              </td>
              <td>
                <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Pit Scout</h1>
              </td>
            </tr>

          </table>
        </header>
      </div>

      <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => { setTabNum(key) }} />
    </div>
  );
}
export default PitScout;
