import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function PitScout(props: any) {
  const [form] = Form.useForm();
  useEffect(() => document.title = props.title, [props.title]);

  type PitType = {
    initials?: string,
    matchnum?: number,
    teamnum?: number,

    num_battery?: number,
    num_charger?: number,
    pit_organization?: number,
    team_safety?: number,
    team_workmanship?: number,
    team_gp?: number,

    drivetrain?: string,
    num_wheels?: number,
    wheel_type?: string,
    motor_type?: string,
    num_gear?: number,
    drive_functional?: boolean,
    pos_mech_type?: string,
    pos_mech_functional?: boolean,
    score_mech_type?: string,
    score_mech_functional?: boolean,
    note_capable_speaker?: boolean,
    note_capable_amp?: boolean,
    preferred_shoot_loc?: string,
    note_intake_loc?: string,

    comments?: string,
  };
  function ScoutingInformation() {
    return (
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ textAlign: 'left', paddingLeft: 40 + '%' }}>Scouter Initials</h2>
        <Form.Item<PitType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='NK' maxLength={2} className='mainbutton' />
        </Form.Item>
        <Form.Item<PitType> name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber placeholder='Match #' min={1} className='mainbutton'/>
        </Form.Item>
        <Form.Item<PitType> name="teamnum" rules={[{ required: true, message: 'Please input the team number! (not 2637)' }]}>
          <InputNumber placeholder='Team #' min={1} max={9999} className='mainbutton'/>
        </Form.Item>
      </div>
    );
  }
  function TeamInformation() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result as string));
      reader.readAsDataURL(img);
    };
    const beforeUpload = (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
        });
      }
    };
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<PitType> label="# of Batteries" name="num_battery" rules={[{ required: true, message: 'Please input the number of batteries!' }]}>
              <InputNumber min={0} value={0}/>
            </Form.Item>
            <Form.Item<PitType> label="# of Chargers" name="num_charger" rules={[{ required: true, message: 'Please input the number of chargers!' }]}>
              <InputNumber min={0} value={0}/>
            </Form.Item>
            <Form.Item<PitType> label="Pit Organization" name="pit_organization" rules={[{ required: true, message: 'Please input the pit organization rating!' }]}>
              <InputNumber min={0} max={4} value={0}/>
            </Form.Item>
            <Form.Item<PitType> label="Team Safety" name="team_safety" rules={[{ required: true, message: 'Please input the team safety rating!' }]}>
              <InputNumber min={0} max={4} value={0}/>
            </Form.Item>
            <Form.Item<PitType> label="Team Workmanship" name="team_workmanship" rules={[{ required: true, message: 'Please input the team workmanship rating!' }]}>
              <InputNumber min={0} max={4} value={0}/>
            </Form.Item>
            <Form.Item<PitType> label="Team GP" name="team_gp" rules={[{ required: true, message: 'Please input the team GP rating!' }]}>
              <InputNumber min={0} max={4} value={0}/>
            </Form.Item>
          </Flex>
        </Flex>
        <TextArea placeholder='Comments' maxLength={100} className='textarea' showCount name='comments' />
        <Upload
          listType="picture-card"
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt='' style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Input type="submit" value="Submit" className='input'/>
      </div>
    );
  }
  function RobotInformation() {
    const drivetrain_type = [
      { label: "Swerve", value: "swerve" },
      { label: "Tank", value: "tank" },
      { label: "H-Drive", value: 'hdrive' },
      { label: "Other", value: 'other' },
    ];
    const wheel_type = [
      { label: "Nitrile/Neoprene/Plaction", value: "nitrile/neoprene/plaction" },
      { label: "HiGrip", value: "higrip" },
      { label: "Colson", value: 'colson' },
      { label: "Stealth/Smooth Grip", value: 'stealth/smooth' },
      { label: "Pneumatasic", value: 'pneumatasic' },
      { label: "Omni", value: 'omni' },
      { label: "Mechanum", value: 'mechanum' },
      { label: "Versa", value: 'versa' },
      { label: "Other", value: 'other' },
    ];
    const motor_type = [
      { label: "Falcon 500", value: "falcon500" },
      { label: "NEO", value: "neo" },
      { label: "CIM", value: 'cim' },
      { label: "Other", value: 'other' },
    ];
    const pos_mech_type = [
      { label: "Claw", value: "claw" },
      { label: "Roller", value: "roller" },
      { label: "None", value: 'none' },
      { label: "Other", value: 'other' },
    ];
    const score_mech_type = [
      { label: "Same as Pos Mech", value: "same"},
      { label: "Claw", value: "claw" },
      { label: "Roller", value: "roller" },
      { label: "Shooter", value: 'shooter' },
      { label: "None", value: 'none' },
      { label: "Other", value: 'other' },
    ];
    const preferred_shoot_loc = [
      { label: "Speaker", value: "speaker" },
      { label: "Amp", value: 'amp' },
      { label: "None", value: 'none' },
      { label: "Both", value: 'both' },
    ];
    const note_intake_loc = [
      { label: "Source", value: "source" },
      { label: "Ground", value: 'ground' },
      { label: "None", value: 'none' },
      { label: "Both", value: 'side' },
    ];
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<PitType> label="Drivetrain Type" name="drivetrain" rules={[{ required: true, message: 'Please input the drivetrain!' }]}>
              <Select className='input' options={drivetrain_type} />
            </Form.Item>
            <Form.Item<PitType> label="# of Wheels" name="num_wheels" rules={[{ required: true, message: 'Please input the number of wheels!' }]}>
              <InputNumber min={1}/>
            </Form.Item>
            <Form.Item<PitType> label="Wheel Type" name="wheel_type" rules={[{ required: true, message: 'Please input the wheel type!' }]}>
              <Select className='input' options={wheel_type} />
            </Form.Item>
            <Form.Item<PitType> label="Motor Type" name="motor_type" rules={[{ required: true, message: 'Please input the motor type!' }]}>
              <Select className='input' options={motor_type} />
            </Form.Item>
            <Form.Item<PitType> label="# of Gears" name="num_gear" rules={[{ required: true, message: 'Please input the number of gears!' }]}>
              <InputNumber min={1}/>
            </Form.Item>
            <Form.Item<PitType> label="Drive Functional" name="drive_functional" rules={[{ required: true, message: 'Please input if the drive is functional!' }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<PitType> label="Pos Mech Type" name="pos_mech_type" rules={[{ required: true, message: 'Please input the possession mechanism type!' }]}>
              <Select className='input' options={pos_mech_type} />
            </Form.Item>
          </Flex>
          <Flex vertical align='flex-start'>
            <Form.Item<PitType> label="Pos Mech Functional" name="pos_mech_functional" rules={[{ required: true, message: 'Please input if the posession mechanism is functional!' }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<PitType> label="Score Mech Type" name="score_mech_type" rules={[{ required: true, message: 'Please input the scoring mechanism type!' }]}>
              <Select className='input' options={score_mech_type} />
            </Form.Item>
            <Form.Item<PitType> label="Score Mech Functional" name="score_mech_functional" rules={[{ required: true, message: 'Please input if the scoring mechanism is functional!' }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<PitType> label="Speaker Capable" name="note_capable_speaker" rules={[{ required: true, message: 'Please input if the robot can score in the speaker!' }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<PitType> label="Amp Capable" name="note_capable_amp" rules={[{ required: true, message: 'Please input if the robot can score in the amp!' }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<PitType> label="Preferred Shooting Location" name="preferred_shoot_loc" rules={[{ required: true, message: 'Please input the preferred note location!' }]}>
              <Select className='input' options={preferred_shoot_loc} />
            </Form.Item>
            <Form.Item<PitType> label="Intake Location" name="note_intake_loc" rules={[{ required: true, message: 'Please input the intake location!' }]}>
              <Select className='input' options={note_intake_loc} />
            </Form.Item>
          </Flex>
        </Flex>
      </div>
    );
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Scouter Info',
      children: ScoutingInformation(),
    },
    {
      key: '2',
      label: 'Robot Info',
      children: RobotInformation(),
    },
    {
      key: '3',
      label: 'Team Info',
      children: TeamInformation(),
    }
  ];
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{ height: 64 + 'px' }} alt=''></img>
          <h1>Pit Scout</h1>
        </header>
      </div>
      <Form
        form={form}
        onFinish={async event => {
          try {
            //await setNewPitScout(event);
            window.location.reload();
          }
          catch (err) {
            console.log(err);
          }
        }}
        initialValues={{
          drive_functional: false,
          pos_mech_functional: false,
          score_mech_functional: false,
          note_capable_speaker: false,
          note_capable_amp: false,
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}

export default PitScout;
