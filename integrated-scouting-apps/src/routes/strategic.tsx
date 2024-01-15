import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import { useEffect } from 'react';
import { Tabs, Input, Form, Select } from 'antd';
import type { TabsProps } from 'antd';

function preMatch() {
  type FieldType = {
    initials?: string;
    eventname?: string;
    matchnum?: number;
    matchlevel?: string;
    robot?: number;
  };
  const rounds = [
    {label: "Qualifications", value: "qm"},
    {label: "Elimination", value: "sf"},
    {label: "Finals", value: "f"},
  ];
  const robotNum = [
    {
      label: 'Red Alliance',
      options: [
        {label: "R1", value: "r1"},
        {label: "R2", value: "r2"},
        {label: "R3", value: 'r3'},
      ],
    },
    {
      label: 'Blue Alliance',
      options: [
        {label: "B1", value: "b1"},
        {label: "B2", value: "b2"},
        {label: "B3", value: 'b3'},
      ],
    },
  ];
  return (
    <div>
      <Form.Item<FieldType> label="Initials" name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
        <Input placeholder='Scouter Initial' maxLength={2}/>
      </Form.Item>
      <Form.Item<FieldType> label="Event Name" name="eventname" rules={[{ required: true, message: 'Please input the event name!' }]}>
      <Input disabled={true}/>
      </Form.Item>
      <Form.Item<FieldType> label="Match Level" name="matchlevel" rules={[{ required: true, message: 'Please input the event name!' }]}>
        <Select options={rounds}/>
      </Form.Item>
      <Form.Item<FieldType> id="robot" label="Robot" name="robot" rules={[{ required: true, message: 'Please input the robot number!' }]}>
        <Select options={robotNum} defaultValue={robotNum[0].options[0].value} />
      </Form.Item>
      <Form.Item<FieldType> label="Team #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
        <Input placeholder='Team #' maxLength={4}/>
      </Form.Item>
    </div>
  );
}
function AutonMatch() { //needs to be capitalized to have the dynamic field work
  type FieldType = {
    autonQuestion1?: string;
    autonQuestion2?: string;
    autonQuestion3?: string;
    autonQuestion4?: string;
    autonQuestion5?: string;
  };

  return (
    <div className='matchbody'>
      <Form.Item<FieldType> label="What was the robot's starting position?" name="autonQuestion1" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="What was the robot'What was the robot's first move when the round started? starting position?" name="autonQuestion2" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Where did they pick up game pieces from the field?" name="autonQuestion3" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Where did they place game pieces on the grid?" name="autonQuestion4" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="What was the robot's ending position?" name="autonQuestion5" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
  </div>
  );
}

function TeleopMatch() { //needs to be capitalized to have the dynamic field work
  type FieldType = {
    teleopQuestion1?: string;
    teleopQuestion2?: string;
    teleopQuestion3?: string;
    teleopQuestion4?: string;
    teleopQuestion5?: string;
    teleopQuestion6?: string;
    teleopQuestion7?: string;
    teleopQuestion8?: string;
    driverSkillRating?: string;
    robotSpeed?: string;
    comments?: string;
  };

  return (
    <div className='matchbody'>
      <Form.Item<FieldType> label="Where does the robot go directly after autonomous?" name="teleopQuestion1" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="How, if any, did defense affect the cycle time? Did the robot have good counter-defense?" name="teleopQuestion2" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="How does the robot enter the community from the scoring table’s perspective? (Top/Charging Station/Bottom)" name="teleopQuestion3" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="How, if any, did they play defense? Was it effective?" name="teleopQuestion4" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Is this robot capable of going over the charging station?" name="teleopQuestion5" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Where is this robot able to collect game pieces in the substations? (Top/Bottom/Both)" name="teleopQuestion6" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Is the robot well balanced? Or prone to tip." name="teleopQuestion7" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="What were the penalties that were incurred by this robot?" name="teleopQuestion8" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Driver Skill Rating (1-4)" name="driverSkillRating" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Robot Speed (1-4)" name="robotSpeed" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item<FieldType> label="Comments" name="comments" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
  </div>
  );
}
function StrategicScout(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
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
      children: TeleopMatch(),
    },
  ];  
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Strategic Scout</h1>
        </header>
      </div>
      <Form
      initialValues={
        {eventname: '2023cass'}
      }
        >
      <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}
export default StrategicScout;