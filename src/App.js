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


function App() {
  const loggedIn = window.localStorage.getItem("isUserLoggedIn");
  
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: loggedIn ? <DisplayNotes /> : <Login />,
  //     // element: <Protected Component={DisplayNotes}/>,
  //   },
  //   {
  //     path: "SignUp",
  //     // element: <SignUp />,
  //     element: loggedIn ? <DisplayNotes /> : <SignUp />,
  //   },
  //   {
  //     path: "login",
  //     // element: <Login />,
  //     element: loggedIn ? <DisplayNotes /> : <Login />,
  //   }
  // ]);
  

  return (
    <div className="app">
      {/* <RouterProvider router = {router} /> */}
      <DisplayNotes />
    </div>
  );
}

export default App;
