import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from '../components/NavBar';
import GTRoutes from '../helpers/GTRoutes';
import { getUserByFirebaseUId } from '../helpers/data/userData';

const App = () => {
//  const auth = getAuth();
  const [user, setUser] = useState(false);
  useEffect(() => {
    let mounted = true;
    let token = sessionStorage.getItem('token');
    if (token && !user) {
      const tokenData = jwtDecode(token);
      getUserByFirebaseUId(tokenData.user_id).then((response) => {
        if (response !== '' && mounted) {
        setUser(response);
        } else setUser(false)
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  });

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser} />
        <GTRoutes user={user} setUser={setUser} />
      </div>
    </BrowserRouter>
  );
}

export default App;
