import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useRef} from 'react'
import getCookie from '../utilities/csrf';
import {
    setActiveUser,
    selectUserEmail,
    selectUserFirstName,
    selectUserLastName,
    selectUserName,
  } from "../features/userSlice";

function Account() {
    const dispatch = useDispatch();

    if(!localStorage.getItem("jwt")) {
        window.location.href = "/login"
    }


    function handleSubmit(e) {
     e.preventDefault();

     const data = {
        email : email_ref.current.value,
        username : username_ref.current.value,
        first_name : first_name_ref.current.value,
        last_name : last_name_ref.current.value
     }

     const csrftoken = getCookie("csrftoken");
     const jwt = localStorage.getItem("jwt");
     fetch(`http://localhost:8000/api/users/account/`, {
        method : "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${jwt}`,
            "X-CSRFToken": csrftoken
          },
        body : JSON.stringify(data)
     })

     .then((res) => {
        if(res.status === 200) {
            return res.json();
        }
        return false;
     })

     .then((data) => {
        if(data !== false) {
            dispatch(setActiveUser( {
                userId: data.id,
                userName: data.username,
                userEmail: data.email,
                userFirstName: data.first_name,
                userLastName: data.last_name,
             }))

             alert("Changes Saved")
        }
     })
    }

    const email = useSelector(selectUserEmail)
    const username = useSelector(selectUserName)
    const first_name = useSelector(selectUserFirstName)
    const last_name = useSelector(selectUserLastName)

    const email_ref = useRef();
    const username_ref = useRef();
    const first_name_ref = useRef();
    const last_name_ref = useRef();

    


    return (
        <div className="Account">
           <div className='container my-5'>
             <h1>Account</h1>
             <hr />
             <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                <input type={'text'} className={'form-control'} placeholder={"Username"} ref={username_ref} defaultValue={username} required={true}/>
                </div>
                <div className='form-group mb-3'>
                <input type={'email'} className={'form-control'} placeholder={"Email"} ref={email_ref} defaultValue={email} required={true}/>
                </div>
                <div className='form-group mb-3'>
                <input type={'text'} className={'form-control'} placeholder={"First Name"} ref={first_name_ref}  defaultValue={first_name} required={true} />
                </div>
                <div className='form-group mb-3'>
                <input type={'text'} className={'form-control'} placeholder={"Last Name"} ref={last_name_ref} defaultValue={last_name} required={true}/>
                </div>
                   <button className='btn btn-outline-primary my-2'>Save</button>
             </form>
             <a href='/' className='btn btn-secondary my-5'>Back to Home</a>
           </div>
        </div>
    )
}

export default Account;