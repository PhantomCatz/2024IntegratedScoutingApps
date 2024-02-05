/**
 * @author Robin Kang, add more...
 * @since 2023-10-29
 * @version 1.0.0
 * @description pit scout 
 */
import '../public/stylesheets/style.css';
import '../public/stylesheets/pit.css';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Upload, message } from 'antd';
import {useRef } from 'react';
import {Button} from 'antd';
import React, { useState, useEffect } from 'react'
import back from '../public/images/back.png'
import { useParams } from 'react-router-dom';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import FormItemInput from 'antd/es/form/FormItemInput';

function PitScout(props: any) {
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  useEffect(() => document.title = props.title, [props.title]);
  const { team_number } = useParams();
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(true);
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
    }
    if (team_number) {
      fetchData(parseInt(team_number));
    }
  }, [team_number]);

  type FieldType = {
    robot_pic: string;
    robot_events: number;
    team_number: number;
    robot_drive_train: string;
    robot_weight: number;
    robot_motor_type: string;
    robot_motor_counter: number,
    robot_intake_capability: string;
    robot_shooting_capability: string;
    robot_ability_tranversed_stage: boolean;
    robot_climbing_capabilities: string;
    robot_trap_detail: string,
    robot_pit_organization: number,
    robot_team_safety: number,
    robot_team_workmanship: number,
    robot_GP: number,
    robot_auton_path: string,
    robot_auton_path_detail: string;
  };

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
  ];
  
  const [image, setImage] = useState(String);

  const handleImageUpload = (e:any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

 
  return(
    <body>
       <div>
        <header className='banner'>
          <a href='/scoutingapp'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Pit Scout</h1>
            </td>
          </table>
        </header>
      </div>
      
      {/* robot pictures */}
      <div style={{marginBottom:"5%"}}>
        <h1 className='pitBody' style={{fontSize:'260%', marginTop: '10%'}}>Robot Pictures</h1>
        <input style={{background:"transparent", border:"none", fontSize:"0"}} className="uploadButton" type="file" accept="image/*" onChange={handleImageUpload} />
        {image ? <img src={image} className="image" alt="preview" width={"100%"} height={"100%"}/> : null}
        
      </div>

      {/* how many events */}
      <div>
        <h1 className='pitBody'>How many events have to competed in?</h1>
        <Form.Item<FieldType> name="robot_events" rules={[{required: true, message: 'Please input the robot position!' }]}>
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* team # */}
      <div>
        <h1 className='pitBody'>Team #</h1>
        <Form.Item<FieldType> name="team_number">
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* drive train type */}
      <div>
        <h1 className='pitBody'>Drive Train Type</h1>
        <Form.Item<FieldType> name="robot_drive_train">
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* robot weight */}
      <div>
        <h1 className='pitBody'>Robot Weight</h1>
        <Form.Item<FieldType> name="robot_weight">
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* motor type */}
      <div>
        <h1 className='pitBody'>Motor Type</h1>
        <Form.Item<FieldType> name="robot_motor_type">
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* motor counter */}
      <div>
        <h1 className='pitBody'># of Motors</h1>
        <Form.Item<FieldType> name="robot_motor_counter">
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* intake capability/*/}
      <div>
        <h1 className='pitBody'>Intake capability</h1>
        <Form.Item<FieldType> name="robot_intake_capability" rules={[{ required: true, message: 'Please input the intake capability!' }]}>
          <Select placeholder='Source' options={intakeCap} className="input"/>
        </Form.Item>
      </div>

      {/* shooting capability/*/}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Shooting capability</h1>
        <Form.Item<FieldType> name="robot_shooting_capability" rules={[{ required: true, message: 'Please input the shooting capability!' }]}>
          <Select placeholder='Speaker' options={shootingCap} className="input"/>
        </Form.Item>
      </div>

      {/* go under stage */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Under Stage</h1>
        <Form.Item<FieldType> name="robot_ability_tranversed_stage">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>

      {/* climbing capabilities */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Climbing capability</h1>
        <Form.Item<FieldType> name="robot_climbing_capabilities" rules={[{ required: true, message: 'Please input the climbing capability!' }]}>
          <Select placeholder='Solo Climb' options={climbingCap} className="input"/>
        </Form.Item>
      </div>

      {/* How does robot trap? */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>How does robot trap?</h1>
        <Form.Item<FieldType> name="robot_trap_detail">
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* pit organization */}
      <div>
        <h1 className='pitBody'>Pit organization</h1>
        <Form.Item<FieldType> name="robot_pit_organization">
         <InputNumber controls min={1} max={4} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team safety */}
      <div>
        <h1 className='pitBody'>Team safety</h1>
        <Form.Item<FieldType> name="robot_team_safety">
          <InputNumber controls min={1} max={4} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team workmenship# */}
      <div>
        <h1 className='pitBody'>Team workmenship</h1>
        <Form.Item<FieldType> name="robot_team_workmanship">
          <InputNumber controls min={1} max={4} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Gracious professionalism */}
      <div>
        <h1 className='pitBody'>Gracious professionalism</h1>
        <Form.Item<FieldType> name="robot_GP">
          <InputNumber controls min={1} max={4} className="pitinput"/>
        </Form.Item>
      </div>

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
            onChange={(event) => {canvasRef.current?.exportImage('png').then((data: any) => imageURI.current = data);}}
          />
          <Flex justify='in-between' style={{paddingBottom: '10%'}}>
            <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
            <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
            <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          </Flex>
        </div>

        {/* auton path details */}
        <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Auton path details</h1>
        <Form.Item<FieldType> name="robot_auton_path_detail">
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* submit */}
      <div>
          <Button style={{marginLeft: '25%', marginTop: '10%'}} className='pitButton'>Submit</Button>
      </div>

      

      

      

    </body>
  );
}
export default PitScout;
