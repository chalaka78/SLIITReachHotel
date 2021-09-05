import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createReservationAction } from "../../actions/reservationsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateReservation({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const reservationCreate = useSelector((state) => state.reservationCreate);
  const { loading, error, reservation } = reservationCreate;

  console.log(reservation);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReservationAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/myreservations");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Make a Reservation">
      <Card>
        <Card.Header>Make a new Reservation</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Select the room"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Date</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Select the date"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Reservation Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
               Reserve
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Reserve on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateReservation;
