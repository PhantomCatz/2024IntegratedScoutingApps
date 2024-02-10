import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect } from 'react';
import { Form, Table } from 'antd';
import Column from 'antd/es/table/Column';

function Picklists(props: any) {
  const [form] = Form.useForm();
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;


  
  function preMatch() {
    type FieldType = {
      initials?: string;
      teamnum?: number;
      matchlevel?: string;
      matchnum?: number;
    };
    const rounds = [
      { label: "Qualifications", value: "qual" },
      { label: "Elimination", value: "elim" },
      { label: "Finals", value: "final" },
    ];
    return (
      <div>
      </div>
    );
  }

  return (
    <body>
      <div className='banner'>
        <header>
          <a href="/scoutingapp/">
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
            </td>
              <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Picklist</h1>
          </table>
        </header>
        {/* <h2 style={{whiteSpace: 'pre-line'}}>{loading ? "Loading..." : 'Data for ' + team_number}</h2> */}
        {/* <Table dataSource={fetchedData}> */}
        <Table>
          <Column title="Team #" dataIndex="team_number" key="team_number" />
          <Column title="Match Level" dataIndex="match_level" key="match_level" />
          <Column title="Score" dataIndex="score" key="score" />
        </Table>
      </div>
    </body>
  );
}

export default Picklists;