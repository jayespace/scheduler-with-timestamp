import styled from 'styled-components';
import MainContainer from '../components/MainContainer';
import NavBar from '../components/NavBar';
import { Main, ScheduleControl } from '../components/ScheduleTimer';

export default function Home() {

  const handleClick = () => {
    alert("로그인이 필요합니다")
  }

  return (
    <MainContainer>
      <NavBar status={"Log In"}/>
      <Main>
        <ScheduleControl start={'시작'} end={'종료'} onClick1={handleClick} onClick2={handleClick}/>
        <Info>
          <h2>일정을 시간과 함께 기록하여 날짜별로 확인할 수 있는 서비스입니다 📆</h2>
          <div>
            <Desc>📌 버튼을 눌러 시작 시간과 종료시간을 실시간으로 기록할 수 있습니다 </Desc>
            <Desc>📌 종료 버튼을 누르면 해당 일정이 얼마나 소요되었는지 알 수 있습니다 </Desc>
            <Desc>📌 일정에 대한 메모를 남길 수 있고 메모는 언제든지 수정할 수 있습니다 </Desc>
            <Desc>📌 기록된 일정을 삭제할 수 있습니다 </Desc>
          </div>
        </Info>
      </Main> 

    </MainContainer>
  );
}

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 0 auto;

  @media (max-width: 780px) {
    width: 100%;
    margin-top: 35px;
  }
`;

const Desc = styled.h3`
  margin-top: 8px;
`;
