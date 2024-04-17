import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabelaProduct from "./tabelas/TabelaProduct.jsx";
import FormProduct from "./Formularios/FormProduct.jsx";
import {Editar} from "./Formularios/EditarProduct.jsx";
import './App.scss';
import 'boxicons/css/boxicons.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/product" element={<TabelaProduct />}/>
          <Route path="/cadastrar" element={<FormProduct />}/>
          <Route path="/editar/:id" element={<Editar />}/>
          <Route path="/" element={<TabelaProduct />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
