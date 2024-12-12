import React, { useEffect, useState } from 'react';

function Nav() {
    return (
        <div className="w-64 bg-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4">Цэс</h2>
          <ul>
            <li className="mb-2"><a href="/dashboard" className="text-blue-600">Хяналтын самбар</a></li>
            <li className="mb-2"><a href="/profile" className="text-blue-600">Профайл</a></li>
            <li className="mb-2"><a href="/settings" className="text-blue-600">Тохиргоо</a></li>
          </ul>
        </div>
    );
}

export default Nav;
