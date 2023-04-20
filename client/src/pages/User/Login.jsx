import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import MainContainer from '../../components/MainContainer';
import NavBar from '../../components/NavBar';
import { UserForm, InputForm, InputItem, UserButton } from '../../components/User';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요.');
    } else {
      try {
        const data = { username, password };
        await Api.post('/users/login', data)
        navigate('/scheduler', { replace: true });
      } catch (error) {
        console.log('로그인 실패', error);
        alert(error.response.data.error)
      }
    }
  };

  return (
    <MainContainer>
      <NavBar />
      <UserForm title={'로그인'}>
        <InputForm title={'Username'}>
          <InputItem
            placeholder={'아이디'}
            onChange={setUsername}
          />
        </InputForm>
        <InputForm title={'Password'}>
          <InputItem
            placeholder={'비밀번호'}
            type={"password"}
            onChange={setPassword}
          />
        </InputForm>
        <UserButton onClick={handleLogin}>Submit</UserButton>
      </UserForm>
    </MainContainer>
  );
}
