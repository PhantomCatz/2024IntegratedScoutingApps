import '../public/stylesheets/style.css';
import '../public/stylesheets/strategic.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';
import { Input, InputNumber, Select, Tabs } from 'antd';
import TextArea from 'antd/es/input/TextArea';
function TeamData(props: any) {
  const [cookies] = useCookies(['login', 'theme']);
  const [tabNum, setTabNum] = useState("1");
  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Team',
      children: Lookup(),
    },
  ]);
  useEffect(() => { document.title = props.title }, [props.title]);
  useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => { } }, [cookies.login]);
  useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => { } }, [cookies.theme]);

  async function getComments(team_number: number) {
    try {
      if (team_number !== 0) {
        const response = await fetch(process.env.REACT_APP_STRATEGIC_COMMENT_LOOKUP_URL as string + "?team_number=" + team_number);
        const data = await response.json();
        const match: { key: string; label: string; children: JSX.Element; }[] = [];
        let index = 2;
        for (const question of data['documents']) {
          match.push({
            key: index.toString(),
            label: question.matchIdentifier.match_level + " " + question.matchIdentifier.match_number,
            children: (
              <div>
                <h2>Scouter Initials</h2>
                <Input className="input" disabled value={question.matchIdentifier.Initials} />
                <h2>Match Level</h2>
                <Input className="input" disabled value={question.matchIdentifier.match_level} />
                <h2>Match #</h2>
                <Input className="input" disabled value={question.matchIdentifier.match_number} />
                <h2>Round #</h2>
                <Input className="input" disabled value={question.matchIdentifier.round_number} />
                <h2>Robot Position</h2>
                <Input className="input" disabled value={question.matchIdentifier.robotpos} />
                <h2>Times Amplified</h2>
                <Input className="input" disabled value={question.timesAmplified} />
                <h2>Comments</h2>
                <TextArea className="strategic-input" disabled value={question.comment} style={{marginBottom: '5%'}} />
              </div>
            )
          });
          match.sort((a, b) => parseInt(a.key.substring(1)) - parseInt(b.key.substring(1)));
          index++;
        }
        for (let i = 0; i < match.length; i++) {
          setItems([...items, match[i]]);
        }
      }
    }
    catch (err) {
      console.log(err);
      window.alert("Error occured, please do not do leave this message and notify a Webdev member immediately.");
      window.alert(err);
    }
  };
  async function getDriverSkill(team_number: number) {
    try {
      if (team_number !== 0) {
        const response = await fetch(process.env.REACT_APP_STRATEGIC_DRIVER_SKILL_LOOKUP_URL as string + "?team_number=" + team_number);
        const data = await response.json();
        const match: { key: string; label: string; children: JSX.Element; }[] = [];
        let index = 2;
        for (const question of data['documents']) {
          match.push({
            key: index.toString(),
            label: question.matchIdentifier.match_level + " " + question.matchIdentifier.match_number,
            children: (
              <div>
                <h2>Scouter Initials</h2>
                <Input className="input" disabled value={question.matchIdentifier.Initials} />
                <h2>Match Level</h2>
                <Input className="input" disabled value={question.matchIdentifier.match_level} />
                <h2>Match #</h2>
                <Input className="input" disabled value={question.matchIdentifier.match_number} />
                <h2>Round #</h2>
                <Input className="input" disabled value={question.matchIdentifier.round_number} />
                <h2>Robot Position</h2>
                <Input className="input" disabled value={question.matchIdentifier.robotpos} />
                <h2>Comments</h2>
                <TextArea className="strategic-input" disabled value={question.driverskill} style={{marginBottom: '5%'}} />
              </div>
            )
          });
          match.sort((a, b) => parseInt(a.key.substring(1)) - parseInt(b.key.substring(1)));
          index++;
        }
        for (let i = 0; i < match.length; i++) {
          setItems([...items, match[i]]);
        }
      }
    }
    catch (err) {
      console.log(err);
      window.alert("Error occured, please do not do leave this message and notify a Webdev member immediately.");
      window.alert(err);
    }
  };
  function Lookup() {
    const strategic = [
      { label: "Comments", value: "comments" },
      { label: "Driver Skill", value: 'driverskill' },
    ];
    return (
      <div>
        <h2>Team Number</h2>
        <InputNumber min={0} max={9999} className="input" id='teamNum' />
        <h2>Strategic Type</h2>
        <Select options={strategic} className="input" id='type' onChange={(event) => {event === "comments" && Number((document.getElementById("teamNum") as HTMLInputElement).value) !== 0 ? getComments(Number((document.getElementById("teamNum") as HTMLInputElement).value)) : getDriverSkill(Number((document.getElementById("teamNum") as HTMLInputElement).value));}}/>
      </div>
    );
  }
  return (
    <div>
      <meta name="viewport" content="maximum-scale=1.0" />
      <div className='banner'>
        <header>
          <a href='/scoutingapp/strategic/'>
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt='' />
          </a>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={logo} style={{ height: 256 + 'px' }} alt='' />
                </td>
                <td>
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Strategic Lookup</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
      <Tabs defaultActiveKey="1" activeKey={tabNum} items={items} centered className='tabs' onChange={async (key) => { setTabNum(key); }} />
    </div>
  );
};
export default TeamData;