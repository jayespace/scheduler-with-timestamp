import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from '../api'
import "../style.css";

export default function UpdateModal({ id = '', handleUpdate }) {

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState('');

  const toggleModal = () => {
    setModal(!modal)
  }
  
  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await Api.patch(`/schedules/${id}`, { Description: description });
      handleUpdate(data.date);
      toggleModal();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    setDescription('');
  }, [modal]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <Button 
      onClick={id !== '' ? toggleModal : () => alert("스케줄을 선택해주세요")}>
        Edit
      </Button>
      {modal && (
        <ModalContainer>
        <Overlay onClick={toggleModal} />
        <ModalContent>
          <h2>Description 수정</h2>
          <InputBox type="text" value={description} onChange={handleInputChange}>
          </InputBox>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          <CloseButton
          onClick={toggleModal}>X</CloseButton>
        </ModalContent>
      </ModalContainer>
      )}
    </>
  )
};

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled(ModalContainer)`
  background: rgba(49,49,49,0.8);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px 25px 25px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
`;

const Button = styled.button`
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  padding: 8px;
  margin-left: 4px;
`;

const InputBox = styled.input`
  width: 70%;
  height: 40px;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 1px 4px;
  cursor: pointer;
`;