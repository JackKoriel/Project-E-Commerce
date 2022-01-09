import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

const SignIn = ({ user, setUser }) => {
  // Initial state of state variable inputData.
  const initialState = {
    username: "",
    password: "",
  };

  // This state variable will contain the user input as they complete the sign-in form. Initial state is declared above.
  const [inputData, setInputData] = useState(initialState);

  const history = useHistory();

  // This function will be executed when the user has completed the form and clicked the Confirm button.
  const handleClick = (ev) => {
    ev.preventDefault();

    // The data to be sent to the backend is the user input from the form.
    const data = {
      firstname: inputData.firstName,
      lastname: inputData.lastname,
      email: inputData.email,
    };

    // Send user information to the back end.
    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser(data);
          history.push("/");
        } else {
          alert("Firstname or Lastname or email address is incorrect.");
        }
      });
  };

  let readyToSubmit = false;

  // Data validation for the user sign-in form.
  if (
    inputData.firstName !== "" &&
    inputData.lastName !== "" &&
    inputData.email !== ""
  ) {
    // If the user input in the form meets all the requirements, `readyToSubmit` becomes true and the Confirm button is enabled.
    readyToSubmit = true;
  }

  return (
    <Wrapper>
      <Title>Sign In</Title>

      <Form onSubmit={handleClick}>
        <Container>
          <Box>
            <Label for="firstName">First Name: </Label>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={(ev) => {
                setInputData({ ...inputData, firstName: ev.target.value });
              }}
            />
          </Box>
          <Box>
            <Label for="lastName"> Last Name: </Label>
            <Input
              type=" Last Name"
              placeholder=" Last Name"
              name="lastName"
              onChange={(ev) => {
                setInputData({ ...inputData, lastName: ev.target.value });
              }}
            />
          </Box>
          <Box>
            <Label for="email"> Email Address: </Label>
            <Input
              type=" email"
              placeholder="Email Address "
              name="Email Address"
              onChange={(ev) => {
                setInputData({ ...inputData, email: ev.target.value });
              }}
            />
          </Box>
        </Container>
        <Div>
          <Button type="reset">Clear</Button>
          {readyToSubmit ? (
            <Button type="submit">Confirm</Button>
          ) : (
            <Button type="submit" disabled>
              Confirm
            </Button>
          )}
        </Div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-color: lightgray;
  width: 50vw;
  height: 60vh;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 50px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bolder;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  margin: 40px;
  position: relative;
  padding: 24px;
  background-color: var(--color-keppel);
  width: 450px;
  padding: 24px;
  margin-top: 32px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  font-size: 15px;
`;
const Input = styled.input`
  border: #d2d2d2 1px solid;
  border-radius: 4px;
  margin: 10px;

  padding: 10px;
  height: 20px;
  width: 200px;
`;
const Label = styled.div`
  margin: 20px;
`;
const Button = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  height: 30px;
  width: 120px;
  padding: 10px 20px;
  border-radius: 7px;
  justify-content: center;
  cursor: pointer;
  border: none;
  background-color: var(--color-elm);
  color: var(--color-tahuna-sands);
  transition: 200ms ease-in-out;
  &:hover {
    background-color: var(--color-tahuna-sands);
    color: var(--color-elm);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SignIn;
