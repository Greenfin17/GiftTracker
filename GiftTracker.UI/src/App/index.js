import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './App.css';
import Home from '../views/Home';
import NavBar from '../components/NavBar';
// import Routes from '../helpers/Routes';

const App = () => {
  const auth = getAuth();
  // const [user, setUser] = useState(false);
  useEffect(() => {
    auth?.onAuthStateChanged((userObj) => {
      if (userObj) {
        userObj.getIdToken().then((token) => sessionStorage.setItem('token', token));
      }
    });
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar />
        <Home />
      </div>
    </Router>
  );
}

export default App;
