import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import People from './components/People';


function App() {
  
 
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">SWAPI Client</a>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/:id" element={<People />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
