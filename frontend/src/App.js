import React from 'react';
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setActiveUser, setUserLogOutState, selectUserEmail, selectUserId, selectUserFirstName, selectUserLastName, selectUserName} from './features/userSlice'

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
  const dispatch = useDispatch()

  const usernameRef = useRef();
  const userIdRef = useRef();
  const userEmailRef = useRef();
  const userFirstNameRef = useRef();
  const userLastNameRef = useRef();

  const username = useSelector(selectUserName)
  const userid = useSelector(selectUserId)
  const useremail = useSelector(selectUserEmail)
  const userfirstName = useSelector(selectUserFirstName)
  const userlastName = useSelector(selectUserLastName)

  function handleSubmit(event) {
     event.preventDefault();
     let username = usernameRef.current.value
     let id = userIdRef.current.value
     let email = userEmailRef.current.value
     let firstname = userFirstNameRef.current.value
     let lastname = userLastNameRef.current.value
     
     dispatch(setActiveUser({
      userId: id,
      userName: username,
      userEmail : email,
      userFirstName : firstname,
      userLastName : lastname
     }))

     event.target.reset();
  }

  function ResetData() {
      dispatch(setUserLogOutState())
  }
  return (
    <div className="App">
      <div className='container my-5'>
      <h1>Hello world</h1>
      <p>Username : {username}</p>
      <p>Email : {useremail}</p>
      <p>ID : {userid}</p>
      <p>First Name : {userfirstName}</p>
      <p>Last Name : {userlastName}</p>
    <form onSubmit={handleSubmit}>
      <div className='form-group mb-3'>
      <input type={'text'} placeholder={'Enter Username'} className="form-control" ref={usernameRef}/>
      </div>
      <div className='form-group mb-3'>
      <input type={'number'} defaultValue={0} className="form-control" ref={userIdRef}/>
        </div>
        <div className='form-group mb-3'>
        <input type={'email'} placeholder={'Enter Email'} className="form-control" ref={userEmailRef}/>
        </div>
        <div className='form-group mb-3'>
        <input type={'text'} placeholder={'Enter First Name'} className="form-control" ref={userFirstNameRef}/>
        </div>
        <div className='form-group mb-3'>
        <input type={'text'} placeholder={'Enter Last Name'} className="form-control" ref={userLastNameRef}/>
        </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
    <button className='btn btn-secondary my-3' onClick={ResetData}>Reset Data</button>
      </div>
    </div>
  );
}

export default App;
