import '../public/stylesheets/style.css';
import '../public/stylesheets/watchlist.css';
import '../public/stylesheets/match.css';
import logo from '../public/images/logo.png';
import { Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Table} from 'antd';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import back from '../public/images/back.png';
import { useCookies } from 'react-cookie';
import VerifyLogin from '../verifyToken';

function WatchlistUpdate(props: any) {

  type FieldType = {
    team_number: number;
    question: string;
    answer: string;
    isPit: boolean;
  };
  
  console.log(useParams());
  const { question_info } = useParams();
  let team_number: number = 10000;
  let question: string = 'tOwOt';
  let question_type: boolean = true;
  let index:number = 0;

  if(question_info) {
    let q = question_info.split('&');
    console.log(q)
    team_number = parseInt(q[0]);
    question = q[1] as string;

    question_type = true;
    if(q[2].toUpperCase() === 'STRATEGIC') {
      question_type = false;
    }

    index = parseInt(q[3]);

    console.log(team_number, question, question_type, index)
  }

  const [tabNum, setTabNum] = useState("1");
  useEffect(() => {document.title = props.title}, [props.title]);

  const [cookies] = useCookies(['login', 'theme']);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); }, []);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  const handleSubmit = async function watchListUpdate(answer: string) {
    let requestBody = {
          team_number: team_number,
          [`custom${index}`]: {
            question: question,
            answer: answer,
            isPit: question_type,
          },
        }; 

    console.log(requestBody)
    
    try {
      const response = await fetch(process.env.REACT_APP_WATCHLIST_SEND_URL as string, {
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



  function update(){
    type FieldType = {
      team_number?: number, //name not specified
      question?: string,
      answer: string,
      isPit?: boolean,
    };

    const appOptions = [
      { label: "Pit", value: true },
      { label: "Strategic", value: false },
    ];
    return (
      <div>
        <div>
          <h1 className='pitBody'>Team #</h1>
          <Form<FieldType> onFinish={async values => {
            try{
              console.log(values.answer, 'OwO');
              await handleSubmit(values.answer);
              window.location.replace('/watchlist/' + team_number as string);
            }
            catch (err){
              console.log(err);
            }
          }}>
          {/* <Form<FieldType> onFinish={handleSubmit}> */}
          <Form.Item<FieldType> name="team_number">
              <InputNumber disabled={true} defaultValue={team_number} controls min={0} className="pitinput" />
            </Form.Item>
            <h1 className='pitBody'>Pit/Strategic</h1>
            <Form.Item<FieldType> name="isPit">
              <Select disabled={true} defaultValue={question_type ? 'Pit' : 'Strategic'} options={appOptions} className="input" />
            </Form.Item>
            <div>
              <h1 style={{ marginTop: "10%" }} className='pitBody'>{question}<br/>Answer:</h1>
              <Form.Item<FieldType> name="answer" rules={[{ required: true, message: 'Please input.' }]}>
                <label>
                  <textarea className="pitComment" name="eventNum" rows={3} />
                </label>
              </Form.Item>
              <Flex justify='in-between' style={{ paddingBottom: '10%' }}>
                <Input type="submit" value="Submit" className='submit'/>
              </Flex>
            </div>
            
          </Form>
        </div>
      </div>
    );
  }



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Update',
      children: update(),
    },
];
  
  
  return(
    <div>
      <div>
        <header className='banner'>
          <a href={'/watchlist/' + team_number as string}><img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img></a>          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h2 style={{ whiteSpace: 'pre-line' }}>{'Team ' + team_number}</h2>
            </td>
          </table>
        </header>
      </div>
      <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} className='tabs' centered onChange={async (key) => {setTabNum(key)}}/>
    </div>
  );
}
export default WatchlistUpdate;