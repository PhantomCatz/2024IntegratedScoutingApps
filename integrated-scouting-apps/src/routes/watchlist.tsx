import '../public/stylesheets/style.css';
import '../public/stylesheets/watchlist.css';
import '../public/stylesheets/match.css';
import logo from '../public/images/logo.png';
import { Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Table} from 'antd';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import back from '../public/images/back.png';
import { useCookies } from 'react-cookie';
import VerifyLogin from '../verifyToken';

function Watchlist(props: any) {

  type FieldType = {
    team_number: number;
    question: string;
    answer?: string;
    isPit: boolean;
  };

  const [tabNum, setTabNum] = useState("1");
  useEffect(() => {document.title = props.title}, [props.title]);

  const [cookies] = useCookies(['login', 'theme']);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); }, []);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  const handleSubmit = async function watchListUpdate(values: FieldType) {
    const requestBody = {
      team_number: values.team_number,
      custom0: {
        question: values.question,
        answer: values.answer,
        isPit: values.isPit,
      },
    }; 
    
    console.log("Team Number:", requestBody.team_number);
    console.log("Custom Question:", requestBody.custom0.question);
    console.log("Custom Answer:", requestBody.custom0.answer);
    console.log("Question Type:", requestBody.custom0.isPit);
    
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



  function input(){
    type FieldType = {
      team_number: number, //name not specified
      question: string,
      answer?: string,
      isPit: boolean,
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
              console.log(values, 'OwO');
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
            <h1 className='pitBody'>Pit/Strategic</h1>
            <Form.Item<FieldType> name="isPit" rules={[{ required: true, message: 'Please input.' }]}>
              <Select placeholder='Match' options={appOptions} className="input" />
            </Form.Item>
            <div>
              <h1 style={{ marginTop: "10%" }} className='pitBody'>Custom Question</h1>
              <Form.Item<FieldType> name="question">
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

  function watchListDisplay(){
    type FieldType = {
      team_number: number,
    };
    return (
      <div>
        <div>
          <h1 className='pitBody'>Team #</h1>
          <Form
            onFinish={async values => {
              window.location.href = "/watchlist/" + values.team_number;
            }}
          >
            <Form.Item<FieldType> name="team_number">
              <InputNumber controls min={0} className="input" required={true}/>
            </Form.Item>
            <div>
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
      label: 'Input',
      children: input(),
    },
    {
      key: '2',
      label: 'Get',
      children: watchListDisplay(),
    }
];
  
  
  return(
    <div>
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
    </div>
  );
}
export default Watchlist;

// import '../public/stylesheets/dtf.css';
// import logo from '../public/images/logo.png';
// import back from '../public/images/back.png';
// import { useEffect } from 'react';
// import { Input, Form, InputNumber } from 'antd';
// import VerifyLogin from '../verifyToken';
// import { useCookies } from 'react-cookie';
// function Watchlist(props: any) {
// 	const [form] = Form.useForm();
// 	useEffect(() => {document.title = props.title; return () => {}}, [props.title]);
// 	const [cookies] = useCookies(['login', 'theme']);
// 	useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
//   useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);

// 	return (
// 		<div>
// 			<meta name="viewport" content="maximum-scale=1.0" />
// 			<div className='banner'>
// 				<header>
// 					<a href='/home'>
// 						<img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
// 					</a>
// 					<table>
// 						<tbody>
// 							<tr>
// 								<td>
// 									<img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
// 								</td>
// 								<td>
// 									<h1 style={{ display: 'inline-block', textAlign: 'center' }}>Drive Team Feeder</h1>
// 								</td>
// 							</tr>

// 						</tbody>

// 					</table>
// 				</header>
// 			</div>
// 			<Form
// 				form={form}
// 				onFinish={async event => {
// 					const teamNums = [event.team1Num, event.team2Num, event.team3Num].filter(num => num !== undefined);
// 					window.location.href = "/dtf/" + teamNums.join(",");
// 				}}
// 			>
// 				<div>
// 					<h2>Team 1 Number</h2>
// 					<Form.Item name="team1Num" rules={[{ required: true, message: "Please input the team number!" }]}>
// 						<InputNumber min={0} className="input" />
// 					</Form.Item>
// 					<h2>Team 2 Number</h2>
// 					<Form.Item name="team2Num">
// 						<InputNumber min={0} className="input" />
// 					</Form.Item>
// 					<h2>Team 3 Number</h2>
// 					<Form.Item name="team3Num">
// 						<InputNumber min={0} className="input" />
// 					</Form.Item>
// 					<Input type="submit" value="Submit" className='submit' />
// 				</div>
// 			</Form>
// 		</div>
// 	);
// }

// export default Watchlist;