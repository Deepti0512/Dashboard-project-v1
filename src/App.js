import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Settings from "./pages/Settings";
// import Logout from "./components/Logout";

// function App() {
  

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           //Todo: make home and projects route protected
//           <Route path="/" exact element = {<Home/>}></Route>
//         
//         </Routes>  
//       </BrowserRouter>
//     </div>
//   );
// }


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/projects" exact element = {<Projects/>}></Route>
            <Route path="/settings" exact element = {<Settings/>}></Route>
            {/* <Route path="/logout" exact element = {<Logout/>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App;