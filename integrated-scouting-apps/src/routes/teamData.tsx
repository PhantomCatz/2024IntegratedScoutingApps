import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import type { TabsProps } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';


function TeamData(props: any) {
  // const [params] = useSearchParams();
  
  //  const params = useParams();
    
   const { team_number } = useParams();
   console.log(team_number);
   const [form] = Form.useForm();
  // console.log(team_number);
//    const team_number = params.team_number;
   useEffect(() => document.title = props.title, [props.title]);
   const eventname = process.env.REACT_APP_EVENTNAME;
   
    async function handleChange(team_number: number) {
        try {
          await fetch(process.env.REACT_APP_FIREBASE_URL as string + "?team_number=" + team_number).then(response => response.json()).then(data => console.log(data));
        }
        catch (err) {
          console.log(err);
        }
      };
      
      function Search() {
        return (
          <div>
            
           
          </div>
        );
      }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: team_number,
            children: Search()

        }
    ];
    return (
        <body>
            <div className='banner'>
                <header>
                    <img src={no_image} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
                    <table>
                        <td>
                            <a href="/scoutingapp">
                                <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
                            </a>
                        </td>
                        <td>
                            <h1 style={{ display: 'inline-block', textAlign: 'center' }}>{team_number}</h1>
                        </td>
                    </table>
                </header>
            </div>
            <Form
                form={form}
                onFinish={async (values: { teamNum: any }) => {
                    const { teamNum } = values;
                    console.log("team Number:", teamNum);
                    console.log("Firebase URL:", process.env.REACT_APP_FIREBASE_URL);
                    console.log("event:", eventname);
                   
                    await handleChange(teamNum);
                    // form.resetFields(); 
                    //window.location.href = '/scoutingapp/lookup/teamData';
                }}
                >
                <Tabs defaultActiveKey="1" items={items} className='tabs' />
            </Form>
            
        </body>
    );
}
export default TeamData;