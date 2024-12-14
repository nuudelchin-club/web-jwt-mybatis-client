import React, { useEffect, useState } from 'react';

function Body({user, resetTime, time}) {
    return (
        <div className="flex-grow p-6 bg-white">
          <h1 className="text-3xl font-bold mb-4">Үндсэн агуулга</h1>
          <p>Энд таны үндсэн контент байрлана.</p>
          <p>Username is {user.username}</p>
          <p>Role is {user.role}</p>
          <button 
            className="pr-4 pl-4 bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
            onClick={resetTime}>
            Reset Time
          </button>
          <p>Time is {time.time}</p>
        </div>
    );
}

export default Body;
