import React from 'react'
import { useRef } from 'react';
import getCookie from '../utilities/csrf';

function ChangePassword() {
   if(!localStorage.getItem("jwt")) {
      window.location.href = "/login"
    }
  const current_password_ref = useRef();
  const new_password1_ref = useRef();
  const new_password2_ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
        old_password : current_password_ref.current.value,
        new_password1 : new_password1_ref.current.value,
        new_password2 : new_password2_ref.current.value
    }

    const csrf = getCookie('csrftoken');
    const jwt = localStorage.getItem("jwt");

    fetch(`http://localhost:8000/api/users/password/`, {
        method : "POST",
        headers : {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
        "X-CSRFToken": csrf
        },
        body : JSON.stringify(data)
    })

    .then((res) => {
        if(res.status === 200) {
            return res.json();
        } else {
            alert("Failed to change password. Please try again.")
        }

        return false
    })

    .then((data) => {
        if(data !== false) {
            localStorage.setItem("jwt", data.jwt)
            alert("Password changed")
        }
    })

    
    e.target.reset();
  }
  return (
    <div className='changepassword'>
        <div className='container my-5'>
        <h1>Change Password</h1>
        <hr />
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
            <input
              type={"password"}
              placeholder={"Current Password"}
              className={"form-control"}
              ref={current_password_ref}
              required={true}
              autoComplete={"current-password"}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type={"password"}
              ref={new_password1_ref}
              autoComplete={"new-password"}
              placeholder={"Enter New Password"}
              className={"form-control"}
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type={"password"}
              ref={new_password2_ref}
              autoComplete={"new-password"}
              placeholder={"Confirm New Password"}
              className={"form-control"}
              required={true}
            />
          </div>
          <button className='btn btn-primary'>Change</button>
        </form>
        <div className='my-3'>
            <a href='/account' className='btn btn-secondary'>Back to account</a>
        </div>
        </div>
    </div>
  )
}

export default ChangePassword;