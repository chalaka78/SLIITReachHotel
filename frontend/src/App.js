import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyReservations from "./screens/MyReservations/MyReservations";
import SingleReservation from "./screens/SingleReservation/SingleReservation";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateReservation from "./screens/SingleReservation/CreateReservation";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/myreservations"
          component={({ history }) => (
            <MyReservations search={search} history={history} />
          )}
        />
        <Route path="/reservation/:id" component={SingleReservation} />
        <Route path="/createreservation" component={CreateReservation} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}



export default App;
