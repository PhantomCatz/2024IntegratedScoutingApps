import '../public/stylesheets/style.css';
import '../public/stylesheets/pit.css';
import '../public/stylesheets/match.css';
import field_blue from '../public/images/field_blue.png';
import logo from '../public/images/logo.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useRef } from 'react';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import back from '../public/images/back.png';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';


function pitLookup(props: any){


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
                        <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Pit Scout Lookup</h1>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </header>
            </div>
        </div>
        );

}
export default pitLookup;