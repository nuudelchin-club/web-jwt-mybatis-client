import React, { useEffect, useState } from 'react';

function Body({prop}) {
    return (
        <div className="flex-grow p-6 bg-white">
          <h1 className="text-3xl font-bold mb-4">Үндсэн агуулга</h1>
          <p>Энд таны үндсэн контент байрлана.</p>
          <p>Username is {prop.username}</p>
          <p>Role is {prop.role}</p>
        </div>
    );
}

export default Body;
