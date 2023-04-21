import { useState, useEffect } from 'react'
import styled from 'styled-components';
import UpdateModal from './ScheduleUpdate';
import * as Api from '../api'
import { Main, ScheduleControl } from './ScheduleTimer'

export default function ScheduleTable({ onUsernameChange }) {

  const [schedules, setSchedules] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [dateChosen, setDateChosen] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(''); 

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
      alert('일정이 시작되었습니다');
      getData(dateChosen);
    } catch (error) {
        alert(error.response.data.error);
    }
  };

  const handleEndClick = async () => {
    try {
      await Api.patch('/schedules');
      getData(dateChosen);
      alert('일정이 종료되었습니다');
    } catch (error) {
        alert(error.response.data.error);
    }
  };

  const handleDelete = async(scheduleId) => {
    try {
      setSelectedSchedule(scheduleId)
      const { data } = await Api.delete('/schedules', scheduleId)
      getData(data.date);
      alert('일정이 삭제되었습니다');
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
      <ScheduleControl start={'시작'} end={'종료'} onClick1={handleStartClick} onClick2={handleEndClick} />
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
                  ? `${Math.floor(schedule.DurationInMin/60)}시간${schedule.DurationInMin%60}분`
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


const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

const TableInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 510px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  float: left;
  align-items: center;

  @media (max-width: 380px) {
    flex-direction: column;
  }  
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 20px 15px 0;

  @media (max-width: 380px) {
    margin: 5px;
  }
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

  @media (max-width: 510px) {
    margin-top: 5px;
    margin-bottom: 15px;
  }
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

  th, td {
    width: 100px
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: center;

    @media (max-width: 380px) {
      padding: 4px;
    }
  }

  th {
    background-color: #f2f2f2;
    color: #666;

    @media (max-width: 380px) {
      font-size: 11px;
      font-weight: bold;
    }
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
    width: 18%;
  }

  td {
    font-size: 14px;

    @media (max-width: 380px) {
      font-size: 11px;
    }
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;
