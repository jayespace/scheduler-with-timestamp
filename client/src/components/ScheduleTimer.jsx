import { useState, useEffect } from 'react';
import styled from 'styled-components';

function Main({ children }) {
    return (
      <MainDiv>
        {children}
      </MainDiv>
    )
  }

function ScheduleControl({ start, end, onClick1, onClick2 }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
      <ScheduleControlDiv>
        <ControlTitleDiv>
          <h2>현재시간 {currentTime.toLocaleTimeString()}</h2>
          <h3>시작과 종료 시간을 기록해보세요</h3>
        </ControlTitleDiv>
        <ButtonDiv>          
          <ButtonControl onClick={onClick1}>{start}</ButtonControl>
          <ButtonControl onClick={onClick2}>{end}</ButtonControl>
        </ButtonDiv>
      </ScheduleControlDiv>
  )
};


export { Main, ScheduleControl}


const MainDiv = styled.div`
  display: flex
  flex-direction: row;
  padding: 20px;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const ScheduleControlDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  align-items: center;
  width: 35%;

  @media (max-width: 780px) {
    width: 100%;
    float: center;
    margin: 0 auto;
  }

  @media (max-width: 380px) {
    width: 330px;
    float: center;
    margin: 0 auto;
  }

`;

const ControlTitleDiv = styled.div`
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