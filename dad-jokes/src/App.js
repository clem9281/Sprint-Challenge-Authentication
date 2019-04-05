import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import SignUp from "./components/SignUp";
import DadJokes from "./components/DadJokes";

class App extends Component {
  render() {
    return (
      <article>
        <NavigationBar />
        <Container>
          <Row>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 10, offset: 1 }}
              md={{ size: 8, offset: 2 }}
              lg={{ size: 6, offset: 3 }}
            >
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/" exact component={DadJokes} />
            </Col>
          </Row>
        </Container>
      </article>
    );
  }
}

export default App;
