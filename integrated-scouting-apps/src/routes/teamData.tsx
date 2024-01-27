
import '../public/stylesheets/style.css';
import logo from '../public/images/logo.png';
import no_image from '../public/images/no_image.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Button } from 'antd';
import type { TabsProps } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';

function TeamData(props: any) {
  const { team_number } = useParams();
  const eventname = process.env.REACT_APP_EVENTNAME;

  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    async function fetchData(team_number: number) {
      try {
        const url = `${process.env.REACT_APP_FIREBASE_URL}?team_number=${team_number}`;
        console.log('Fetching data from URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data from Firebase:', data);

        // Update state with fetched data
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    }

    // Fetch data when the component mounts or when team_number changes
    if (team_number) {
      fetchData(parseInt(team_number, 10));
    }
  }, [team_number]);

  return (
    <body>
      <div className='banner'>
                 <header>
                     <img src={no_image} style={{ height: 64 + 'px', paddingTop: '5%' }} alt=''></img>
                     <table>
                         <td>
                             <a href="/scoutingapp/lookup">
                                 <img src={logo} style={{ height: 256 + 'px' }} alt='' ></img>
                             </a>
                         </td>
                         <td>
                             <h1 style={{ display: 'inline-block', textAlign: 'center' }} className = "showTeamName">Team {team_number}</h1>
                         </td>
                     </table>
                 </header>
             </div>

      <Tabs defaultActiveKey="1" items={[{ key: '1', label: team_number }]} className='tabs' />

      {loading ? (
        // Display a loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (

        // Render the fetched data in the UI

    
        <div className='data'>
          {/* Customize the rendering based on your data structure */}
          {fetchedData && (
            <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
          )}
        </div>
      )}
    </body>
  );
}

export default TeamData;
