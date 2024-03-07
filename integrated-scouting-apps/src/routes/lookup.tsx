import '../public/stylesheets/style.css';
import '../public/stylesheets/lookup.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect } from 'react';
import { Input, Form, InputNumber } from 'antd';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';

function DataLookup(props: any) {
	const [form] = Form.useForm();
	useEffect(() => {document.title = props.title; return () => {}}, [props.title]);
	const [cookies] = useCookies(['login']);
	useEffect(() => { VerifyLogin(cookies.login); return () => {}}, [cookies.login]);


	return (
		<div>
			<meta name="viewport" content="maximum-scale=1.0" />
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
									<h1 style={{ display: 'inline-block', textAlign: 'center' }}>Data Lookup</h1>
								</td>
							</tr>
						</tbody>
					</table>
				</header>
			</div>
			<Form
				form={form}
				onFinish={async event => {
					window.location.href = "/scoutingapp/lookup/teamData/" + event.teamNum;
				}}
			>
				<div>
					<h2>Team Number</h2>
					<Form.Item name="teamNum" rules={[{ required: true, message: "Please input the team number!" }]}>
						<InputNumber min={0} className="input" />
					</Form.Item>
					<Input type="submit" value="Submit" className='submit' />
				</div>
			</Form>
		</div>
	);
}

export default DataLookup;