import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/home';
import CadDespesa from './pages/cad-despesa/cad-despesa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/despesa/:idUrl' element={<CadDespesa />}/>
  </Routes>
</BrowserRouter>
);

