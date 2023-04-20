import { useState, useEffect } from 'react'
import styled from 'styled-components';
import UpdateModal from './Update';
import * as Api from '../api'

export default function ScheduleTable({ onUsernameChange }) {

  const [schedules, setSchedules] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [dateChosen, setDateChosen] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(''); 
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getData = async(chosenDate) => {
    try {
      const { data } = await Api.get('/schedules', chosenDate);

      setSchedules(data.schedules);

      // Sort the dates in descending order
      data.dateList.sort((a, b) => new Date(b) - new Date(a));
      setDateList(data.dateList)

      // username을 NavBar component에 보내는 function
      onUsernameChange(data.username);

    } catch(error) {
      onUsernameChange('');
      alert(error.response.data.error);
      window.location.href = '/'; 
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDateChange = (event) => {
    const DateSelected = event.target.value;
    setDateChosen(DateSelected)

    if (DateSelected === '') {
      getData();
    } else {
      getData(DateSelected);
    }
  };

  const handleStartClick = async () => {
    try {
      await Api.post('/schedules');
      alert('Success');
      getData(dateChosen);
    } catch (error) {
        alert(error.response.data.error);
    }
  };

  const handleEndClick = async () => {
    try {
      await Api.patch('/schedules');
      getData(dateChosen);
      alert('Success');
    } catch (error) {
        alert(error.response.data.error);
    }
  };

  const handleDelete = async(scheduleId) => {
    try {
      setSelectedSchedule(scheduleId)
      const { data } = await Api.delete('/schedules', scheduleId)
      getData(data.date);
      alert('Success');
    } catch (error) {
        alert(error.response.data.error);
    }
  };

  const handleUpdate = (date) => {
    getData(date);
  };

  const handleRadioClick = (scheduleId) => {
    setSelectedSchedule(scheduleId);
  };


  return (
    <Main>
      <ScheduleControl>
        <ControlTitle>
          <h2>현재시간 {currentTime.toLocaleTimeString()}</h2>
          <h3>일정 시작과 종료 시간을 기록해 보세요</h3>
        </ControlTitle>
        <ButtonDiv>          
          <ButtonControl onClick={handleStartClick}>Start</ButtonControl>
          <ButtonControl onClick={handleEndClick}>End</ButtonControl>
        </ButtonDiv>
      </ScheduleControl>

      <Schedule>
        <TableInfo>
          <DateDiv>
          <Title>Schedule of</Title>
          <DateFilter>
            <select onChange={handleDateChange}>
              {dateList.map((date) => (
                <option key={date}>
                  {date}
                </option>
              ))}
            </select>
          </DateFilter>
          </DateDiv>
          <EditButton>
            <UpdateModal 
              id={selectedSchedule}
              handleUpdate={handleUpdate}
              />
            <Button
              onClick={() => handleDelete(selectedSchedule)}
            >Delete</Button>
          </EditButton>
        </TableInfo>

        <Table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>Description</th>
            </tr>
          </thead>
          {schedules && schedules.length > 0 ? (
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.ID}>
                <td>
                  <input 
                    type='radio'
                    name="selectedSchedule"
                    value={schedule.ID}
                    checked={selectedSchedule === schedule.ID}
                    onChange={() => handleRadioClick(schedule.ID)} />
                </td>
                <td>{schedule.Date}</td>
                <td>{schedule.CreatedTime}</td>
                <td>{schedule.EndedTime}</td>
                <td>{schedule.DurationInMin >= 60 
                  ? `${Math.floor(schedule.DurationInMin/60)}시간 ${schedule.DurationInMin%60}분`
                  : `${schedule.DurationInMin}분`
                }</td>
                <td>{schedule.Description}</td>
              </tr>
            ))}
          </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">No schedules found</td>
                </tr>
              </tbody>
            )}
        </Table>
      </Schedule>
    </Main>
  )
};


const Main = styled.div`
  display: flex
  flex: 1;
  padding: 20px;
`;

const ScheduleControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  align-items: center;
  width: 35%;
`;

const ControlTitle = styled.div`
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: 30px;
`;

const ButtonControl = styled.button`
  padding: 20px 10px;
  font-size: 2 rem;
  width: 120px;
  cursor: pointer;
  margin: 10px 10px;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 20px 15px 0;
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  float: left;
  align-items: center;
`;

const TableInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const DateFilter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 35px;

  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const EditButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px;
  margin-left: 10px;
  cursor: pointer;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  // table-layout: fixed;

  th, td {
    width: 100px
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    color: #666;
    font-weight: normal;
  }

  th:nth-child(1) {
    width: 8%;
  }

  th:nth-child(2) {
    width: 15%;
  }

  th:nth-child(3),th:nth-child(4) {
    width: 10%
  } 

  th:nth-child(5) {
    width: 15%;
  }

  td {
    font-size: 14px;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;
