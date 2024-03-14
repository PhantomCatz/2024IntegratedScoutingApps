import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { GetProp, Table, TableProps } from 'antd';
import VerifyLogin from '../verifyToken';
import { useCookies } from 'react-cookie';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

// interface DataType {
//   key: React.Key;
//   rank: number;
//   team_number: number;
//   average_score: number;
// }

// interface DataExpand {
//   key: React.Key;
//   match_number: number;
//   score: number;
// }

function Picklists(props: any) {
  const eventname = process.env.REACT_APP_EVENTNAME;
  const team_number/*{ team_number }*/ = 2637;//useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);
  const [dataDetail, setDataDetail] = useState<{ [x: string]: any; }[]>([]);
  const [cookies] = useCookies(['login', 'theme']);
    useEffect(() => { VerifyLogin.VerifyLogin(cookies.login); return () => {}}, [cookies.login]);
    useEffect(() => { VerifyLogin.ChangeTheme(cookies.theme); return () => {}}, [cookies.theme]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 1000,
    },
  });

  let avg_score = 0;
  let robot_died = 'false';

  let displayData = [
    {

    }
  ];
  let expandData = [
    {

    }
  ]

  const columns = [
    {
      title: 'Ranking',
      dataIndex: 'rank',
      key: 'rank',
      width: '15%',
    },
    {
      title: 'Team #',
      dataIndex: 'team_number',
      key: 'team_number',
    },
    {
      title: 'Average Score',
      dataIndex: 'average_score',
      key: 'average_score',
    },
    {
      title: 'Died',
      dataIndex: 'died',
      key: 'died',
    },
  ];


  const expandColumns = [
    {
      title: 'Match #',
      dataIndex: 'match_number',
      key: 'match_number',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score'
    }
  ];


  useEffect(() => { document.title = props.title }, [props.title]);
  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('https://www.thebluealliance.com/api/v3/event/' + eventname + '/rankings', {
          method: "GET",
          headers: {
            'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
          }
        });
        const data = await response.json();
        const ls = data['rankings'];
        console.log(ls);
        displayData = [];
        for (var i = 0; i < ls.length; i++) {
          //await fetchData(parseInt(ls[i]['team_key'].substring(3)));
          await fetchData(254);
          //console.log(parseInt(ls[i]['team_key'].substring(3)))

          let newData = {
            key: ls[i]['rank'],
            rank: ls[i]['rank'],
            team_number: ls[i]['team_key'].substring(3),
            average_score: avg_score.toFixed(2),
            died: robot_died.toString(),
          }
          console.log(expandData);
          console.log(newData);
          displayData.push(newData);
        }
        console.log(displayData);
        setFetchedData(displayData);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTeams();

    async function fetchData(team_number: number) {
      try {
        const match_num = [];
        const match_score = [];
        const match_died = [];

        const response = await fetch(process.env.REACT_APP_PICKLIST_URL + "?team_number=" + team_number);
        const data = await response.json();

        for (var i = 0; i < data.length; i++) {
          match_num.push(parseInt(data[i]['match_number']));
          match_score.push(parseInt(data[i]['score']));
          match_died.push()//TBD call died
        }

        avg_score = 0;
        match_score.forEach(score => {
          avg_score += score;
        });
        avg_score /= match_score.length;

        expandData = [];
        for (var i = 0; i < match_num.length; i++) {
          let newChildren = {
            key: team_number * 1000 + match_num[i],
            match_number: match_num[i],
            score: match_score[i],
          }
          expandData.push(newChildren);
        }
        setDataDetail(expandData);

        // robot_died = 'false' //TBD died
        // match_died.forEach(died => {
        //   if(died == 'true') {
        //     robot_died = 'true'
        //   }
        // });
      }
      catch (err) {
        console.log(err);
      }
    };
  }, [team_number]);

  return (
    <div>
      <meta name="viewport" content="maximum-scale=1.0" />
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
                  <h1 style={{ display: 'inline-block', textAlign: 'center' }}>Picklist</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
        <h2 style={{ whiteSpace: 'pre-line' }}>{loading ? 'Loading... (May take several minutes)' : ''}</h2>
        <Table
          columns={columns}
          dataSource={fetchedData}
          rowClassName={(record) => (record.died == 'true' ? 'died' : 'OwO')} //TBD: died
          pagination={tableParams.pagination}
          expandable={{
            expandedRowRender: OwO => (
              <Table
                columns={expandColumns}
                dataSource={dataDetail}
              />
            ),
          }}
        ></Table>
      </div>
    </div>
  );
}

export default Picklists;

// fetch('https://www.thebluealliance.com/api/v3/event/2023cass/rankings', {
// 			method: "GET",
// 			headers: {
// 				'X-TBA-Auth-Key': '0iSKwn3ykkgDT9ToHqwBizSiiaa44pyLIK85oEdgOkzxNJS1X0vBtDFrJ24PiAWW'
// 			}
// 		})
// 		.then(response => response.json())
// 		.then(data => {console.log(data)
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		});
