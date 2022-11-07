import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';

function App() {
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/hotels', component: <List /> },
    { path: '/hotels/:id', component: <Hotel /> },
    { path: '/login', component: <Login /> },
    { path: '/register', component: <Register /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item, index) => (
          <Route Key={index} path={item.path} element={item.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
