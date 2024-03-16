
import '../public/stylesheets/dtf.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useState, useEffect } from 'react';
import { Tabs, TabsProps, Checkbox, InputNumber, Input } from 'antd';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';

let teamsArr  = new Array();
let graphsArr = new Array();
let Length_Teams : any;

let team1_number = '10000';//null protection
let team2_number = '10000';//null protection
let team3_number = '10000';//null protection

function DTFTeams(props: any) {
  //useEffect(() => document.title = props.title, [props.title]);
  const { team_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<any>([]);
  const [fetchedGraph, setFetchedGraph] = useState<any>([]);
  const [cookies] = useCookies(['login', 'theme']);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);

  

  async function fetchData(team_number: number) {
    try {
      const response = await fetch('https://us-central1-team2637fixed.cloudfunctions.net/testingDTF' + '?team_number=' + team_number); //process.env.REACT_APP_DTF_URL
      const data = await response.json();

      let teamsArr_temp = new Array();
      teamsArr_temp = [...fetchedData]
      teamsArr_temp.push(data)
      setFetchedData(teamsArr_temp);
      return [team_number, data];
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
        
        let graphsArr_temp = new Array();
        graphsArr_temp = [...fetchedGraph]
        graphsArr_temp.push(svgDataUri)
        setFetchedGraph(graphsArr_temp);
        return [team_number, svgDataUri];

    } catch (error) {
        console.error();
    }
  }; 

  useEffect(() => {

  if(team_number){
    const teams = team_number.split(',');
    Length_Teams = teams.length;

    console.log(teams);

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

    let teams_temp = new Array();
    let graph_temp = new Array();

    teams.forEach(async (element) =>  {
      console.log(element);

      teams_temp.push(await fetchData(parseInt(element)));
      graph_temp.push(await fetchGraph(parseInt(element)));
      console.log(teams_temp);
      console.log(graph_temp);

      let teams_temp2: any;
      let graph_temp2: any;

      teams_temp2 = teams_temp.pop();
      graph_temp2 = graph_temp.pop();

      if (team1_number == teams_temp2[0]) {
        teamsArr[0] = teams_temp2[1];
      }

      if (team2_number == teams_temp2[0]) {
        teamsArr[1] = teams_temp2[1];
      }

      if (team3_number == teams_temp2[0]) {
        teamsArr[2] = teams_temp2[1];
      }

      if (team1_number == graph_temp2[0]) {
        graphsArr[0] = graph_temp2[1];
      }

      if (team2_number == graph_temp2[0]) {
        graphsArr[1] = graph_temp2[1];
      }

      if (team3_number == graph_temp2[0]) {
        graphsArr[2] = graph_temp2[1];
      }

      
      console.log(teamsArr);
      console.log(graphsArr);
/*
      teamsArr.push(await fetchData(parseInt(element)));
      graphsArr.push(await fetchGraph(parseInt(element)));
      console.log(teamsArr);
      console.log(graphsArr);
*/
    });
    
  }
}, []);

  //const stringFetchedData0 : string = String(fetchedData[0])
  //const stringFetchedData1 : string = String(fetchedData[1])
  //const stringFetchedData2 : string = String(fetchedData[2])

  function Summary() {

    //console.log(teamsArr);
    //console.log(graphsArr);
    //console.log(fetchedData);
    //console.log(fetchedGraph);

    


    if (Length_Teams == 3 && typeof teamsArr[0] != 'undefined' && typeof graphsArr[0] != 'undefined' && typeof teamsArr[1] != 'undefined' && typeof graphsArr[1] != 'undefined' && typeof teamsArr[2] != 'undefined' && typeof graphsArr[2] != 'undefined') {

      return (
        <div>
          <h2 className='h2' style={{textAlign:'center'}}>Allience Average Score</h2>
          <InputNumber disabled defaultValue={teamsArr[0].OA.alliance_avg_score} controls placeholder='team 1' min={1} className="input"/>
          <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
          <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
          <div style={{textAlign: 'center'}}>
            <h2 className='h2'>{team1_number}</h2> 
            <img src={teamsArr[0].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>

          <div style={{textAlign: 'center'}}>
            <h2 className='h2'>{team2_number}</h2> 
            <img src={teamsArr[1].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>

          <div style={{textAlign: 'center'}}>
            <h2 className='h2'>{team3_number}</h2>
            <img src={teamsArr[2].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>
          <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
          <h2 className='h2' style={{textAlign: 'center'}}>Intake Source</h2>
  
          <div>
            <h2 style={{display: 'inline'}} className='h2'>{team1_number + ':'}</h2> 
            <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[0].teleop.teleop_intake}</h1>
          </div>
          <div>
            <h2 style={{display: 'inline'}} className='h2'>{team2_number + ':'}</h2> 
            <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[1].teleop.teleop_intake}</h1>
          </div>
          <div>
            <h2 style={{display: 'inline'}} className='h2'>{team3_number + ':'}</h2> 
            <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[2].teleop.teleop_intake}</h1>
          </div>
          <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
          <h2 className='h2' style={{textAlign: 'center'}}>Traversed Stage</h2>
          <div style={{textAlign: 'center'}}>
            <h2 className='h2' style={{display: 'inline'}}>{team1_number}</h2> 
            <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>{team2_number}</h2> 
            <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>{team3_number}</h2>
          </div>
          <div style={{display: 'inline'}}>
          <Checkbox disabled defaultChecked={teamsArr[0].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '30%'}}/>
          </div>
          <div style={{display: 'inline', marginLeft: '4%'}}>
          <Checkbox disabled defaultChecked={teamsArr[1].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '30%'}}/>
          </div>
          <div style={{display: 'inline', marginLeft: '4%'}}>
          <Checkbox disabled defaultChecked={teamsArr[2].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '30%'}}/>
          </div>
          <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
          <h2 className='h2' style={{textAlign: 'center'}}>Driver Skill</h2>
          <div style={{textAlign: 'center'}}>
            <h2 className='h2' style={{display: 'inline'}}>{team1_number}</h2> 
            <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>{team2_number}</h2> 
            <h2 className='h2' style={{display: 'inline', marginLeft: '12%'}}>{team3_number}</h2>
          </div>
  
          <div style={{display: 'inline'}}>
          <InputNumber disabled defaultValue={teamsArr[0].OA.avg_driver_skill} controls placeholder='team 1' min={1} className="inputDisplayNumber"/>
          <InputNumber disabled defaultValue={teamsArr[1].OA.avg_driver_skill} controls placeholder='team 2' min={1} className="inputDisplayNumber" style={{marginLeft: "4%"}}/>
          <InputNumber disabled defaultValue={teamsArr[2].OA.avg_driver_skill} controls placeholder='team 3' min={1} className="inputDisplayNumber" style={{marginLeft: "5%"}}/>
          </div>
          <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
          <h2 className='h2' style={{textAlign: 'center'}}>Graph</h2>
          <h2 className='h2'>{team1_number}</h2>
          <div style={{marginBottom: '10%'}}>
            <img src={String(graphsArr[0])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>
          <h2 className='h2'>{team2_number}</h2>
          <div style={{marginBottom: '10%'}}>
            <img src={String(graphsArr[1])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>
          <h2 className='h2'>{team3_number}</h2>
          <div style={{marginBottom: '10%'}}>
            <img src={String(graphsArr[2])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
          </div>
          
        </div>
      
        );
    }
    
    if (Length_Teams == 2 && typeof teamsArr[0] != 'undefined' && typeof graphsArr[0] != 'undefined' && typeof teamsArr[1] != 'undefined' && typeof graphsArr[1] != 'undefined') {

        return (
          <div>
            <h2 className='h2' style={{textAlign:'center'}}>Allience Average Score</h2>
            <InputNumber disabled defaultValue={teamsArr[0]['OA']['alliance_avg_score']} controls placeholder='team 1' min={1} className="input"/>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <div style={{textAlign: 'center'}}>
              <h2 className='h2'>{team1_number}</h2> 
              <img src={teamsArr[0]['auto']['auto_path']} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>
  
            <div style={{textAlign: 'center'}}>
              <h2 className='h2'>{team2_number}</h2> 
              <img src={teamsArr[1]['auto']['auto_path']} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>

            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
    
            <h2 className='h2' style={{textAlign: 'center'}}>Intake Source</h2>
    
            <div>
              <h2 style={{display: 'inline'}} className='h2'>{team1_number + ':'}</h2> 
              <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[0]['teleop']['teleop_intake']}</h1>
            </div>
  
            <div>
              <h2 style={{display: 'inline'}} className='h2'>{team2_number + ':'}</h2> 
              <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[1]['teleop']['teleop_intake']}</h1>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Traversed Stage</h2>
            <div>
              <h2 className='h2' style={{display: 'inline'}}>{team1_number + ': '}</h2> 
              <Checkbox disabled defaultChecked={teamsArr[0].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '30%'}}/>
            </div>
            <div>
              <h2 className='h2' style={{display: 'inline'}}>{team2_number + ': '}</h2> 
              <Checkbox disabled defaultChecked={teamsArr[1].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '30%'}}/>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Driver Skill</h2>
            <div>
              <h2 className='h2' style={{display: 'inline'}}>{team1_number + ': '}</h2> 
              <InputNumber disabled defaultValue={teamsArr[0]['OA']['avg_driver_skill']} controls placeholder='team 1' min={1} className="inputDisplayNumber"/>
            </div>
            <div>
              <h2 className='h2' style={{display: 'inline'}}>{team2_number + ': '}</h2> 
              <InputNumber disabled defaultValue={teamsArr[1]['OA']['avg_driver_skill']} controls placeholder='team 2' min={1} className="inputDisplayNumber"/>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Graph</h2>
            <h2 className='h2'>{team1_number + ':'}</h2>
            <div style={{marginBottom: '10%'}}>
              <img src={String(graphsArr[0])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>
            <h2 className='h2'>{team2_number + ':'}</h2>
            <div style={{marginBottom: '10%'}}>
              <img src={String(graphsArr[1])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>
          </div>
          );
    }

    
      if (Length_Teams == 1 && typeof teamsArr[0] != 'undefined' && typeof graphsArr[0] != 'undefined') {

        return (
            <div>
            <h2 className='h2' style={{textAlign:'center'}}>Allience Average Score</h2>
            <InputNumber disabled defaultValue={teamsArr[0]['OA']['alliance_avg_score']} controls placeholder='team 1' min={1} className="input"/>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <div style={{textAlign: 'center'}}>
              <h2 className='h2'>{team1_number}</h2> 
              <img src={teamsArr[0]['auto']['auto_path']} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Intake Source</h2>

            <div>
              <h2 style={{display: 'inline'}} className='h2'>{team1_number + ':'}</h2> 
              <h1 style={{display: 'inline', marginLeft:'5%'}} className='h1'>{teamsArr[0]['teleop']['teleop_intake']}</h1>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>

            <h2 className='h2' style={{textAlign: 'center'}}>Traversed Stage</h2>
            <div>
              <h2 className='h2' style={{display: 'inline'}}>{team1_number + ': '}</h2> 
              <Checkbox disabled defaultChecked={teamsArr[0].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '20%'}}/>
            </div>

            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Driver Skill</h2>
            <div>
              <h2 className='h2' style={{display: 'inline', marginLeft: '10&'}}>{team1_number + ': '}</h2> 
              <InputNumber disabled defaultValue={teamsArr[0]['OA']['avg_driver_skill']} controls placeholder='team 1' min={1} className="inputDisplayNumber"/>
            </div>
            <hr style={{width:'100%', textAlign:'left', marginLeft:'0', height: '100%', marginTop: '10%', marginBottom: '10%'}}/>
            <h2 className='h2' style={{textAlign: 'center'}}>Graph</h2>
            <h2 className='h2'>{team1_number}</h2>
            <div style={{marginBottom: '10%'}}>
              <img src={String(graphsArr[0])} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
            </div>
          </div>
          );
      }
    
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
              <h2 className='h2' style={{textAlign: 'center'}}>{teamsArr[0].auto.robot_start_position}</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={teamsArr[0].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
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
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio</h1>
            <InputNumber disabled controls defaultValue={teamsArr[0].endGame.robot_climbing_ratio} placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled defaultChecked={teamsArr[0].endGame.harmony} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled defaultChecked={teamsArr[0].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Scored</h1>
            <Checkbox disabled defaultChecked={teamsArr[0].OA.trap_scored} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <h1 className='h1' style={{textAlign: 'center'}}>{teamsArr[0].teleop.teleop_intake}</h1>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled defaultChecked={teamsArr[0].OA.OA_robot_died} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled defaultValue={teamsArr[0].OA.robot_comments} className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
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
              <h2 className='h2' style={{textAlign: 'center'}}>{teamsArr[1].auto.robot_start_position}</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={teamsArr[1].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
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
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio</h1>
            <InputNumber disabled controls defaultValue={teamsArr[1].endGame.robot_climbing_ratio} placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled defaultChecked={teamsArr[1].endGame.harmony} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled defaultChecked={teamsArr[1].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Scored</h1>
            <Checkbox disabled defaultChecked={teamsArr[1].OA.trap_scored} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <h1 className='h1' style={{textAlign: 'center'}}>{teamsArr[1].teleop.teleop_intake}</h1>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled defaultChecked={teamsArr[1].OA.OA_robot_died} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled defaultValue={teamsArr[1].OA.robot_comments} className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
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
              <h2 className='h2' style={{textAlign: 'center'}}>{teamsArr[2].auto.robot_start_position}</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Auton Path</h2>
            <img src={teamsArr[2].auto.auto_path} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}/>
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
            <h1 className='h1' style={{textAlign: 'center'}}>Climbing Ratio</h1>
            <InputNumber disabled controls defaultValue={teamsArr[2].endGame.robot_climbing_ratio} placeholder='team 1' min={1} className="inputDisplayNumber" style={{width: '70%', marginLeft: '15%', marginBottom: '3%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Harmony</h1>
            <Checkbox disabled defaultChecked={teamsArr[2].endGame.harmony} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Traverse Under Stage</h1>
            <Checkbox disabled defaultChecked={teamsArr[2].OA.traverse_under_stage} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', marginBottom: '3%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Trap Scored</h1>
            <Checkbox disabled defaultChecked={teamsArr[2].OA.trap_scored} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          {/* Overall Start */}
          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h2 className='h2' style={{textAlign: 'center'}}>Overall</h2>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Intake Source</h1>
              <h1 className='h1' style={{textAlign: 'center'}}>{teamsArr[2].teleop.teleop_intake}</h1>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Robot died (Last Match)</h1>
            <Checkbox disabled defaultChecked={teamsArr[2].OA.OA_robot_died} className='checkboxRedFixed' style={{width: '50%', marginLeft: '25%'}}/>
          </div>

          <div style={{border: 'solid', width: '99.6%', height: '100%', borderColor: 'white', marginBottom: '10%'}}> 
            <h1 className='h1' style={{textAlign: 'center'}}>Comments</h1>
            <TextArea disabled defaultValue={teamsArr[2].OA.robot_comments} className="comment" style={{verticalAlign: 'center', marginLeft: '5%', marginBottom: '3%'}}/>
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


