import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './App.css';
import { addUserWithGoogleObject, getUserByFirebaseUId } from '../helpers/data/userData';
import Home from '../views/Home';
import NavBar from '../components/NavBar';
// import Routes from '../helpers/Routes';

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState(false);
  // const [user, setUser] = useState(false);
  useEffect(() => {
    auth?.onAuthStateChanged((userObj) => {
      if (userObj) {
        console.warn(userObj);
        userObj.getIdToken().then((token) => sessionStorage.setItem('token', token));
        getUserByFirebaseUId(userObj.email).then((response) => {
          if (response !== '')
          setUser(response);
          else {
            console.warn('User not found');
          }
        })
        .catch((error) => { 
          console.warn('Create new user');
          addUserWithGoogleObject(userObj);
        });
      }
    });
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar user={user}/>
        <Home />
      </div>
    </Router>
  );
}

export default App;
