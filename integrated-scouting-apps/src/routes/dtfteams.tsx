import '../public/stylesheets/dtf.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps, Checkbox, InputNumber, Input } from 'antd';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

let teamsArr  = new Array();
let graphsArr = new Array();

function DTFTeams(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  const { team_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);

  async function fetchData(team_number: number) {
    try {
      const response = await fetch(process.env.REACT_APP_DTF_URL + '?team_number=' + team_number); //process.env.REACT_APP_DTF_URL
      const data = await response.json();
      return data;
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };

  async function fetchGraph(team_number: number) {
    try {
        const response = await fetch('https://us-central1-team2637fixed.cloudfunctions.net/overallLineGraph?' + 'team_number=' + team_number);
        const svgContent = await response.text();

        // Create a temporary div to parse the SVG content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgContent;

        // Get the SVG element from the temporary div
        const svgElement = tempDiv.querySelector('svg');
        const nonNullSvgElement = svgElement!;
        const svgString = nonNullSvgElement.outerHTML;
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
        
       
        return svgDataUri;

    } catch (error) {
        console.error();
    }
  }; 

  let team1_number = '2637';//null protection
  let team2_number = '2637';//null protection
  let team3_number = '2637';//null protection

  if(team_number){
    const teams = team_number.split(',');

    team1_number = teams[0];
    
    if(teams[1]) {
      team2_number = teams[1];
    } else {
      team2_number = ' ';
    }

    if(teams[2]) {
      team3_number = teams[2];
    } else {
      team3_number = ' ';
    }

    teams.forEach(async (element) =>  {
      teamsArr.push(await fetchData(parseInt(element)));
      graphsArr.push(await fetchGraph(parseInt(element)));
      console.log(graphsArr);
      console.log(graphsArr[0]);
    }); 

    console.log(graphsArr[0])

  }

  if (typeof graphsArr[0] != "undefined") {
    console.log(graphsArr[0])
  }

  function Summary() {
    return (
      <div>
        <h2 className='h2' style={{textAlign:'center'}}>Allience Average Score</h2>
          <InputNumber disabled controls placeholder='team 1' min={1} className="input"/>
        <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
        <div style={{textAlign: 'center'}}>
          <h2 className='h2' style={{display: 'inline'}}>Team1</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '7%'}}>Team2</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '7%'}}>Team3</h2>
        </div>
        <div style={{textAlign: 'center'}}>
        <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px', marginLeft: '2%' }} alt=''/>
        <img src={logo} style={{ height: 256 + 'px', marginLeft: '2%' }} alt=''/>
        </div>
        

        <h2 className='h2' style={{textAlign: 'center'}}>Intake Source</h2>

        <div style={{textAlign: 'center'}}>
          <h2 className='h2' style={{display: 'inline'}}>Team1</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team2</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team3</h2>
        </div>

        <div>
          <h4 style={{display: 'inline', marginLeft: '1%', fontFamily: 'Figtree', color: 'white'}}>Ground | Source</h4>
          <h4 style={{display: 'inline', marginLeft: '6%', fontFamily: 'Figtree', color: 'white'}}>Ground | Source</h4>
          <h4 style={{display: 'inline', marginLeft: '6%', fontFamily: 'Figtree', color: 'white'}}>Ground | Source</h4>
        </div>

        <div style={{display: 'inline'}}>
        <Checkbox disabled className='checkboxRedFixed'/>
        <Checkbox disabled className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox disabled className='checkboxRedFixed'/>
        <Checkbox disabled className='checkboxRedFixed'/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox disabled className='checkboxRedFixed'/>
        <Checkbox disabled className='checkboxRedFixed'/>
        </div>
        <h2 className='h2' style={{textAlign: 'center'}}>Traversed Stage</h2>
        <div style={{textAlign: 'center'}}>
          <h2 className='h2' style={{display: 'inline'}}>Team1</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team2</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team3</h2>
        </div>
        <div style={{display: 'inline'}}>
        <Checkbox disabled className='checkboxRedFixed' style={{width: '30%'}}/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox disabled className='checkboxRedFixed' style={{width: '30%'}}/>
        </div>
        <div style={{display: 'inline', marginLeft: '4%'}}>
        <Checkbox disabled className='checkboxRedFixed' style={{width: '30%'}}/>
        </div>
        <h2 className='h2' style={{textAlign: 'center'}}>Driver Skill</h2>
        <div style={{textAlign: 'center'}}>
          <h2 className='h2' style={{display: 'inline'}}>Team1</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team2</h2> 
          <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>Team3</h2>
        </div>

        <div style={{display: 'inline'}}>
        <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber"/>
        <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{marginLeft: "4%"}}/>
        <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{marginLeft: "5%"}}/>
        </div>

        <h2 className='h2' style={{textAlign: 'center'}}>Graph</h2>
        <div style={{marginBottom: '10%'}}>
          <img src={'data:image/svg+xml,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20viewBox%3D%220%200%20400%20300%22%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22300%22%20x%3D%220%22%20y%3D%220%22%20id%3D%220%22%20fill%3D%22none%22%3E%3C%2Frect%3E%0A%3Cpath%20d%3D%22M40%20230.5L360%20230.5%22%20fill%3D%22none%22%20stroke%3D%22%23E0E6F1%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40%20187.5L360%20187.5%22%20fill%3D%22none%22%20stroke%3D%22%23E0E6F1%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40%20145.5L360%20145.5%22%20fill%3D%22none%22%20stroke%3D%22%23E0E6F1%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40%20102.5L360%20102.5%22%20fill%3D%22none%22%20stroke%3D%22%23E0E6F1%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40%2060.5L360%2060.5%22%20fill%3D%22none%22%20stroke%3D%22%23E0E6F1%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40%20230.5L360%20230.5%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M40.5%20230L40.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M104.5%20230L104.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M168.5%20230L168.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M232.5%20230L232.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M296.5%20230L296.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M360.5%20230L360.5%20235%22%20fill%3D%22none%22%20stroke%3D%22%236E7079%22%3E%3C%2Fpath%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22end%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20transform%3D%22translate(32%20230)%22%20fill%3D%22%236E7079%22%3E0%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22end%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20transform%3D%22translate(32%20187.5)%22%20fill%3D%22%236E7079%22%3E20%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22end%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20transform%3D%22translate(32%20145)%22%20fill%3D%22%236E7079%22%3E40%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22end%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20transform%3D%22translate(32%20102.5)%22%20fill%3D%22%236E7079%22%3E60%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22end%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20transform%3D%22translate(32%2060)%22%20fill%3D%22%236E7079%22%3E80%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20y%3D%226%22%20transform%3D%22translate(72%20238)%22%20fill%3D%22%236E7079%22%3E8%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20y%3D%226%22%20transform%3D%22translate(136%20238)%22%20fill%3D%22%236E7079%22%3E8%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20y%3D%226%22%20transform%3D%22translate(200%20238)%22%20fill%3D%22%236E7079%22%3E8%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20y%3D%226%22%20transform%3D%22translate(264%20238)%22%20fill%3D%22%236E7079%22%3E8%3C%2Ftext%3E%0A%3Ctext%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20style%3D%22font-size%3A12px%3Bfont-family%3Asans-serif%3B%22%20y%3D%226%22%20transform%3D%22translate(328%20238)%22%20fill%3D%22%236E7079%22%3E8%3C%2Ftext%3E%0A%3Cg%20clip-path%3D%22url(%23zr27-c0)%22%3E%0A%3Cpath%20d%3D%22M72%2060C72%2060%20104%2060%20136%2060C168%2060%20168%2060%20200%2060C232%2060%20232%2060%20264%2060C296%2060%20328%2060%20328%2060%22%20fill%3D%22none%22%20stroke%3D%22%235470c6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22bevel%22%3E%3C%2Fpath%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M1%200A1%201%200%201%201%201%20-0.1A1%201%200%200%201%201%200%22%20transform%3D%22matrix(2%2C0%2C0%2C2%2C72%2C60)%22%20fill%3D%22%23fff%22%20stroke%3D%22%235470c6%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M1%200A1%201%200%201%201%201%20-0.1A1%201%200%200%201%201%200%22%20transform%3D%22matrix(2%2C0%2C0%2C2%2C136%2C60)%22%20fill%3D%22%23fff%22%20stroke%3D%22%235470c6%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M1%200A1%201%200%201%201%201%20-0.1A1%201%200%200%201%201%200%22%20transform%3D%22matrix(2%2C0%2C0%2C2%2C200%2C60)%22%20fill%3D%22%23fff%22%20stroke%3D%22%235470c6%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M1%200A1%201%200%201%201%201%20-0.1A1%201%200%200%201%201%200%22%20transform%3D%22matrix(2%2C0%2C0%2C2%2C264%2C60)%22%20fill%3D%22%23fff%22%20stroke%3D%22%235470c6%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M1%200A1%201%200%201%201%201%20-0.1A1%201%200%200%201%201%200%22%20transform%3D%22matrix(2%2C0%2C0%2C2%2C328%2C60)%22%20fill%3D%22%23fff%22%20stroke%3D%22%235470c6%22%3E%3C%2Fpath%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22zr27-c0%22%3E%0A%3Cpath%20d%3D%22M39%2059l322%200l0%20172l-322%200Z%22%20fill%3D%22%23000%22%20class%3D%22zr27-cls-0%22%3E%3C%2Fpath%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3Cstyle%3E%0A.zr27-cls-0%20%7B%0Aanimation%3Azr27-ani-0%201s%20linear%20both%3B%0A%7D%0A%40keyframes%20zr27-ani-0%20%7B%0A0%25%20%7B%0Ad%3Apath(%22M39%2059l0%200l0%20172l0%200Z%22)%3B%0A%7D%0A100%25%20%7B%0Ad%3Apath(%22M39%2059l322%200l0%20172l-322%200Z%22)%3B%0A%7D%0A%7D%0A%0A%0A%3C%2Fstyle%3E%0A%3C%2Fsvg%3E'} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
        </div>
        
      </div>
    );
  }

  

  function Team1() {

    if(team1_number == ' ') {
      return (
        <div>
          <h2>tOwOt</h2>
        </div>
      );
    }

    if (typeof teamsArr[0] != "undefined") {
      return (
        <div>
          
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> {/* don't touch width value...it's calculated */}
            <h2 className='h2' style={{textAlign: 'center'}}>Autonomous</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1> 
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].auto.auto_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Auton Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[0].auto.auto_speaker_avg + ' : ' + teamsArr[0].auto.auto_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot Starting Position</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline', marginLeft: '2%'}}>LEFT</h2>   {/* don't touch these values */}
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>MIDDLE</h2> 
                <h2 className='h2' style={{display: 'inline', marginLeft: '9%'}}>RIGHT</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '7%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '12%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={logo} style={{ height: 100 + '%', marginLeft: 'auto', marginRight: 'auto', width: 100 + '%'}} alt=''/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Teleop</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[0].teleop.teleop_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Teleop Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[0].teleop.teleop_speaker_avg + ' : ' + teamsArr[0].teleop.teleop_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Endgame</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio (Speaker : Amp)</h1>
            <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Score</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline'}}>Ground</h2>
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>Source</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '24%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
          </div>

        </div>
      );
    }
  }

  function Team2() {

    if(team2_number == ' ') {
      return (
        <div>
          <h2>tOwOt</h2>
        </div>
      );
    }

    if (typeof teamsArr[1] != "undefined") {
      return (
        <div>
          
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> {/* don't touch width value...it's calculated */}
            <h2 className='h2' style={{textAlign: 'center'}}>Autonomous</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1> 
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].auto.auto_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Auton Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[1].auto.auto_speaker_avg + ' : ' + teamsArr[1].auto.auto_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot Starting Position</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline', marginLeft: '2%'}}>LEFT</h2>   {/* don't touch these values */}
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>MIDDLE</h2> 
                <h2 className='h2' style={{display: 'inline', marginLeft: '9%'}}>RIGHT</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '7%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '12%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={logo} style={{ height: 100 + '%', marginLeft: 'auto', marginRight: 'auto', width: 100 + '%'}} alt=''/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Teleop</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[1].teleop.teleop_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Teleop Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[1].teleop.teleop_speaker_avg + ' : ' + teamsArr[1].teleop.teleop_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Endgame</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio (Speaker : Amp)</h1>
            <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Score</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline'}}>Ground</h2>
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>Source</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '24%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
          </div>

        </div>
      );
    }
  }

  function Team3() {

    if(team3_number == ' ') {
      return (
        <div>
          <h2>tOwOt</h2>
        </div>
      );
    }

    if (typeof teamsArr[2] != "undefined") {
      return (
        <div>
          
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> {/* don't touch width value...it's calculated */}
            <h2 className='h2' style={{textAlign: 'center'}}>Autonomous</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1> 
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Auton Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].auto.auto_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Auton Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[2].auto.auto_speaker_avg + ' : ' + teamsArr[2].auto.auto_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot Starting Position</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline', marginLeft: '2%'}}>LEFT</h2>   {/* don't touch these values */}
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>MIDDLE</h2> 
                <h2 className='h2' style={{display: 'inline', marginLeft: '9%'}}>RIGHT</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '7%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '12%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={logo} style={{ height: 100 + '%', marginLeft: 'auto', marginRight: 'auto', width: 100 + '%'}} alt=''/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Teleop</h2>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Speaker</h2>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
            <h2 className='h2' style={{textAlign: 'center'}}>Amp</h2>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_speaker_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Average Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_amps_avg} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_speaker_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Peak Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_amps_peak} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_speaker_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
            <div style={{border: 'solid', width: '50%', height: '100%', borderColor: 'white'}}>
              <h1 className='h1' style={{textAlign: 'center'}}>Teleop Lowest Score</h1>
              <InputNumber disabled defaultValue={teamsArr[2].teleop.teleop_amps_min} controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '80%', marginLeft: '10%', marginBottom: '3%'}}/>
            </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Teleop Scoring Ratio (Speaker : Amp)</h1>
            <Input disabled defaultValue={teamsArr[2].teleop.teleop_speaker_avg + ' : ' + teamsArr[2].teleop.teleop_amps_avg  } placeholder='team 1' className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Endgame</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio (Speaker : Amp)</h1>
            <InputNumber disabled controls placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Score</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <div style={{textAlign: 'center'}}>
                <h2 className='h2' style={{display: 'inline'}}>Ground</h2>
                <h2 className='h2' style={{display: 'inline', marginLeft: '10%'}}>Source</h2>
              </div>
              <div>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '24%'}}/>
                <Checkbox disabled className='checkboxRedFixed' style={{width: '20%', marginLeft: '13%'}}/>
              </div>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
          </div>

        </div>
      );
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Summary',
      children: Summary(),
    },
    {
      key: '2',
      label: team1_number,
      children: Team1(),
    },
    {
      key: '3',
      label: team2_number,
      children: Team2(),
    },
    {
      key: '4',
      label: team3_number,
      children: Team3(),
    },
  ];
  return (
    <body className='body'>
      <div className='banner'>
        <header>
          <a href='/dtf'>
            <img src={back} style={{height: 64 + 'px', paddingTop: '5%'}} alt=''/>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt=''/>
            </td>
            <td>
              <h1 className='h1' style={{display: 'inline-block', textAlign: 'center'}}>Team {team_number}</h1>
            </td>
          </table>
        </header>
      </div>
      <Tabs defaultActiveKey="1" items={items} className='tabs' />
    </body>
  );
}

export default DTFTeams;