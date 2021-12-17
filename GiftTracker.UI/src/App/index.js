import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from '../components/NavBar';
import GTRoutes from '../helpers/GTRoutes';

const App = () => {
//  const auth = getAuth();
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser} />
        <GTRoutes user={user} />
      </div>
    </BrowserRouter>
  );
}

export default App;
