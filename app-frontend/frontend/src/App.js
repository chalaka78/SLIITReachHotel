import './App.css';
import NavBar from './components/navBar/navBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateCategory from './components/createCategory/createCategory';
import CreateRooms from './components/createRoom/createRoom';
import Categories from './components/catogories/categories';
import Rooms from './components/catogories/rooms';

function App() {
  return (
    <div >      
      <Router>
        <NavBar/>
        <section>
          <Switch>
            <Route path= "/create-room" component={CreateRooms} />            
            <Route path= "/create-category" component={CreateCategory} />            
            <Route path= "/:id" component={Rooms} />
            <Route path= "/" component={Categories} exact />
          </Switch>
        </section>
      </Router>
    
    </div>
  );
}
  
export default App; 
