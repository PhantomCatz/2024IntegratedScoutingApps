import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { GetProp, Table, TableProps } from 'antd';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

function Picklists(props: any) {
let teamList: string[] = [];
let rankList: string[] = [];

  const eventname = process.env.REACT_APP_EVENTNAME;
  const team_number/*{ team_number }*/ = 2637;//useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);
  const [dataDetail, setDataDetail] = useState<{ [x: string]: any; }[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 1000,
    },
  });

  let avg_score = 0;
  let robotEverDied = 'false';

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
      width: '10%',
    },
    {
      title: 'Team #',
      dataIndex: 'team_number',
      key: 'team_number',
      width: '10%',

    },
    {
      title: 'Overall Score',
      dataIndex: 'overall_score',
      key: 'overall_score',
      width: '15%',
    },
    {
      title: 'IEGR',
      dataIndex: 'iegr',
      key: 'iegr',
      width: '15%',
    },
    {
      title: 'Combined',
      dataIndex: 'combined',
      key: 'combined',
      width: '15%',
    },
    {
      title: 'Consistency',
      dataIndex: 'consistency',
      key: 'consistency',
      width: '15%',
    },
    {
      title: 'Died',
      dataIndex: 'died',
      key:'died',
      width: '1%',
    },
  ];
  

  const expandColumns = [
    {
      title:'Match #',
      dataIndex: 'match_number',
      key: 'match_number',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score' 
    }
  ];


  useEffect(() => {document.title = props.title}, [props.title]);
  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('https://www.thebluealliance.com/api/v3/event/'+ eventname + '/rankings', {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
        },
      });
      const data = await response.json();
      const ls = data['rankings'];
      ls.forEach((team: { [x: string]: string; }) => {
        teamList.push(team['team_key'].substring(3));
        rankList.push(team['rank']);
      });
      }
      catch(err) {
        console.log(err);
      }
    };
    
    
    fetchData();
    async function fetchData() {
      try {
        await fetchTeams();
        const response = await fetch(process.env.REACT_APP_PICKLIST_URL as string);
        const data = await response.json();
        console.log(data);
// console.log(teamList[0] == parseInt(data[20]['team_number']));
// console.log(teamList[0],', ', parseInt(data[20]['team_number']));
        displayData = [];
        for(var i = 0; i < teamList.length; i++) 
        {
          const match_num   = [];
          const match_score = [];
          const match_died  = [];

          for(var j = 0; j < data.length; j++)
          {
            if(parseInt(data[j]['team_number']) == parseInt(teamList[i])) {
              console.log(data)
              console.log(parseInt(data[j]['team_number']), parseInt(data[j]['match_number']), parseInt(data[j]['score']))
              match_num.push(parseInt(data[j]['match_number']));
              match_score.push(parseInt(data[j]['score']));
              match_died.push(data[j]['robotEverDied'])//TBD call died
              console.log('OwO')
            }
          }

          console.log(match_score)
          avg_score = 0;
          match_score.forEach(score => {
            avg_score += score;
            console.log(score);
          });
          avg_score /= match_score.length;
          console.log(avg_score)

          expandData = [];
          for(var j = 0; j < match_num.length; j++) {
            let newChildren = {
              key: team_number * 1000 + match_num[j],
              match_number: match_num[j],
              score: match_score[j],
            }
            expandData.push(newChildren);
          }

          robotEverDied = 'false' //TBD died
          match_died.forEach(died => {
            if(died == 'true') {
              robotEverDied = 'true'
            }
          });

          let newData = {
            key: rankList[i],
            rank: rankList[i],
            team_number: teamList[i],
            overall_score: avg_score.toFixed(2),
            iegr: 1,
            combined: 1,
            consistency: 1,
            died: robotEverDied.toString(),
          }
          displayData.push(newData);
        }
        setFetchedData(displayData);
        setDataDetail(expandData);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    };
  }, [team_number]);
  
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
        <h2 style={{whiteSpace: 'pre-line'}}>{loading ? 'Loading...' : ''}</h2>
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
    </body>
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

// var numericArray: number[] = [13, 2, 3, 4, 1, 5, 8, 11, 0, 76, 8, 6, 8, 9, 5, 3, 87, 579];

// var sortedArray: number[] = numericArray.sort((n1,n2) => n2 - n1);

// console.log(sortedArray);
