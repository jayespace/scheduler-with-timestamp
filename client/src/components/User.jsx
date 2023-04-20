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
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}

export { UserForm, InputForm, InputItem, UserButton  };

const SignupContainer = styled.div`
  margin: auto;
  margin-top: 30px;
  background-color: white;
  width: 480px;
  height: 450px;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 10px 5px 5px lightgray;

  @media (max-width: 380px) {
    width: 310px;
    height: 400px;
    margin: 0;
    box-shadow: none;
  }
`;

const Title = styled.h2`
  margin-top: 20px;

  @media (max-width: 380px) {
    margin-left: 60px;
  }

`;

const InputBox = styled.form`
  margin: 0 auto;
  margin-top: 20px;
  width: 400px;
  height: 70px;
  font-size: medium;
  display: block;

  @media (max-width: 380px) {
    width: 250px;
    height: 70px;
    font-size: small;
  }
`; 

const InputTitle = styled.h4`
  margin-left: 45px;
  text-align: left;
  margin-bottom: 7px;

  @media (max-width: 380px) {
    margin-left: 8px;
  }
`;

const InputHandler = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid #dbdbdb;
  padding-left: 10px;
`;

const Button = styled.button`
  width: 130px;
  height: 50px;
  margin: 30px 180px;
  color: white;
  background-color: #FD7E14;
  border: 1px solid transparent;
  font-size: medium;
  border-radius: 5px;
  cursor:pointer;

  @media (max-width: 380px) {
    width: 100px;
    height: 40px;
    margin: 20px 0px 0px 70px;
    justify-content: center;
    font-size: small;
  }
`;