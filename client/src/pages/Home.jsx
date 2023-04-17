import MainContainer from '../components/MainContainer';
import NavBar from '../components/NavBar';

export default function Home() {

  return (
    <MainContainer>
      <NavBar status={"Log In"}/>
      <div>
        <h1>하루 스케줄 관리를 할 수 있는 서비스입니다</h1>
        <h2>서비스 이용을 위해 로그인을 해주세요</h2>
      </div>
    </MainContainer>
  );
}