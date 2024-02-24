import '../public/stylesheets/strategic.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect } from 'react';
import { Tabs, Input, Form, Select, InputNumber } from 'antd';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function Strategic(props: any) {
  const [form] = Form.useForm();
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;

  async function setNewStrategicScout(event: any) {
    const body = {
      "matchIdentifier": {
        "Initials": event.initials,
        "match_event": eventname,
        "team_number": event.teamnum,
        "match_level": event.matchlevel,
        "match_number": event.matchnum,
        "timesamplified": event.timesamplified,
      },
      "comment": {
        "comment": event.comments,
      }
    };
    const WORKING_TEST_DO_NOT_REMOVE_OR_YOU_WILL_BE_FIRED = {
      "matchIdentifier": {
        "Initials": "LL",
        "match_event": "2024CALA",
        "team_number": 2637,
        "match_level": "Qual",
        "match_number": 4
      },
      "comment": {
        "comment": "asdfasdfasdf"
      }
    };
    try {
      await fetch(process.env.REACT_APP_STRATEGIC_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => response.json()).then(data => console.log(data));
    }
    catch (err) {
      console.log(err);
    }
  };
  function preMatch() {
    type FieldType = {
      initials?: string;
      teamnum?: number;
      matchlevel?: string;
      matchnum?: number;
      timesamplified?: number;
    };
    const rounds = [
      { label: "Qualifications", value: "qm" },
      { label: "Elimination", value: "sf" },
      { label: "Finals", value: "f" },
    ];
    return (
      <div>
        <h2>Scouter Initials</h2>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input maxLength={2} className="input"/>
        </Form.Item>
        <h2>Team #</h2>
        <Form.Item<FieldType> name="teamnum" rules={[{ required: true, message: 'Please input the team number!' }]}>
          <InputNumber min={1} className="input"/>
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select options={rounds} className="input"/>
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber min={1} className="input"/>
        </Form.Item>
        <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true, message: 'Please input the number of times the speaker was amplified!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input"/>
        </Form.Item>
      </div>
    );
  }
  function comment() {
    type FieldType = {
      comments?: string;
    };
    return (
      <div>
        <h2>Comments</h2>
        <Form.Item<FieldType> name="comments" rules={[{ required: true }]}>
          <TextArea style={{verticalAlign: 'center'}} className='strategic-input'/>
        </Form.Item>
        <Input type="submit" value="Submit" className='input'/>
      </div>
    );
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Pre',
      children: preMatch(),
    },
    {
      key: '2',
      label: 'Comment',
      children: comment(),
    },
  ];
  return (
    <body>
      <div className='banner'>
        <header>
          <a href='/scoutingapp'>
            <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''/>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Strategic Scout</h1>
            </td>
          </table>
        </header>
      </div>
      <Form
        form={form}
        onFinish={async event => {
          await setNewStrategicScout(event);
          window.location.reload();
        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form>
    </body>
  );
}

export default Strategic;