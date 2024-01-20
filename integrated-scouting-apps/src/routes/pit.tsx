import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { Checkbox, Flex, Form, Input, InputNumber, Select, Tabs, TabsProps, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../public/stylesheets/style.css';
import no_image from '../public/images/no_image.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import { useRef} from 'react';
import {Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { type } from '@testing-library/user-event/dist/type';

function PitScout(props: any) {
  return(
    <body>
      <div>
        <header className='banner'>
          <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''></img>
          <table>
            <td>
              <img src={logo} style={{height: 256 + 'px'}} alt=''></img>
            </td>
            <td>
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Pit Scout</h1>
            </td>
          </table>
        </header>
      </div>
      
      {/* robot pictures */}
      <div style={{marginBottom:"13%"}}>
        <h1 className='body'>Robot Pictures</h1>
        <Button style={{float:'left'}} className='pitButton'>Upload</Button>
        <Button style={{float:'right'}}className='pitButton'>Upload</Button>
        <br></br>
        
      </div>

      {/* how many events */}
      <div>
        <h1 className='pitBody'>How many events have to competed in?</h1>
        <form>
          <label>
            <textarea className="pitInput" name="eventNum" rows={1}/>
          </label>
        </form>
      </div>

      {/* team # */}
      <div>
        <h1 className='pitBody'>Team #</h1>
        <form>
          <label>
            <textarea className="pitInput" name="eventNum" rows={1}/>
          </label>
        </form>
      </div>

      {/* drive train type */}
      <div>
        <h1 className='pitBody'>Drive Train Type</h1>
        <form>
          <label>
            <textarea className="pitInput" name="eventNum" rows={1}/>
          </label>
        </form>
      </div>

      {/* robot tuype */}
      <div>
        <h1 className='pitBody'>Robot Type</h1>
        <form>
          <label>
            <textarea className="pitInput" name="eventNum" rows={1}/>
          </label>
        </form>
      </div>

      {/* # of Motors and what type/*/}
      <div>
        <h1 className='pitBody'># of motors and what type?</h1>
        <form>
          <label>
            <textarea className="pitComment" name="eventNum" rows={3}/>
          </label>
        </form>
      </div>

      {/* intake capability/*/}
      <div>
        <h1 className='pitBody'>Intake capability</h1>
        <form>
          <label>
          <select className='pitInput'>
            <option value="fruit">Source</option>
            <option value="vegetable">Ground</option>
            <option value="meat">Both</option>
          </select>
          </label>
        </form>
      </div>

      {/* shooting capability/*/}
      <div>
        <h1 className='pitBody'>Intake capability</h1>
        <form>
          <label>
          <select className='pitInput'>
            <option value="fruit">Speaker</option>
            <option value="vegetable">Amp</option>
            <option value="meat">Both</option>
          </select>
          </label>
        </form>
      </div>

      



    </body>
  );
}

export default PitScout;
