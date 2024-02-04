import '../public/stylesheets/dtf.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useParams } from 'react-router-dom';

function DTFTeams(props: any) {
  const { team_number } = useParams();
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(true);
  const [tabNum, setTabNum] = useState("1");
  useEffect(() => document.title = props.title, [props.title]);

  function Summary() {
    type FieldType = {
      initials?: string;
      teamnum?: number;
      matchlevel?: string;
      matchnum?: number;
    };
    const rounds = [
      { label: "Qualifications", value: "qm" },
      { label: "Elimination", value: "sf" },
      { label: "Finals", value: "f" },
    ];
    return (
      <div>
        <h2>OwO</h2>
      </div>
    );
  }
  function Team1() {
    type FieldType = {
      comments?: string;
    };
    return (
      <div>
        <h2>tOwOt</h2>
      </div>
    );
  }
  function Team2() {
    type FieldType = {
      comments?: string;
    };
    return (
      <div>
        <h2>jOwOj</h2>
      </div>
    );
  }
  function Team3() {
    type FieldType = {
      comments?: string;
    };
    return (
      <div>
        <h2>bOwOd</h2>
      </div>
    );
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Summary',
      children: Summary(),
    },
    {
      key: '2',
      label: 'Team 1',
      children: Team1(),
    },
    {
      key: '3',
      label: 'Team 2',
      children: Team2(),
    },
    {
      key: '4',
      label: 'Team 3',
      children: Team3(),
    },
  ];
  return (
    <body>
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
              <h1 style={{display: 'inline-block', textAlign: 'center'}}>Team {team_number}</h1>
            </td>
          </table>
        </header>
      </div>
      <Tabs defaultActiveKey="1" items={items} className='tabs' />
    </body>
  );
}

export default DTFTeams;
