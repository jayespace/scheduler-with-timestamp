import styled from 'styled-components';

function UserForm({ title, children }) {
  return (
    <SignupContainer>
      <Title>{title}</Title>
      {children}
    </SignupContainer>
  )
}

function InputForm({ title, children }) {
  return (
    <InputBox>
      <InputTitle>{title}</InputTitle>
      {children}
    </InputBox>
  )
}

function InputItem({ type = '', placeholder, onChange, value }) {
  return (
    <InputHandler
    type={type}
    placeholder={placeholder}
    onChange={(e) => {
      onChange(e.target.value)
    }}
    value={value}
  />
  )
}

function UserButton({ onClick, children }) {
  return (
    <SignupButton onClick={onClick}>
      {children}
    </SignupButton>
  )
}

export { UserForm, InputForm, InputItem, UserButton  };

const SignupContainer = styled.div`
  margin: auto;
  background-color: white;
  width: 480px;
  height: 480px;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 10px 5px 5px lightgray;
`;

const Title = styled.h2`
  margin-top: 20px;
`;

const InputBox = styled.form`
  margin: 0 auto;
  margin-top: 25px;
  width: 400px;
  height: 70px;
  font-size: medium;
  display: block;
`; 

const InputTitle = styled.h4`
  margin-left: 45px;
  text-align: left;
  margin-bottom: 7px;
`;

const InputHandler = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid #dbdbdb;
  padding-left: 10px;
`;

const SignupButton = styled.button`
  width: 130px;
  height: 50px;
  margin: 50px 180px;
  color: white;
  background-color: #FD7E14;
  border: 1px solid transparent;
  font-size: medium;
  border-radius: 5px;
  cursor:pointer;
`;