import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { setActiveUser } from "./features/userSlice";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const dispatch = useDispatch();
  function getData(jwt) {
    fetch(`http://localhost:8000/api/users/account/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        return {
          id: null,
          username: null,
          email: null,
          first_name: null,
          last_name: null,
        };
      })

      .then((data) => {
        dispatch(
          setActiveUser({
            userId: data.id,
            userName: data.username,
            userEmail: data.email,
            userFirstName: data.first_name,
            userLastName: data.last_name,
          })
        );
      });
  }

  if(localStorage.getItem("jwt")) {
    getData(localStorage.getItem("jwt"))
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/account" exact element={<Account />}></Route>
        <Route path="/password" exact element={<ChangePassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
