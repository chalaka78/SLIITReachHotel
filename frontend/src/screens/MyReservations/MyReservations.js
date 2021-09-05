import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteReservationAction, listReservations } from "../../actions/reservationsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyReservations({ history, search }) {
  const dispatch = useDispatch();

  const reservationList = useSelector((state) => state.reservationList);
  const { loading, error, reservations } = reservationList;

  // const filteredNotes = reservations.filter((reservation) =>
  //   reservation.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reservationDelete = useSelector((state) => state.reservationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reservationDelete;

  const reservationCreate = useSelector((state) => state.reservationCreate);
  const { success: successCreate } = reservationCreate;

  const reservationUpdate = useSelector((state) => state.reservationUpdate);
  const { success: successUpdate } = reservationUpdate;

  useEffect(() => {
    dispatch(listReservations());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteReservationAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(reservations)}
      <Link to="/createreservation">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Make new Reservation
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {reservations &&
        reservations
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((reservation) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={reservation._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(reservation)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {reservation.title}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/reservation/${reservation._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(reservation._id)}
                    >
                      Cancel Reservation
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {reservation.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{reservation.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {reservation.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyReservations;
