import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

const SignUp = props => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });
  const { username, password } = userInfo;
  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {

      const newUser = await axios.post(
        "http://localhost:3300/api/register",
        userInfo
      );
      setUserInfo({ username: "", password: "" });
      props.history.push("/login");
    } catch (error) {
      console.error("SIGN UP ERROR", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-2 text-center">Sign Up</h2>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button className="d-block mx-auto" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
