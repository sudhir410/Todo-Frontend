
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login/Login';
import Register from './component/Register/Register'
import Todo from './component/Todo/Todo';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
