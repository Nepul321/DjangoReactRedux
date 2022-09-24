import React from "react";
import {useRef} from 'react'
import getCookie from "../utilities/csrf";
function Login() {
    const usernameLoginRef = useRef();
    const passwordLoginRef = useRef();


    if(localStorage.getItem("jwt")) {
        window.location.href = "/"
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
      
              return {jwt : ""};
            })
      
            .then((data) => {
              localStorage.setItem("jwt", data.jwt);
              window.location.href = "/"
            });

            event.target.reset();
    }
    return (
        <div className="Login">
            <div className="container my-5">
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
    )
}

export default Login;