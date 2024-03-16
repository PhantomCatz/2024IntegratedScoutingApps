import '../public/stylesheets/style.css';
import '../public/stylesheets/picklist.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import Column from 'antd/es/table/Column';
import { Table } from 'antd';

function Picklists(props: any) {
  const [cookies] = useCookies(['login', 'theme']);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  useEffect(() => {document.title = props.title}, [props.title]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const teams: { [key: string]: any } = {};
        const kv = [];
        const response = await fetch(process.env.REACT_APP_PICKLIST_URL as string);
        const data = await response.json();
        for (const team in data) {
          if (teams[data[team].team_number] === undefined) {
            teams[data[team].team_number] = (data[team]);
            if (teams[data[team].team_number].first_score === undefined) {
              teams[data[team].team_number].first_score = data[team].score;
            }
            if (teams[data[team].team_number].second_score === undefined) {
              teams[data[team].team_number].second_score = 0;
            }
            if (teams[data[team].team_number].third_score === undefined) {
              teams[data[team].team_number].third_score = 0;
            }
          }
          else {
            if (data[team].score > teams[data[team].team_number].first_score) {
              teams[data[team].team_number].second_score = teams[data[team].team_number].first_score;
              teams[data[team].team_number].first_score = data[team].score;
            }
            else if (data[team].score > teams[data[team].team_number].second_score) {
              teams[data[team].team_number].third_score = teams[data[team].team_number].second_score;
              teams[data[team].team_number].second_score = data[team].score;
            }
            else if (data[team].score > teams[data[team].team_number].third_score) {
              teams[data[team].team_number].third_score = data[team].score;
            }
            teams[data[team].team_number].score += data[team].score; //total score
            teams[data[team].team_number].auto_score += data[team].auto_score; //total auto score
            teams[data[team].team_number].tele_amp_score += data[team].tele_amp_score; //total auto score
            teams[data[team].team_number].tele_speaker_score += data[team].tele_speaker_score; //total auto score
            teams[data[team].team_number].match_number = 0; //set matchnum 0
          }
          if (data[team].robot_died) {
            teams[data[team].team_number].robot_died++;
          }
          console.log("team " + teams[data[team].team_number].team_number);
          console.log("1 " + teams[data[team].team_number].first_score);
          console.log("2 " + teams[data[team].team_number].second_score);
          console.log("3 " + teams[data[team].team_number].third_score);
        }
        for (const team in data) {
          teams[data[team].team_number].match_number++; //set total num match
          teams[data[team].team_number].avg_score = Math.round(teams[data[team].team_number].score / teams[data[team].team_number].match_number * 100) / 100;
          teams[data[team].team_number].iegr = Math.round((teams[data[team].team_number].first_score + teams[data[team].team_number].second_score + teams[data[team].team_number].third_score) / 3  * 100) / 100;
        }
        for (const team in teams) {
          kv.push(teams[team]);
        }
        setFetchedData(kv);
        console.log(kv);
        setLoading(false);
      }
      catch (err) {
        window.alert("error has occured; please tell nathan asap");
        window.alert(err);
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className='banner'>
        <header>
          <a href="/scoutingapp/">
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
          </a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>2637 Picklists</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </header>        
        <h2 style={{whiteSpace: 'pre-line'}}>{loading ? 'Loading Data...' : ''}</h2>
        <Table dataSource={fetchedData} pagination={{ pageSize: 500 }}>
          {/* <Column title="Rank #" dataIndex="rank" key="rank" sorter={(a: any, b: any) => a.rank - b.rank}/> */}
          <Column title="Team #" dataIndex="team_number" key="team_number" sorter={(a: any, b: any) => a.team_number - b.team_number}/>
           <Column title="Overall Score" dataIndex="avg_score" key="avg_score" sorter={(a: any, b: any) => a.avg_score - b.avg_score} defaultSortOrder={"descend"}/>
          <Column title="IEGR (Top 3)" dataIndex="iegr" key="iegr" sorter={(a: any, b: any) => a.iegr - b.iegr}/>
          <Column title="Auto Notes Avg" dataIndex="auto_avg_score" key="auto_avg_score" sorter={(a: any, b: any) => a.auto_avg_score - b.auto_avg_score}/>
          <Column title="Auto Notes Score/Attempt" dataIndex="auto_score_ratio" key="auto_score_ratio" sorter={(a: any, b: any) => a.auto_score_ratio.length - b.auto_score_ratio.length}/>
          <Column title="Teleop Notes Amp Avg" dataIndex="tele_avg_amp_score" key="tele_avg_amp_score" sorter={(a: any, b: any) => a.tele_avg_amp_score - b.tele_avg_amp_score}/>
          <Column title="Amp Notes Score/Attempt" dataIndex="amp_score_ratio" key="amp_score_ratio" sorter={(a: any, b: any) => a.amp_score_ratio.length - b.amp_score_ratio.length}/>
          <Column title="Teleop Notes Speaker Avg" dataIndex="tele_avg_speaker_score" key="tele_avg_speaker_score" sorter={(a: any, b: any) => a.tele_avg_speaker_score - b.tele_avg_speaker_score}/>
          <Column title="Speaker Notes Score/Attempt" dataIndex="speaker_score_ratio" key="speaker_score_ratio" sorter={(a: any, b: any) => a.speaker_score_ratio.length - b.speaker_score_ratio.length}/>
          <Column title="Robot Deaths" dataIndex="robot_died" key="robot_died" sorter={(a: any, b: any) => a.robot_died - b.robot_died} className='robotdied'/>
        </Table>
      </div>
    </div>
  );
}

export default Picklists;