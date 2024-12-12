import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Body from './Body';
import Side from './Side';
import Footer from './Footer';

async function refreshAccessToken() {
  try {
    const response = await fetch('http://localhost:8080/reissue', {
      method: 'POST',
      credentials: "include",
    });
    if(response.ok) {
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
  const [userData, setUserData] = useState({});
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = await refreshAccessToken();
        if(accessToken) {
          setAuthorized(1);   
          onUserAPI();       
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

  if(logout) {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    })
    .then((response) => { 
      if (response.ok) {
        setAuthorized(2);
        setUserData({});
      }
    })
    .then((data) => {  })
    .catch((error) => { console.error('Error:', error); })
  }

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
          onUserAPI();      
        } 
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onUserAPI = async () => {
    try {
      const accessToken = await refreshAccessToken();
      if(accessToken) {
        fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: "include",
          headers: { 
            'Content-Type': 'application/json', 
            'access' : accessToken
          },
        })
        .then((response) => { 
          if (response.ok) { 
            return response.json(); 
          }
        })
        .then((data) => { 
          setUserData(data);
        })
        .catch((error) => { console.error('Error:', error); })
      } 
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  if(authorized === 1) {
    
    // return (
    //   <div>
    //     <h1>Main page</h1>
    //     <h3>{userData.username}</h3>
    //     <h3>{userData.role}</h3>        
    //     <button onClick={onLogout}>logout</button>        
    //   </div>
    // );

    return (
      <div className="flex flex-col min-h-screen">
        <Header setLogout={setLogout}/>
        <div className="flex flex-1">
          <Nav />
          <Body prop={userData}/>
          <Side />
        </div>
        <Footer />
      </div>
    );

  } else if(authorized === 2) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Нэвтрэх</h2>
          <form onSubmit={onLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Хэрэглэгчийн нэр
              </label>
              <input
                type="text"
                id="username"
                placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Нууц үг
              </label>
              <input
                type="password"
                id="password"
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Нэвтрэх
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4">
            Бүртгэл байхгүй юу?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Бүртгүүлэх
            </a>
          </p>
        </div>
      </div>

      // <form onSubmit={onLogin}>
      //   <h1>Нэвтрэх</h1>
      //   <hr></hr>
      //   <br></br>
      //   <input
      //     type="text"
      //     placeholder="username"
      //     value={username}
      //     onChange={(e) => setUsername(e.target.value)}
      //     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      //   />
      //   <br></br><br></br>
      //   <input
      //     type="password"
      //     placeholder="password"
      //     value={password}
      //     onChange={(e) => setPassword(e.target.value)}
      //     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      //   />
      //   <br></br><br></br>
      //   <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">login</button>
      // </form>
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
