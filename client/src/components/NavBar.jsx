import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../api'

export default function NavBar({ name, status }) {
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await Api.post('/users/logout')
      alert('로그아웃되었습니다')
      navigate('/', { replace: true })
    } catch(error) {
      alert(error.message);
    }
  };

  return (
    <NavContainer>
      <Link to = '/'>
        <Logo>Schedule Manager</Logo>
      </Link>
      <NavButtons>
        {name ? (
          <Username>WELCOME {name}!</Username>
        ) : (
          <SignupButton onClick={() => navigate('/signup')}>
            Sign Up
          </SignupButton>
        )}
        {status === 'logout' ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <Button onClick={() => navigate('/login')}>Log In</Button>
        )}
      </NavButtons>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
height: 80px;
background-color: #1e212d;
color: #fff;
`;

const Logo = styled.h2`
  font-size: 24px;
  margin-left: 20px;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  }
`;

const NavButtons = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-right: 20px;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ff6f00;
  color: #fff;
  cursor: pointer;
`;

const SignupButton = styled(Button)`
  background-color: #1e212d;
  color: #ff6f00;
`;

const Username = styled(Button)`
  background-color: #1e212d;
  color: #ff6f00;
  cursor: default;
  text-transform: uppercase;
`;