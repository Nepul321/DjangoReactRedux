import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogOutState,
  selectUserEmail,
  selectUserId,
  selectUserFirstName,
  selectUserLastName,
  selectUserName,
} from "./features/userSlice";

// function LoggedOut() {
//    return (
//      <div className="container my-5">
//        <h1>Django React Redux Auth</h1>
//      </div>
//    )
// }

// function LoggedIn()  {
//   return (
//     <div className="container my-5">
//       <h1>Hello World</h1>
//     </div>
//   )
// }

function App() {
  const dispatch = useDispatch();

  const usernameLoginRef = useRef();
  const passwordLoginRef = useRef();

  const username = useSelector(selectUserName);
  const userid = useSelector(selectUserId);
  const useremail = useSelector(selectUserEmail);
  const userfirstName = useSelector(selectUserFirstName);
  const userlastName = useSelector(selectUserLastName);

  function getData(jwt) {
    fetch(`http://localhost:8000/api/users/account/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${jwt}`,
      }
    })
  
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
  
    .then((data) => {
      dispatch(setActiveUser({
        userId : data.id,
        userName : data.username,
        userEmail : data.email,
        userFirstName : data.first_name,
        userLastName : data.last_name
      }))
    })
  }
  
  if(localStorage.getItem("jwt") || localStorage.getItem("jwt") === "") {
    getData(localStorage.getItem("jwt"))
  }

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    const data = {
      email: usernameLoginRef.current.value,
      password: passwordLoginRef.current.value,
    };

    const csrftoken = getCookie("csrftoken");

    fetch(`http://localhost:8000/api/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 204) {
          alert("Email or Password not given");
        } else if (res.status === 404) {
          alert("Invalid email");
        } else if (res.status === 401) {
          alert("User not active or wrong password");
        }

        return {};
      })

      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        getData(data.jwt)
      });
    event.target.reset();
  }

  function SignOut() {
    localStorage.removeItem("jwt")
    dispatch(setUserLogOutState());
  }
  return (
    <div className="App">
      <div className="container my-5">
        <h1>Hello world</h1>
        <p>Username : {username}</p>
        <p>Email : {useremail}</p>
        <p>ID : {userid}</p>
        <p>First Name : {userfirstName}</p>
        <p>Last Name : {userlastName}</p>
        <button className="btn btn-secondary my-3" onClick={SignOut}>
          Sign Out
        </button>
      </div>
      <div className="container">
        <h1>Login</h1>
        <hr />
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group mb-3">
            <input
              type={"email"}
              placeholder={"Enter Email"}
              className={"form-control"}
              ref={usernameLoginRef}
              required={true}
              autoComplete={"on"}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type={"password"}
              placeholder={"Enter Password"}
              className={"form-control"}
              ref={passwordLoginRef}
              required={true}
              autoComplete={"current-password"}
            />
          </div>
          <button className="btn btn-dark mb-3">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
