
import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import back from '../public/images/back.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TeamData(props: any) {
  const { team_number } = useParams();
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {document.title = props.title}, [props.title]);
  useEffect(() => {
    async function fetchData(team_number: number) {
      let parsedData = "";
      try {
        const url = process.env.REACT_APP_LOOKUP_URL + "?team_number=" + team_number;
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < data.documents.length; i++) {
            const matches = data.documents[i];
            for (let matchInfo in matches) {
              const matchData = matches[matchInfo];
              for (let matchStats in matchData) {
                if (Number.isNaN(Number(matchStats))) {
                  parsedData = parsedData.concat("\n" + matchStats + ":" + matchData[matchStats]);
                }
              }
            }
            parsedData = parsedData.concat("\n");
        }
        setFetchedData(parsedData);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }
    if (team_number) {
      fetchData(parseInt(team_number));
    }
  }, [team_number]);
  return (
    <body>
      <div className='banner'>
        <header>
          <a href="/scoutingapp/lookup">
            <img src={back} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
          </a>
          <table>
            <td>
              <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
            </td>
              <h1 style={{ display: 'inline-block', textAlign: 'center' }} className = "showTeamName">Team {team_number}</h1>
          </table>
        </header>
        <h1 style={{whiteSpace: 'pre-line'}}>{fetchedData}</h1>
      </div>
    </body>
  );
}

export default TeamData;
