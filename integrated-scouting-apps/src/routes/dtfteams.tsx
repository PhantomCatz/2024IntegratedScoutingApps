// import '../public/stylesheets/style.css';
// import logo from '../public/images/logo.png';
// import back from '../public/images/back.png';
// import { useEffect, useState } from 'react';
// import { Tabs, TabsProps, Form } from 'antd';
// import { useParams } from 'react-router-dom';

// function DTFTeams(props: any) {
//   const { team_number } = useParams();
//   const [fetchedData, setFetchedData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [tabNum, setTabNum] = useState("1");

//   const teams = team_number?.split(', ');
//   const team1_number = teams?[0]: Number;
//   const team2_number = teams?[1]: Number;
//   const team3_number = teams?[2]: Number;

//   // console.log(typeof teams);
//   // console.log(typeof team_number);
//   // console.log(typeof team1_number);
//   useEffect(() => {document.title = props.title}, [props.title]);
//   // useEffect(() => {
//   //   async function fetchData(team_number: number) {
//   //     let parsedData = "";
//   //     try {
//   //       const url = process.env.REACT_APP_LOOKUP_URL + "?team_number=" + team_number;
//   //       const response = await fetch(url);
//   //       const data = await response.json();
//   //       for (let i = 0; i < data.documents.length; i++) {
//   //           const matches = data.documents[i];
//   //           for (let matchInfo in matches) {
//   //             const matchData = matches[matchInfo];
//   //             for (let matchStats in matchData) {
//   //               if (Number.isNaN(Number(matchStats))) {
//   //                 parsedData = parsedData.concat("\n" + matchStats + ":" + matchData[matchStats]);
//   //               }
//   //             }
//   //           }
//   //           parsedData = parsedData.concat("\n");
//   //       }
//   //       setFetchedData(parsedData);
//   //     }
//   //     catch (err) {
//   //       console.log(err);
//   //     }
//   //     finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   //   // if (team1_number) {
//   //   //   fetchData(parseInt(team1_number));
//   //   // }
//   //   // if (team2_number) {
//   //   //   fetchData(parseInt(team2_number));
//   //   // }
//   //   // if (team3_number) {
//   //   //   fetchData(parseInt(team3_number));
//   //   // }
//   // }, [team_number]);
//   function Summary() {
//     type FieldType = {
      
//     };
//     return (
//       <div>
//         summary
//       </div>
//     );
//   }

//   function Team1() {
//     type FieldType = {
      
//     };
//     return (
//       <div>
//         1
//       </div>
//     );
//   }

//   function Team2() {
//     type FieldType = {
      
//     };
//     return (
//       <div>
//         2
//       </div>
//     );
//   }

//   function Team3() {
//     type FieldType = {
      
//     };
//     return (
//       <div>
//         3
//       </div>
//     );
//   }
//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: 'Summary',
//       children: Summary(),
//     },
//     {
//       key: '2',
//       label: 'Team 1',
//       children: Team1(),
//     },
//     {
//       key: '3',
//       label: 'Team 2',
//       children: Team2(),
//     },
//     {
//       key: '4',
//       label: 'Team 3',
//       children: Team3(),
//     },
//   ];
//   return (
//     <body>
//       <div className='banner'>
//         <header>
//           <a href="/dtf">
//             <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
//           </a>
//           <table>
//             <td>
//               <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
//             </td>
//               <h1 style={{ display: 'inline-block', textAlign: 'center' }} className = "showTeamName">Team {team_number}</h1>
//           </table>
//         </header>
//           {/* <h2 style={{whiteSpace: 'pre-line'}}>{loading ? "Loading..." : fetchedData}</h2> */}
//       </div>
//       <Tabs activeKey={tabNum} items={items} className='tabs'/>
      
//     </body>
//   );
// }

// export default DTFTeams;
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