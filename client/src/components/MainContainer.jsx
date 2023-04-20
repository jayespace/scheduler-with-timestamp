import styled from 'styled-components';

export default function MainContainer({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
