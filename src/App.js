import './App.scss';
import Protected from './Protected';
import DisplayNotes from './components/DisplayNotes';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
  RouterProvider,
} from "react-router-dom";

// const loggedIn = window.localStorage.getItem("isUserLoggedIn");

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected Component={DisplayNotes}/>,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <Login />,
    }
  ]);
  

  return (
    <div className="app">
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
