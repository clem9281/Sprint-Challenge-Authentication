import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import withAuth from "../auth/withAuth";

const DadJokes = props => {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    (async function getData() {
      try {
        const jokes = await axios.get("http://localhost:3300/api/jokes");
        setJokes(jokes.data);
      } catch (error) {
        console.error("GET ERROR", error);
      }
    })();
  }, []);
  return (
    <ListGroup className="mt-2">
      <h2 className="text-center">
        Dad Jokes
      </h2>
      {jokes.map(joke => (
        <ListGroupItem key={joke.id}>{joke.joke}</ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default withAuth(DadJokes);
