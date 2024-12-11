import React, { useEffect, useState } from 'react';

async function refreshAccessToken() {
  try {
    const response = await fetch('http://localhost:8080/reissue', {
      method: 'POST',
      credentials: "include",
    });
    if(response.status === 200) {
      const accessToken = response.headers.get('access'); 
      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
      console.error('Error:', error);
  }
};

function Home() {
  
  const [authorized, setAuthorized] = useState(0);  // 0:loading, 1:authorized, 2:unauthorized
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = await refreshAccessToken();
        if(accessToken) {
          setAuthorized(1);          
        } else {
          setAuthorized(2);
        } 
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
    init();
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const accessToken = response.headers.get('access'); 
        if(accessToken) {
          setAuthorized(1);      
        } 
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const onLogout = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    })
    .then((response) => { 
      if (response.ok) {
        setAuthorized(2);
      }
    })
    .then((data) => {  })
    .catch((error) => { console.error('Error:', error); })
  }


  if(authorized === 1) {
    
    return (
      <div>
        <h1>Main page</h1>
        <button onClick={onLogout}>logout</button>
      </div>
    );

  } else if(authorized === 2) {

    return (
      <form onSubmit={onLogin}>
        <h1>Нэвтрэх</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    );

  } else {
    
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  }   

}

export default Home;
