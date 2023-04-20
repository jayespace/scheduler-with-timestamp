import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import MainContainer from '../../components/MainContainer';
import NavBar from '../../components/NavBar';
import { UserForm, InputForm, InputItem, UserButton }  from '../../components/User';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      alert("아이디와 비밀번호를 입력해주세요"); 
    } else if (password !== checkPassword) {
        alert("비밀번호를 다시한번 확인해주세요");
    } else {
      try {
        const data = { username, password };
        await Api.post(`/users/signup`, data);
        alert(`가입이 완료되었습니다\n서비스 이용을 위해 로그인을 해주세요`);
        navigate('/login', { replace: true });
      } catch (error) {
        console.log('회원가입 실패', error);
        alert(error.response.data.error);
      }
    }
  };

  return (
    <MainContainer>
      <NavBar />
      <UserForm title={'회원가입'}>
        <InputForm title={'Username'}>
        <InputItem
            placeholder={'아이디'}
            onChange={setUsername}
            value={username}
          />
        </InputForm>
        <InputForm title={'Password'}>
        <InputItem
            type={'password'}
            placeholder={'비밀번호'}
            onChange={setPassword}
            value={password}
          />
        </InputForm>
        <InputForm title={'Confirm Password'}>
          <InputItem
            type={'password'}
            placeholder={'비밀번호 확인'}
            onChange={setCheckPassword}
            value={checkPassword}
          />
        </InputForm>
        <UserButton onClick={handleRegister}>Submit</UserButton>
      </UserForm>
    </MainContainer>
  );
}