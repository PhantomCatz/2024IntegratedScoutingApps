import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import {Button} from 'antd';

function PitScout(props: any) {
  const [form] = Form.useForm();
  useEffect(() => document.title = props.title, [props.title]);
  
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
      <div className='banner'>
        <header>
          <img src={logo} style={{ height: 64 + 'px' }} alt=''></img>
          <h1>Pit Scout</h1>
        </header>
      </div>
      
      {/* robot pictures */}
      <div style={{marginBottom:"20%"}}>
        <h1 className='pitBody' style={{fontSize:'220%'}}>Robot Pictures</h1>
        <Button style={{float:'left'}} className='pitButton'>Upload</Button>
        <Button style={{float:'right'}}className='pitButton'>Upload</Button>
        
      </div>

      {/* how many events */}
      <div>
        <h1 className='pitBody'>How many events have to competed in?</h1>
        <Form.Item name="eventNum" rules={[{required: true, message: 'Please input the robot position!' }]}>
          <InputNumber className="pitinput"/>
        </Form.Item>
      </div>

      {/* team # */}
      <div>
        <h1 className='pitBody'>Team #</h1>
        <Form.Item>
          <InputNumber className="pitinput"/>
        </Form.Item>
      </div>

      {/* drive train type */}
      <div>
        <h1 className='pitBody'>Drive Train Type</h1>
        <Form.Item>
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* robot tuype */}
      <div>
        <h1 className='pitBody'>Robot Type</h1>
        <Form.Item>
          <Input className="pitinput"/>
        </Form.Item>
      </div>

      {/* # of Motors and what type/*/}
      <div>
        <h1 className='pitBody'># of motors and what type?</h1>
        <Form.Item>
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* intake capability/*/}
      <div>
        <h1 className='pitBody'>Intake capability</h1>
        <Form.Item name="intakeCap" rules={[{ required: true, message: 'Please input the intake capability!' }]}>
          <Select placeholder='Source' options={intakeCap} className="input"/>
        </Form.Item>
      </div>

      {/* shooting capability/*/}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Shooting capability</h1>
        <Form.Item name="shootingCap" rules={[{ required: true, message: 'Please input the shooting capability!' }]}>
          <Select placeholder='Speaker' options={shootingCap} className="input"/>
        </Form.Item>
      </div>

      {/* go under stage */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Under Stage</h1>
        <Form.Item name="under">
          <Checkbox className='input_checkbox'/>
        </Form.Item>
      </div>

      {/* climbing capabilities */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>Climbing capability</h1>
        <Form.Item name="climbingCap" rules={[{ required: true, message: 'Please input the climbing capability!' }]}>
          <Select placeholder='Solo Climb' options={climbingCap} className="input"/>
        </Form.Item>
      </div>

      {/* How does robot trap? */}
      <div>
        <h1 className='pitBody' style={{marginTop:"7%"}}>How does robot trap?</h1>
        <Form.Item>
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </Form.Item>
      </div>

      {/* pit organization */}
      <div>
        <h1 className='pitBody'>Pit organization</h1>
        <Form.Item>
         <InputNumber className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team safety */}
      <div>
        <h1 className='pitBody'>Team safety</h1>
        <Form.Item>
          <InputNumber className="pitinput"/>
        </Form.Item>
      </div>

      {/* Team workmenship# */}
      <div>
        <h1 className='pitBody'>Team workmenship</h1>
        <Form.Item>
          <InputNumber className="pitinput"/>
        </Form.Item>
      </div>

      {/* Gracious professionalism */}
      <div>
        <h1 className='pitBody'>Gracious professionalism</h1>
        <Form.Item>
          <InputNumber className="pitinput"/>
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
