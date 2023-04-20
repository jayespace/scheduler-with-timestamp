import { useState } from 'react';
import MainContainer from '../components/MainContainer';
import NavBar from '../components/NavBar';
import ScheduleTable from '../components/ScheduleTable';

export default function Scheduler() {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (newUsername) => {
    if (username !== newUsername) {
      setUsername(newUsername);
    }
  };

  return (

  <MainContainer>
      <NavBar 
        name={username !== '' ? username : undefined} 
        status={username === '' ? undefined : 'logout'} 
      />
      <ScheduleTable onUsernameChange={handleUsernameChange}/>
    </MainContainer>
  )
}