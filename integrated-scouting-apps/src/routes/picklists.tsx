import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { Form, GetProp, Table, TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import { useParams } from 'react-router-dom';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface DataType {
  key: React.Key,
  rank: number,
  team_number: number,
  match_number: number,
  score: number,
}

interface ExpandedDataType {
  key: React.Key;
  match_number: number;
  score: number;
}


function Picklists(props: any) {
  const [form] = Form.useForm();
  const eventname = process.env.REACT_APP_EVENTNAME;
  const team_number/*{ team_number }*/ = 2637;//useParams();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ [x: string]: any; }[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 100,
    },
  });
  const rankData: any = [];
  const teams = [];
  let match = [1];
  let avg_score = 0;
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
      width: '15%'
    },
    {
      title: 'Team #',
      dataIndex: 'team_number',
      key: 'team_number',
    },
    {
      title: 'Match #',
      dataIndex: 'match_number',
      key: 'match_number',
      width: '15%',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];


  useEffect(() => {document.title = props.title}, [props.title]);
  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('https://www.thebluealliance.com/api/v3/event/2023cass/rankings', {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': '0iSKwn3ykkgDT9ToHqwBizSiiaa44pyLIK85oEdgOkzxNJS1X0vBtDFrJ24PiAWW'
        }
      });
      const data = await response.json();
      const yo = data['rankings'];
      console.log(yo);
      displayData = [];
      for(var i = 0; i < yo.length; i++)
      {
        // fetchData(parseInt(yo[i]['team_key'].substring(3)));
        await fetchData(2637);
        console.log(parseInt(yo[i]['team_key'].substring(3)))
        // console.log(avg_score, "999")
        // console.log(match, "000")
        let newData = {
          key: yo[i]['rank'],
          rank: yo[i]['rank'],
          team_number: yo[i]['team_key'].substring(3),
          match_number: match[0],//yo[i]['matches_played'],
          score:avg_score,
          children: [expandData][0],
        }
        console.log(expandData);
        console.log(newData);
        displayData.push(newData);
      }
      console.log(displayData);
      setFetchedData(displayData);
      // console.log(data['rankings']);
      // rankData.push(data['rankings']);
      // console.log(rankData);
      }
      catch(err) {
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

        const response = await fetch(process.env.REACT_APP_PICKLIST_URL + "?team_number=" + team_number);
        const data = await response.json();

        for(var i = 0; i < data.length; i++)
        {
          match_num.push(parseInt(data[i]['match_number']));
          match_score.push(parseInt(data[i]['score']))

          console.log(match_num);
          console.log(match_score);
          console.log(typeof match_num);
          console.log(typeof match_score);
        }
        match = match_num;

        avg_score = 0;
        match_score.forEach(score => {
          avg_score += score;
        });
        avg_score /= match_score.length;

        expandData = [];
        for(var i = 0; i < match_num.length; i++) {
          let newChildren = {
            key: team_number + match_num[i],
            match_number: match_num[i],
            score: match_score[i],
          }
          expandData.push(newChildren);
        }
      }
      catch (err) {
        console.log(err);
      }
    };
  }, [team_number]);
  
  // console.log(rankData, '00');
  // console.log(rankData[0]);
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
        <Table columns={columns} dataSource={fetchedData} pagination={tableParams.pagination}></Table>
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