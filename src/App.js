
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login/Login/Login';
import RequireAuth from './component/Login/RequireAuth/RequireAuth';
import Signup from './component/Login/Signup/Signup';
import Header from './component/Shared/Header/Header';
import TodoHome from './component/TodoHome/TodoHome';

function App() {
  return (
    <div className="App">
      <Header></Header>
    <Routes>
    <Route path="/" element={
          <RequireAuth>
            <TodoHome />
          </RequireAuth>
        }></Route>
    <Route path="/todo" element={
          <RequireAuth>
            <TodoHome />
          </RequireAuth>
        }></Route>
    

        
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
       
      </Routes>
    </div>
  );
}

export default App;
