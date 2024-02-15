import '../public/stylesheets/login.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useParams } from 'react-router-dom';

function LoginPage(props: any) {
	const { msg } = useParams();
	useEffect(() => document.title = props.title, [props.title]);
	type FieldType = {
		username: string,
		password: string,
	};
	return (
	<div>
		<div className='banner'>
      <meta name="viewport" content="user-scalable=no" />
			<header>
				<a href='/scoutingapp'>
					<img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''/>
				</a>
				<table>
					<td>
						<img src={logo} style={{ height: 256 + 'px' }} alt=''/>
					</td>
					<td>
						<h1 style={{display: 'inline-block', textAlign: 'center'}}>Login</h1>
					</td>
				</table>
			</header>
    </div>
		<Form onFinish={async (event) => {
			try {
				await fetch((process.env.REACT_APP_LOGIN_URL as string) + "?user_name=" + event.username + "&password=" + event.password, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					}
				}).then(response => response.json()).then(data => {
					let response = data;
					console.log(response);
					if (response.toString() === "true") {
						window.location.href = "/scoutingapp";
					}
					else if (response.gay === "lisaGay") {
						window.location.href = "/Incorrect%20Login";
					}
					else {
						window.location.href = "/Fatal%20Error";
					}
				});				
			}
			catch (err) {
				console.log(err);
			}
		}}>
			<h2>{msg}</h2>
			<h2>Username</h2>
			<Form.Item<FieldType> name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input minLength={5} className='input' />
			</Form.Item>
			<h2>Password</h2>
			<Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
				<Input.Password minLength={5} className='input' />
			</Form.Item>
			<Input type="submit" value="Submit" className='submit'/>
		</Form>
	</div>
);
};

export default LoginPage;