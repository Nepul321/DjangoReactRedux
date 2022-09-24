import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    setUserLogOutState,
    selectUserEmail,
    selectUserId,
    selectUserFirstName,
    selectUserLastName,
    selectUserName,
  } from "../features/userSlice";

function Home() {
    if(!localStorage.getItem("jwt")) {
        window.location.href = "/login"
    }
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    const userid = useSelector(selectUserId);
    const useremail = useSelector(selectUserEmail);
    const userfirstName = useSelector(selectUserFirstName);
    const userlastName = useSelector(selectUserLastName);


    function SignOut() {
        localStorage.removeItem("jwt");
        dispatch(setUserLogOutState());
        window.location.href = "/login"
    }
 return (
    <div className="home">
        <div className="container my-5">
        <h1>Hello {userfirstName}</h1>
        <p>Username : {username}</p>
        <p>Email : {useremail}</p>
        <p>ID : {userid}</p>
        <p>First Name : {userfirstName}</p>
        <p>Last Name : {userlastName}</p>
        <button className="btn btn-secondary" onClick={SignOut}>Sign Out</button>
        </div>
    </div>
 )
}

export default Home;