import "./App.css";
import Main from "./Components/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
// import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import Pay from "./Components/Pay/Pay";
import Cancel from "./Components/Pay/Cancel";
import Success from "./Components/Pay/Success";
import Dashboard from "./chats/modules/Dashboard/index";
import Form from "./chats/modules/Form/index";

function App() {
  const user = useSelector((state) => state.user.user);
  console.log("User: ", user);
  const { authUser } = user;
  console.log("authUser: ", authUser);

  const ProtectedRoute = ({ children, auth = false }) => {
    const isLoggedIn = localStorage.getItem("user:token") !== null || false;

    if (!isLoggedIn && auth) {
      return <Navigate to={"/users/sign_in"} />;
    } else if (
      isLoggedIn &&
      ["/users/sign_in", "/users/sign_up"].includes(window.location.pathname)
    ) {
      console.log("object :>> ");
      return <Navigate to={"/"} />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            // element={authUser ? <Main></Main> : <Login></Login>}
            element={<Main></Main>}
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute auth={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/sign_in"
            element={
              <ProtectedRoute>
                <Form isSignInPage={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/sign_up"
            element={
              <ProtectedRoute>
                <Form isSignInPage={false} />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route
            path="/filteredProducts/:type/:id"
            element={<FilteredProducts />}
          />
          <Route
            path="/filteredProducts/:type"
            element={<SingleProduct></SingleProduct>}
          />
          {/* <Route
            path="/filteredProducts/:type"
            element={<FilteredProducts></FilteredProducts>}
          ></Route>
          <Route
            path="/filteredProducts/:type/:id"
            element={<SingleProduct></SingleProduct>}
          ></Route> */}
          <Route path="pay" element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
