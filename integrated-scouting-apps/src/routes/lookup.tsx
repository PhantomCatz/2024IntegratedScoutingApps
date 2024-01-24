import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function DataLookup(props: any) {
    const [form] = Form.useForm();
    const [color, setColor] = useState(false);
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    useEffect(() => document.title = props.title, [props.title]);
    const eventname = process.env.REACT_APP_EVENTNAME;
    let teamNum = 0;


    function Search() {
        type FieldType = {
            teamNum?: number;
        };


        return (
            <div>
                <h2>Team Number</h2>
                <Form.Item<FieldType> name="teamNum" rules={[{ required: true }]}>
                    <InputNumber controls placeholder='Team' min={0} className="input" />
                </Form.Item>
            </div>
        );
    }
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
                onFinish={async event => {
                    let imageURI = "";
                    canvasRef.current?.exportImage('png').then(data => imageURI = data);
                    console.log(imageURI);
                    window.location.reload();
                }}
            >
                <Tabs defaultActiveKey="1" items={items} className='tabs' />
            </Form>
        </body>
    );

}

export default DataLookup;