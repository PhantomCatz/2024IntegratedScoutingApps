import '../public/stylesheets/lookup.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect } from 'react';
import { Input, Form, InputNumber } from 'antd';

function DTF(props: any) {
	const [form] = Form.useForm();
	useEffect(() => document.title = props.title, [props.title]);

	return (
		<body>
			<div className='banner'>
				<header>
					<a href='/'>
						<img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
					</a>
					<table>
						<td>
							<img src={logo} style={{ height: 256 + 'px' }} alt=''></img>
						</td>
						<td>
							<h1 style={{ display: 'inline-block', textAlign: 'center' }}>Drive Team Feeder</h1>
						</td>
					</table>
				</header>
			</div>
			<Form
				form={form}
				onFinish={async event => {
          const teamNums = [event.team1Num, event.team2Num, event.team3Num].filter(num => num !== undefined);
          window.location.href = "/scoutingapp/dtf/teamData/" + teamNums.join(",");
				}}
			>
				<div>
					<h2>Team 1 Number</h2>
					<Form.Item name="team1Num" rules={[{ required: true, message: "Please input the team number!"}]}>
						<InputNumber min={0} className="input" />
					</Form.Item>
          <h2>Team 2 Number</h2>
          <Form.Item name="team2Num">
						<InputNumber min={0} className="input" />
					</Form.Item>
          <h2>Team 3 Number</h2>
          <Form.Item name="team3Num">
						<InputNumber min={0} className="input" />
					</Form.Item>
					<Input type="submit" value="Submit" className='submit'/>
				</div>
			</Form>
		</body>
	);
}

export default DTF;