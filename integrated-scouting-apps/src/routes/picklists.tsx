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
        //console.log(data);
        for (const team in data) {
          if (teams[data[team].team_number] === undefined) {
            teams[data[team].team_number] = (data[team]);
          }
          else {
            teams[data[team].team_number].score += data[team].score; //total score
            teams[data[team].team_number].match_number = 0; //set matchnum 0
          }
          if (data[team].robot_died) {
            teams[data[team].team_number].robot_died = "true";
          }
          else {
            teams[data[team].team_number].robot_died = "false";
          }
        }
        for (const team in data) {
          teams[data[team].team_number].match_number++; //set total num match
          teams[data[team].team_number].avg_score = Math.round(teams[data[team].team_number].score / teams[data[team].team_number].match_number * 100) / 100;
        }
        for (const team in teams) {
          kv.push(teams[team]);
        }
        setFetchedData(kv);
        console.log(kv);
        setLoading(false);
      }
      catch (err) {
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
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>2637 Picklist</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </header>        
        <h2 style={{whiteSpace: 'pre-line'}}>{loading ? 'Loading...' : ''}</h2>
        <Table dataSource={fetchedData} pagination={{ pageSize: 50 }}>
          {/* <Column title="Rank #" dataIndex="rank" key="rank" /> */}
          <Column title="Team #" dataIndex="team_number" key="team_number" sorter={(a: any, b: any) => a.team_number - b.team_number}/>
          <Column title="Overall Score" dataIndex="score" key="score" sorter={(a: any, b: any) => a.score - b.score}/>
          <Column title="Avg Score" dataIndex="avg_score" key="avg_score" sorter={(a: any, b: any) => a.avg_score - b.avg_score}/>
          {/* <Column title="IEGR" dataIndex="iegr" key="iegr" /> */}
          <Column title="Robot Died" dataIndex="robot_died" key="robot_died" sorter={(a: any, b: any) => a.robot_died.length - b.robot_died.length}/>
        </Table>
      </div>
    </div>
  );
}

export default Picklists;