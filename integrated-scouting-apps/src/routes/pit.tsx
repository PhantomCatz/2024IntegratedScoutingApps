import '../public/stylesheets/style.css';
import '../public/stylesheets/pit.css';
import '../public/stylesheets/match.css';
import field_blue from '../public/images/field_blue.png';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select } from 'antd';
import { useRef } from 'react';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import back from '../public/images/back.png';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import TextArea from 'antd/es/input/TextArea';

function PitScout(props: any) {
  const imageURI = useRef<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [form] = Form.useForm();
  const [cookies] = useCookies(['login', 'theme']);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    robot_events: 0,
    robot_weight: 0,
    robot_motor_counter: 0,
    robot_pit_organization: 0,
    robot_team_safety: 0,
    robot_team_workmanship: 0,
    robot_GP: 0,
  });
	useEffect(() => {document.title = props.title; return () => {}}, [props.title]);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  useEffect(() => {
    if ((document.getElementById("robot_events") as HTMLInputElement) !== null) {
      (document.getElementById("robot_events") as HTMLInputElement).value = formValue.robot_events.toString();
      form.setFieldValue('robot_events', formValue.robot_events);
    }
    if ((document.getElementById("robot_weight") as HTMLInputElement) !== null) {
      (document.getElementById("robot_weight") as HTMLInputElement).value = formValue.robot_weight.toString();
      form.setFieldValue('robot_weight', formValue.robot_weight);
    }
    if ((document.getElementById("robot_motor_counter") as HTMLInputElement) !== null) {
      (document.getElementById("robot_motor_counter") as HTMLInputElement).value = formValue.robot_motor_counter.toString();
      form.setFieldValue('robot_motor_counter', formValue.robot_motor_counter);
    }
    if ((document.getElementById("robot_pit_organization") as HTMLInputElement) !== null) {
      (document.getElementById("robot_pit_organization") as HTMLInputElement).value = formValue.robot_pit_organization.toString();
      form.setFieldValue('robot_pit_organization', formValue.robot_pit_organization);
    }
    if ((document.getElementById("robot_team_safety") as HTMLInputElement) !== null) {
      (document.getElementById("robot_team_safety") as HTMLInputElement).value = formValue.robot_team_safety.toString();
      form.setFieldValue('robot_team_safety', formValue.robot_team_safety);
    }
    if ((document.getElementById("robot_team_workmanship") as HTMLInputElement) !== null) {
      (document.getElementById("robot_team_workmanship") as HTMLInputElement).value = formValue.robot_team_workmanship.toString();
      form.setFieldValue('robot_team_workmanship', formValue.robot_team_workmanship);
    }
    if ((document.getElementById("robot_GP") as HTMLInputElement) !== null) {
      (document.getElementById("robot_GP") as HTMLInputElement).value = formValue.robot_GP.toString();
      form.setFieldValue('robot_GP', formValue.robot_GP);
    }
    return () => {};
  }, [formValue, form]);

  async function submitData(event: any) {
    const body = {
      "scouter_initial": event.scouter_initial,
      "robot_events": event.robot_events,
      "team_number": event.team_number,
      "robot_drive_train": event.robot_drive_train,
      "robot_weight": event.robot_weight,
      "robot_motor_type": event.robot_motor_type,
      "robot_motor_counter": event.robot_motor_counter,
      "robot_wheel_type": event.robot_wheel_type,
      "robot_intake_capability": event.robot_intake_capability,
      "robot_shooting_capability": event.robot_shooting_capability,
      "robot_ability_traversed_stage": event.robot_ability_traversed_stage,
      "robot_climbing_capabilities": event.robot_climbing_capabilities,
      "robot_trap_detail": event.robot_trap_detail,
      "robot_pit_organization": event.robot_pit_organization,
      "robot_team_safety": event.robot_team_safety,
      "robot_team_workmanship": event.robot_team_workmanship,
      "robot_GP": event.robot_GP,
      "robot_auton_path": imageURI.current,
      "robot_auton_path_detail": event.robot_auton_path_detail,
    }
    try {
      await fetch(process.env.REACT_APP_PIT_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(async (response) => await response.json()).then(async (data) => {
        window.alert(data.insertedId);
        saveAs(new Blob([JSON.stringify(body)], { type: "text/json" }), event.scouter_initial + event.team_number + ".json");
      });
    }
    catch (err) {
      console.log(err);
      window.alert("Error occured, please do not do leave this message and notify a Webdev member immediately.");
      window.alert(err);
    }
  };
  function Pit() {
    type FieldType = {
      scouter_initial: string;
      robot_events: number;
      team_number: number;
      robot_drive_train: string;
      robot_weight: number;
      robot_motor_type: string;
      robot_motor_counter: number,
      robot_wheel_type: string,
      robot_intake_capability: string;
      robot_shooting_capability: string;
      robot_ability_traversed_stage: boolean;
      robot_climbing_capabilities: string;
      robot_trap_detail: string,
      robot_pit_organization: number,
      robot_team_safety: number,
      robot_team_workmanship: number,
      robot_GP: number,
      robot_auton_path: string,
      robot_auton_path_detail: string;
    };
    const drive_train = [
      { label: "Tank", value: "tank" },
      { label: "Swerve", value: "swerve" },
      { label: "H-Drive", value: 'hdrive' },
      { label: "Other", value: 'other' },
    ];
    const motor_type = [
      { label: "Falcon 500", value: "falcon500" },
      { label: "Kraken", value: "kraken"},
      { label: "NEO", value: "neo" },
      { label: "CIM", value: 'cim' },
      { label: "Other", value: 'other' },
    ];
    const wheel_type = [
      { label: "Nitrile / Neoprene / Plaction", value: "nnp" },
      { label: "HiGrip", value: "hgrip" },
      { label: "Colson", value: 'colson' },
      { label: "Stealth / Smooth grip", value: 'ss' },
      { label: "Pneumatasic", value: 'pneumatasic' },
      { label: "Omni", value: 'omni' },
      { label: "Mechanum", value: 'mechanum' },
      { label: "Other", value: 'other' },
    ];
    const intakeCap = [
      { label: "Source", value: "source" },
      { label: "Ground", value: "ground" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const shootingCap = [
      { label: "Speaker", value: "speaker" },
      { label: "Amp", value: "amp" },
      { label: "Both", value: 'both' },
      { label: "None", value: 'none' },
    ];
    const climbingCap = [
      { label: "Solo Climb", value: "solo_climb" },
      { label: "Harmonize", value: "harmonize" },
      { label: "Triple Climb", value: 'triple_climb' },
      { label: "No Climb", value: "no_climb"}
    ];
    return (
      <div>
        <h2>Scouter Initials</h2>
        <Form.Item<FieldType> name="scouter_initial" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input maxLength={2} className="input" />
        </Form.Item> 
        <h2>Team #</h2>
        <Form.Item<FieldType> name="team_number" rules={[{ required: true, message: 'Please input the team number!' }]}>
          <InputNumber controls min={1} max={9999} className="input" />
        </Form.Item>
        <h2>Number of Events Competed</h2>
        <Form.Item<FieldType> name="robot_events" rules={[{ required: true, message: 'Please input the number of competed events!' }]}>
          <InputNumber
            controls
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_events: formValue.robot_events + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_events) > 0) {
                setFormValue({...formValue, robot_events: formValue.robot_events - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Drive Train Type</h2>
        <Form.Item<FieldType> name="robot_drive_train" rules={[{ required: true, message: 'Please input the drive train type!' }]}>
          <Select options={drive_train} className="input" />
        </Form.Item>
        <h2>Robot Weight</h2>
        <Form.Item<FieldType> name="robot_weight" rules={[{ required: true, message: 'Please input the robot weight in lbs!' }]}>
          <InputNumber
            controls 
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_weight: formValue.robot_weight + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_weight) > 0) {
                setFormValue({...formValue, robot_weight: formValue.robot_weight - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Motor Type</h2>
        <Form.Item<FieldType> name="robot_motor_type" rules={[{ required: true, message: 'Please input the motor type!' }]}>
          <Select options={motor_type} className="input" />
        </Form.Item>
        <h2># of Motors</h2>
        <Form.Item<FieldType> name="robot_motor_counter" rules={[{ required: true, message: 'Please input the number of motors!' }]}>
          <InputNumber
            controls 
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_motor_counter: formValue.robot_motor_counter + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_motor_counter) > 0) {
                setFormValue({...formValue, robot_motor_counter: formValue.robot_motor_counter - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Wheel Type</h2>
        <Form.Item<FieldType> name="robot_wheel_type" rules={[{ required: true, message: 'Please input the wheel type!' }]}>
          <Select placeholder="" options={wheel_type} className="input" />
        </Form.Item>
        <h2>Intake Capability</h2>
        <Form.Item<FieldType> name="robot_intake_capability" rules={[{ required: true, message: 'Please input the intake capability!' }]}>
          <Select options={intakeCap} className="input" />
        </Form.Item>
        <h2>Shooting Capability</h2>
        <Form.Item<FieldType> name="robot_shooting_capability" rules={[{ required: true, message: 'Please input the shooting capability!' }]}>
          <Select options={shootingCap} className="input" />
        </Form.Item>
        <h2>Under Stage</h2>
        <Form.Item<FieldType> valuePropName="checked" name="robot_ability_traversed_stage">
          <Checkbox className='input_checkbox' />
        </Form.Item>
        <h2>Climbing Capability</h2>
        <Form.Item<FieldType> name="robot_climbing_capabilities" rules={[{ required: true, message: 'Please input the climbing capability!' }]}>
          <Select options={climbingCap} className="input" />
        </Form.Item>
        <h2>Robot Trap</h2>
        <Form.Item<FieldType> name="robot_trap_detail">
          <TextArea style={{ verticalAlign: 'center' }} className='textbox_input' />
        </Form.Item>
        <h2>Auton Path</h2>
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={8}
          height='882px'
          strokeColor='#32a7dc'
          backgroundImage={field_blue}
          exportWithBackgroundImage
          svgStyle={{width: '882px', height: '882px'}}
          style={{ marginBottom: '5%' }}
        />
        <Flex justify='in-between' style={{marginBottom: '5%'}}>
          <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
          <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
          <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
        </Flex>
        <h2>Pit Organization</h2>
        <Form.Item<FieldType> name="robot_pit_organization" rules={[{ required: true, message: 'Please input the pit organization rating!' }]}>
          <InputNumber
            controls 
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_pit_organization: formValue.robot_pit_organization + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_pit_organization) > 0) {
                setFormValue({...formValue, robot_pit_organization: formValue.robot_pit_organization - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Team Safety</h2>
        <Form.Item<FieldType> name="robot_team_safety" rules={[{ required: true, message: 'Please input the team safety rating!' }]}>
          <InputNumber
            controls 
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_team_safety: formValue.robot_team_safety + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_team_safety) > 0) {
                setFormValue({...formValue, robot_team_safety: formValue.robot_team_safety - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Team Workmanship</h2>
        <Form.Item<FieldType> name="robot_team_workmanship" rules={[{ required: true, message: 'Please input the team workmanship rating!' }]}>
          <InputNumber
            controls 
            disabled
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_team_workmanship: formValue.robot_team_workmanship + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_team_workmanship) > 0) {
                setFormValue({...formValue, robot_team_workmanship: formValue.robot_team_workmanship - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2>Gracious Professionalism (0-4)</h2>
        <Form.Item<FieldType> name="robot_GP" rules={[{ required: true, message: 'Please input the GP rating!'}]}>
          <InputNumber
            controls
            disabled 
            min={0}
            max={4}
            className="input"
            addonAfter={<Button onClick={() => {
              setFormValue({...formValue, robot_GP: formValue.robot_GP + 1});
            }} className='incrementbutton'>+</Button>}
            addonBefore={<Button onClick={() => {
              if (Number(formValue.robot_GP) > 0) {
                setFormValue({...formValue, robot_GP: formValue.robot_GP - 1});
              }
            }} className='decrementbutton'>-</Button>}
          />
        </Form.Item>
        <h2 style={{display: loading ? 'inherit' : 'none'}}>Submitting data...</h2>
        <Input type="submit" value="Submit" className='submit' style={{marginBottom: '5%'}} onClick={async (event) => {await canvasRef.current?.exportImage('png').then((data) => {imageURI.current = data;})}} />
      </div>
    );
  }
  return (
    <div>
      <div className='banner'>
        <header>
          <a href='/scoutingapp'>
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>  
          </a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Pit Scout</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
      <Form 
        form={form}
        initialValues={{
          robot_ability_traversed_stage: false,
          robot_trap_detail: '',
        }}
        onFinish={async (event) => {
        try {
          setLoading(true);
          await submitData(event);
          const initials = form.getFieldValue("scouter_initial");
          form.resetFields();
          form.setFieldsValue({"scouter_initial": initials});
          setFormValue({
            robot_events: 0,
            robot_weight: 0,
            robot_motor_counter: 0,
            robot_pit_organization: 0,
            robot_team_safety: 0,
            robot_team_workmanship: 0,
            robot_GP: 0,
          });
        }
        catch (err) {
          console.log(err);
          window.alert("Error occured, please do not do leave this message and notify a Webdev member immediately.");
          window.alert(err);
        }
        finally {
          setLoading(false);
        }
        }}
      >
        {Pit()}
      </Form>
    </div>
  );
}
export default PitScout;
