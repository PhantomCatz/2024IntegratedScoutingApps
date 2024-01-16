import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Image, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;

  function preMatch() {
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
          <Input placeholder='NK' maxLength={2} className='input' />
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select placeholder='Match Level' options={rounds} className='input' />
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber placeholder='Match #' min={1} className='input' />
        </Form.Item>
        <h2>Robot Position</h2>
        <Form.Item<FieldType> name="robotpos" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select placeholder='Robot Position' options={robotpos} className='input' />
        </Form.Item>
        <h2>Starting Location</h2>
        <Form.Item<FieldType> name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select placeholder='Starting Location' options={startingloc} className='input' />
        </Form.Item>
        <h2>Preloaded</h2>
        <Form.Item<FieldType> name="preloaded" rules={[{ required: true, message: 'Please input if the robot was preloaded!' }]}>
          <Checkbox className='input'></Checkbox>
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      auton_speakerscored?: number;
      auton_ampscored?: number;
      missedpieces?: number;
      leavespawn?: boolean;
      auton_scoringloc?: string; 
      preloadscored?: boolean;
      piecespicked?: string;
    };
    function PathTab(colfor: boolean) { //needs to be capitalized to have the dynamic field work
      return (
        <div style={{ alignContent: 'center' }}>
          <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
          <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
          <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          <ReactSketchCanvas
            ref={canvasRef}
            height='568px'
            width='568px'
            strokeWidth={5}
            strokeColor='#32a7dc'
            eraserWidth={100}
            backgroundImage={color ? field_blue : field_red}
            preserveBackgroundImageAspectRatio='xMidyMid meet'
            exportWithBackgroundImage={true}
          />
        </div>
      );
    };
    function commentsTab() {
      return (
        <TextArea placeholder='Comments' className='textarea' showCount name='comments'></TextArea>
      );
    }
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Path',
        children: PathTab(color),
      },
      {
        key: '2',
        label: 'Pieces',
        children: commentsTab(),
      }
    ];
    const scoringloc = [
      { label: "Amp", value: "amp" },
      { label: "Speaker", value: "speaker" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const piecespicked = [
      {
        label: 'Wing',
        options: [
          { label: "W1", value: "wing1" },
          { label: "W2", value: "wing2" },
          { label: "W3", value: 'wing3' },
        ],
      },
      {
        label: 'Center',
        options: [
          { label: "C1", value: "center1" },
          { label: "C2", value: "center2" },
          { label: "C3", value: 'center3' },
        ],
      },
      { label: "None", value: "none"},
    ];
    
    return (
      <div>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
          <h2>Speaker Scored</h2>
            <Form.Item<FieldType> name="auton_speakerscored" rules={[{ required: true }]}>
              <InputNumber min={0} className='mainbutton' />
            </Form.Item>
            <h2>Amp Scored</h2>
            <Form.Item<FieldType> name="auton_ampscored" rules={[{ required: true }]}>
              <InputNumber min={0} className='mainbutton' />
            </Form.Item>
            <h2>Missed Pieces</h2>
            <Form.Item<FieldType> name="missedpieces" rules={[{ required: true }]}>
              <InputNumber min={0} className='mainbutton' />
            </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
          <h2>Leave Spawn</h2>
            <Form.Item<FieldType> name="leavespawn" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <h2>Scoring Location</h2>
            <Form.Item<FieldType> name="auton_scoringloc" rules={[{ required: true }]}>
              <Select placeholder='Starting Location' options={scoringloc} className='mainbutton' />
            </Form.Item>
            <h2>Preload Scored</h2>
            <Form.Item<FieldType> name="preloadscored" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <h2>Pieces Picked</h2>
            <Form.Item<FieldType> name="piecespicked" rules={[{ required: true }]}>
            <Select placeholder='Pieces Picked' options={piecespicked} className='mainbutton' />
            </Form.Item>
          </Flex>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} style={{ alignItems: 'center', textAlign: 'center' }} />
      </div>
    );
  }
  function teleopMatch() {
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
    };
    const scoringloc = [
      { label: "Amp", value: "amp" },
      { label: "Speaker", value: "speaker" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const piecespicked = [
      {
        label: 'Wing',
        options: [
          { label: "W1", value: "wing1" },
          { label: "W2", value: "wing2" },
          { label: "W3", value: 'wing3' },
        ],
      },
      {
        label: 'Center',
        options: [
          { label: "C1", value: "center1" },
          { label: "C2", value: "center2" },
          { label: "C3", value: 'center3' },
        ],
      },
      { label: "None", value: "none"},
    ];
    return (
      <div>
        <h2>Speaker Scored</h2>
        <Form.Item<FieldType> name="tele_speakerscored" rules={[{ required: true }]}>
          <InputNumber min={0} value={0} className="score"></InputNumber>
        </Form.Item>
        <h2>Amp Scored</h2>
        <Form.Item<FieldType> name="tele_ampscored" rules={[{ required: true }]}>
          <InputNumber min={0} value={0} className="score"></InputNumber>
        </Form.Item>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <h2>Times Amflified</h2>
            <Form.Item<FieldType> name="timesamplified" rules={[{ required: true }]}>
              <InputNumber min={0} value={0} className="mainbutton"></InputNumber>
            </Form.Item>
            <h2>Ground Intake</h2>
            <Form.Item<FieldType> name="groundintake" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <h2>Source Intake</h2>
            <Form.Item<FieldType> name="sourceintake" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <h2>Scoring Location</h2>
            <Form.Item<FieldType> name="tele_scoringloc" rules={[{ required: true }]}>
              <Select placeholder='Starting Location' options={scoringloc} className='mainbutton' />
            </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
            <h2>Amplified Score</h2>
            <Form.Item<FieldType> name="amplifyscored" rules={[{ required: true }]}>
              <InputNumber min={0} value={0} className="mainbutton"></InputNumber>
            </Form.Item>
            <h2>Coopertition Pressed</h2>
            <Form.Item<FieldType> name="cooppressed" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox> 
            </Form.Item>
            <h2>Cooperated First</h2>
            <Form.Item<FieldType> name="cooppressed1st" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <h2>Go Under the Stage</h2>
            <Form.Item<FieldType> name="traversedstage" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
          </Flex>
        </Flex>
      </div>
    );
  }
  function endMatch() {
    type FieldType = {
      enddied?: boolean;
      startingloc?: string;
      enddocked?: boolean;
      endengaged?: boolean;
      parked?: boolean;
      matchnum?: number;
      robotnum?: number;
      intake?: number;
      countdefense?: number;
      defense?: number;
      driver?: number;
      penalty?: string;
      comments?: string;
      selfbalance?: boolean;
    };
    const robotNum = [
      {
        label: 'Red Alliance',
        options: [
          { label: "R1", value: "red_1" },
          { label: "R2", value: "red_2" },
          { label: "R3", value: 'red_3' },
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          { label: "B1", value: "blue_1" },
          { label: "B2", value: "blue_2" },
          { label: "B3", value: 'blue_3' },
        ],
      },
    ];
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          </Form.Item>
          <Form.Item<FieldType> id="robotnum" name="robotnum" rules={[{ required: true, message: 'Please input the robot number!' }]}>
            <Select options={robotNum} className='input' onChange={async event => {
              if (event) {
                if (event.includes("red")) {
                  setColor(false);
                  canvasRef.current?.resetCanvas();
                }
                else {
                  setColor(true);
                  canvasRef.current?.resetCanvas();
                }
              }
            }} />
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> name="enddied" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="enddocked" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="endengaged" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="parked" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="selfbalance" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
          </Flex>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> name="intake" rules={[{ required: true, message: 'Please input the intake speed!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
            <Form.Item<FieldType> name="countdefense" rules={[{ required: true, message: 'Please input the counterdefense!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
          </Flex>
          <Flex vertical align='flex-end'>
            <Form.Item<FieldType> name="defense" rules={[{ required: true, message: 'Please input the defense!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
            <Form.Item<FieldType> name="driver" rules={[{ required: true, message: 'Please input the driver skill!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
          </Flex>
        </Flex>
        <TextArea placeholder='Penalties Occured' maxLength={100} className='textarea' showCount name='penalty'></TextArea>
        <TextArea placeholder='Comments' maxLength={100} className='textarea' showCount name='comments'></TextArea>
        <Input type="submit" value="Submit" className='submit'></Input>
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
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Match Scout</h1>
            </td>
          </table>
        </header>
      </div>
      <Form
        initialValues={{
          autondied: false,
          docked: false,
          engaged: false,
          h_cube: false,
          h_cone: false,
          super: false,
          autondocked: false,
          autonengaged: false,

          single: false,
          double: false,
          ground: false,
          teleopdied: false,
          defend: false,
          wasdefend: false,

          enddied: false,
          enddocked: false,
          endengaged: false,
          parked: false,
          selfbalance: false,

          ll_high: false,
          lm_high: false,
          lr_high: false,
          ml_high: false,
          mm_high: false,
          mr_high: false,
          rl_high: false,
          rm_high: false,
          rr_high: false,
          ll_mid: false,
          lm_mid: false,
          lr_mid: false,
          ml_mid: false,
          mm_mid: false,
          mr_mid: false,
          rl_mid: false,
          rm_mid: false,
          rr_mid: false,
        }}
        form={form}
        onFinish={async event => {

        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form>
    </body>
  );
}

export default MatchScout;