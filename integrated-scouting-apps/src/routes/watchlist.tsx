import '../public/stylesheets/style.css';
import '../public/stylesheets/watchlist.css';
import '../public/stylesheets/match.css';
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
import { useCookies } from 'react-cookie';
import VerifyLogin from '../verifyToken';


function Watchlist(props: any) {

  type FieldType = {
    team_number: number;
    question: string;
    answer?: string;
    question_type: string;
  };
  
  const [tabNum, setTabNum] = useState("1");
  useEffect(() => {document.title = props.title}, [props.title]);

  const [cookies] = useCookies(['login']);
  useEffect(() => { VerifyLogin(cookies.login); }, []);
  const handleSubmit = async function watchListUpdate(values: FieldType) {
    const requestBody = {
      team_number: values.team_number,
      custom0: {
        question: values.question,
        answer: values.answer,
        question_type: values.question_type,
      },
    }; 
    
    console.log("Team Number:", requestBody.team_number);
    console.log("Custom Question:", requestBody.custom0.question);
    console.log("Custom Answer:", requestBody.custom0.answer);
    console.log("Question Type:", requestBody.custom0.question_type);
    
    try {
      const response = await fetch(process.env.REACT_APP_WATCHLIST_URL as string, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Data sent successfully:", responseData);
      } else {
        const errorData = await response.json();
        console.error("Error sending data:", errorData.message); // Extract relevant error message
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }
  function input(){
    type FieldType = {
      team_number: number,//name not specified
      question: string,
      answer?: string,
      question_type: string,

    };
    const appOptions = [
      { label: "Pit", value: "pit" },
      { label: "Strategic", value: "Strategic" },
    ];
    return (
      <body>
        <div>
          <h1 className='pitBody'>Team #</h1>
          <Form<FieldType> onFinish={async values => {
            try{
              await handleSubmit(values);
              window.location.reload();

            }
            catch (err){
              console.log(err);
            }
          }}>
          {/* <Form<FieldType> onFinish={handleSubmit}> */}
            <Form.Item<FieldType> name="team_number">
              <InputNumber controls min={0} className="pitinput" />
            </Form.Item>
            <Form.Item<FieldType> name="question_type" rules={[{ required: true, message: 'Please input.' }]}>
              <Select placeholder='Match' options={appOptions} className="input" />
            </Form.Item>
            <div>
              <h1 style={{ marginTop: "10%" }} className='pitBody'>Custom Question</h1>
              <Form.Item<FieldType> name="question">
                <label>
                  <textarea className="pitComment" name="eventNum" rows={3} />
                </label>
              </Form.Item>
            </div>
            <div>
              <Button type="primary" htmlType="submit" className="submitbutton">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </body>
    );
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Input',
      children: input(),
    },
    {
      key: '2',
      label: 'WatchList',
      children: <h1>Still making</h1>,
    },
];
  
  
  return(
    <body>
      <div>
        <header className='banner'>
          <a href='/home'><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Watchlist</h1>
            </td>
          </table>
        </header>
      </div>

    
      <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => {setTabNum(key)}}/>

    </body>
  );
}
export default Watchlist;
