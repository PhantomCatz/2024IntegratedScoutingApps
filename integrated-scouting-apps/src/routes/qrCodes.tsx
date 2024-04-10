import '../public/stylesheets/style.css';
import { Form, Input, QRCode } from "antd";
import { Space } from "antd-mobile";
import React, { useEffect, useState } from 'react';
import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import MatchScout from "./match";
import { useLocation } from 'react-router-dom';

function QRCodes(props: any) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const qrCodeData = queryParams.get('qrCodeData');
    const [text, setText] = useState("");
    const [cookies] = useCookies(['login', 'theme']);
    useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
    useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
    useEffect(() => {document.title = props.title}, [props.title]);

    useEffect(() => {
        const qrCodeData = localStorage.getItem('qrCodeData');
        if (qrCodeData) {
          const parsedData = JSON.parse(qrCodeData);
          setText(JSON.stringify(parsedData));
        } else {
          console.error("QR Code data not found in localStorage");
        }
        localStorage.removeItem('qrCodeData');
      }, []);

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
                                        <h1 style={{ display: 'inline-block', textAlign: 'center' }}>QR Code</h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </header>
                </div>
            
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <Space direction="vertical" align="center" justify="center">
                            <QRCode 
                                value={text} 
                                size={900} 
                                color="#FFFFFF"
                                type="svg"
                            />
                    </Space>
                </div>
        </div>
    );
}

export default QRCodes;
