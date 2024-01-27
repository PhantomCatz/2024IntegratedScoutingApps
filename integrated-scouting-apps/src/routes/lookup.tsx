import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import type { TabsProps } from 'antd';



function DataLookup(props: any) {
    const [form] = Form.useForm();
    useEffect(() => document.title = props.title, [props.title]);
    
    const eventname = process.env.REACT_APP_EVENTNAME;
   
   // let teamNum = '0';
   const [teamNum, setTeamNum] = useState(0);
  
   
    async function handleChange(teamNum: number) {
        const body = {
         
            "team_number": teamNum,
            "match_event": eventname,
        };
        try {
          await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Access-Control-Request-Headers": "Content-Type, Origin",
              "Content-Type": "application/json",
              "Origin": "localhost:3000",
              "Database": "MatchScouting"
            }
          }).then(response => response.json()).then(data => console.log(data));
        }
        catch (err) {
          console.log(err);
        }
      };
      
      function Search() {
        return (
          <div>
            <h2>Team Number</h2>
            <Form.Item name="teamNum" rules={[{ required: true }]}>
            <InputNumber
                controls
                placeholder='Team'
                min={0}
                className="lookupInput"
                onChange={(value) => setTeamNum(value ?? 0)}
                />
            </Form.Item>
            <Input type="submit" value="Submit" className='submitLookupButton' name='submitButton'/>
          </div>
        );
      }
    // function Search() {
    //     type FieldType = {
    //         //teamNum?: number;
    //         teamNum? : number;
    //     };


    //     return (
    //         <div>
    //             <h2>Team Number</h2>
    //             <Form.Item<FieldType> name="teamNum" rules={[{ required: true }]}>
    //                 <InputNumber controls placeholder='Team' min={0} className="lookupInput" />
    //             </Form.Item>
    //             <Input type="submit" value="Submit" className='submitLookupButton' name='submitButton'/>
    //         </div>
    //     );
    // }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Input',
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
                            <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Data Lookup</h1>
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
                    form.resetFields(); // Optionally reset form fields after submission
                }}
                >
                <Tabs defaultActiveKey="1" items={items} className='tabs' />
            </Form>

             {/* <Form
                form={form}
                onFinish={async event => {
                console.log(event.teamNum);
                await handleChange(event.teamNum);
               // window.location.reload();
        }}
      >
        <Tabs defaultActiveKey="1" items={items} className='tabs' />
      </Form> */}
            
        </body>
    );

}

export default DataLookup;