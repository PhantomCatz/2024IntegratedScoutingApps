import '../public/stylesheets/strategic.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, InputNumber, Button, Flex } from 'antd';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
function Strategic(props: any) {
  const [form] = Form.useForm();
  const [tabNum, setTabNum] = useState("1");
  const [isLoading, setLoading] = useState(false);
  const [customQuestionText, setCustomQuestionText] = useState("");
	useEffect(() => {document.title = props.title; return () => {}}, [props.title]);
  const [cookies] = useCookies(['login', 'theme']);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);

  const eventname = process.env.REACT_APP_EVENTNAME;

  async function setNewStrategicScout(event: any) {
    const body = {
      "matchIdentifier": {
        "Initials": event.initials,
        "match_event": eventname,
        "match_level": event.matchlevel,
        "match_number": event.matchnum,
        "team_number": event.teamnum,
      },
      
        "comment": event.comments,
      "timesAmplified": event.timesamplified,

      // "driver": {
      //   "driverrating": event.driverrating,
      // },
      // "customquestions": {
      //   "customquestions": event.customquestions,
      // }
    };
    console.log(body);
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
  async function getCustomQuestions(team_number: number) {
    try {
      const response = await fetch(process.env.REACT_APP_STRATEGIC_URL as string + "?team_number=" + team_number);
      const data = response.json();
      setCustomQuestionText(data.toString());
      console.log(data);
    }
    catch (err) {
      console.log(err);
    }
  }
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
          <Input maxLength={2} className="input" />
        </Form.Item>
        <h2>Team #</h2>
        <Form.Item<FieldType> name="teamnum" rules={[{ required: true, message: 'Please input the team number!' }]}>
          <InputNumber min={1} className="input" onChange={(event) => { getCustomQuestions(event as number) }} />
        </Form.Item>
        <h2>Match Level</h2>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select options={rounds} className="input" />
        </Form.Item>
        <h2>Match #</h2>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber min={1} className="input" />
        </Form.Item>
        <h2>Times Amplified</h2>
        <Form.Item<FieldType> name="timesamplified" rules={[{ required: true, message: 'Please input the number of times the speaker was amplified!' }]}>
          <InputNumber type='number' pattern="\d*" onWheel={(event) => (event.target as HTMLElement).blur()} min={0} value={0} className="input" />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Next</Button>
        </Flex>
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
        <Form.Item<FieldType> name="comments" rules={[{ required: true, message: "Please input some comments!" }]}>
          <TextArea style={{ verticalAlign: 'center' }} className='strategic-input' />
        </Form.Item>
        {/* <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("1")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("3")} className='tabbutton'>Next</Button>
        </Flex> */}
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("3")} className='tabbutton'>Back</Button>
          <Input type="submit" value="Submit" className='submitbutton' />
        </Flex>
      </div>
    );
  }
  function driverRating() {
    type FieldType = {
      driverrating?: string;
    };
    return (
      <div>
        <h2>Driver Rating</h2>
        <Form.Item<FieldType> name="driverrating" rules={[{ required: true, message: "Please input something about the driver rating!" }]}>
          <TextArea style={{ verticalAlign: 'center' }} className='strategic-input' />
        </Form.Item>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("2")} className='tabbutton'>Back</Button>
          <Button onClick={() => setTabNum("4")} className='tabbutton'>Next</Button>
        </Flex>
      </div>
    );
  }
  function customQuestions() {
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
        <h2>Custom Question</h2>
        <div>
          <Form.Item<FieldType> rules={[{ required: true, message: 'Please input.' }]}>
            <Select placeholder='Question' options={questions} className="input" />
          </Form.Item>
        </div>
        <div>
          <h2 style={{ marginTop: "10%" }}>Answer</h2>
          <Form.Item<FieldType> name="answer">
            <label>
              <textarea className="pitComment" name="answer" rows={3} />
            </label>
          </Form.Item>
        </div>
        <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
          <Button onClick={() => setTabNum("3")} className='tabbutton'>Back</Button>
          <Input type="submit" value="Submit" className='submitbutton' />
        </Flex>
        <h2 style={{ display: isLoading ? 'inherit' : 'none' }}>Submitting data...</h2>
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
    // {
    //   key: '3',
    //   label: 'Driver Skill',
    //   children: driverRating(),
    // },
    // {
    //   key: '4',
    //   label: 'Custom Questions',
    //   children: customQuestions(),
    // },
  ];
  return (
    <div>
      <meta name="viewport" content="maximum-scale=1.0" />
      <div className='banner'>
        <header>
          <a href='/scoutingapp'>
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt='' />
          </a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt='' />
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Strategic Scout</h1>
                </td>
              </tr>
            </tbody>

          </table>
        </header>
      </div>
      <Form
        form={form}
        onFinish={async event => {
          setLoading(true);
          await setNewStrategicScout(event);
          const initials = form.getFieldValue('initials');
          const matchnum = form.getFieldValue('matchnum');
          form.resetFields();
          form.setFieldValue('initials', initials);
          form.setFieldValue('matchnum', matchnum + 1);
          setLoading(false);
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' onChange={async (key) => { setTabNum(key) }} />
      </Form>
    </div>
  );
}

export default Strategic;