
import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import {Button} from 'antd';
import back from '../public/images/back.png'

function PitScout(props: any) {
  const [form] = Form.useForm();
  useEffect(() => document.title = props.title, [props.title]);

  type FieldType = {
    events: number;
    teamNum: number;
    dtType: string;
    rType: string;
    numMotorsAndType: string;
    intakeCap: string;
    shootingCap: string;
    underStage: boolean;
    climbingCap: string;
    howTrap: string,
    pitOrg: number,
    teamSafe: number,
    teamWorkmenship: number,
    gracProf: number,
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
  
  
 
  return(
    <body>
       <div>
        <header className='banner'>
          <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''></img>
          <table>
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
      <div style={{marginBottom:"25%"}}>
        <h1 className='pitBody' style={{fontSize:'260%', marginTop: '10%'}}>Robot Pictures</h1>
        <Button style={{float:'left'}} className='pitButton'>Upload</Button>
        
      </div>

      {/* how many events */}
      <div>
        <h1 className='pitBody'>How many events have to competed in?</h1>
        <Form.Item<FieldType> name="events" rules={[{required: true, message: 'Please input the robot position!' }]}>
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* team # */}
      <div>
        <h1 className='pitBody'>Team #</h1>
        <Form.Item<FieldType> name="teamNum">
          <InputNumber controls min={0} className="pitinput"/>
        </Form.Item>
      </div>

      {/* drive train type */}
      <div>
        <h1 className='pitBody'>Drive Train Type</h1>
        <Form.Item<FieldType> name="dtType">
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* robot tuype */}
      <div>
        <h1 className='pitBody'>Robot Type</h1>
        <Form.Item<FieldType> name="rType">
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* # of Motors and what type/*/}
      <div>
        <h1 className='pitBody'># of motors and what type?</h1>
        <Form.Item<FieldType> name="numMotorsAndType">
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* intake capability/*/}
      <div>
        <h1 className='pitBody'>Intake capability</h1>
        <Form.Item<FieldType> name="intakeCap" rules={[{ required: true, message: 'Please input the intake capability!' }]}>
          <Select placeholder='Source' options={intakeCap} className="input"/>
        </Form.Item>
      </div>

      {/* shooting capability/*/}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Shooting capability</h1>
        <Form.Item<FieldType> name="shootingCap" rules={[{ required: true, message: 'Please input the shooting capability!' }]}>
          <Select placeholder='Speaker' options={shootingCap} className="input"/>
        </Form.Item>
      </div>

      {/* go under stage */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Under Stage</h1>
        <Form.Item<FieldType> name="underStage">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>

      {/* climbing capabilities */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Climbing capability</h1>
        <Form.Item<FieldType> name="climbingCap" rules={[{ required: true, message: 'Please input the climbing capability!' }]}>
          <Select placeholder='Solo Climb' options={climbingCap} className="input"/>
        </Form.Item>
      </div>

      {/* How does robot trap? */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>How does robot trap?</h1>
        <Form.Item<FieldType> name="howTrap">
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* pit organization */}
      <div>
        <h1 className='pitBody'>Pit organization</h1>
        <Form.Item<FieldType> name="pitOrg">
         <InputNumber controls min={0} max={5} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team safety */}
      <div>
        <h1 className='pitBody'>Team safety</h1>
        <Form.Item<FieldType> name="teamSafe">
          <InputNumber controls min={0} max={5} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team workmenship# */}
      <div>
        <h1 className='pitBody'>Team workmenship</h1>
        <Form.Item<FieldType> name="teamWorkmenship">
          <InputNumber controls min={0} max={5} className="pitinput"/>
        </Form.Item>
      </div>

      {/* Gracious professionalism */}
      <div>
        <h1 className='pitBody'>Gracious professionalism</h1>
        <Form.Item<FieldType> name="gracProf">
          <InputNumber controls min={0} max={5} className="pitinput"/>
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