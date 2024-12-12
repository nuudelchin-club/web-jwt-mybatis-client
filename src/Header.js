import React, { useEffect, useState } from 'react';

function Header({setLogout}) {
    return (
        <header className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Миний Вэбсайт</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-blue-200">Нүүр</a></li>
                <li><a href="/about" className="hover:text-blue-200">Бидний тухай</a></li>
                <li><a href="/contact" className="hover:text-blue-200">Холбоо</a></li>
                <li>
                    <a href="/logout" className="hover:text-blue-200"
                        onClick={() => setLogout(true)}>
                        Гарах
                    </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
    );
}

export default Header;
