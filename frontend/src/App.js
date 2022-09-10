import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {selectUserEmail, selectUserId, selectUserFirstName, selectUserLastName, selectUserName} from './features/userSlice'

function LoggedOut() {
   return (
     <div className="container my-5">
       <h1>Django React Redux Auth</h1>
     </div>
   )
}

function LoggedIn()  {
  return (
    <div className="container my-5">
      <h1>Hello World</h1>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()

  const userName = useSelector(selectUserName)
  const userId = useSelector(selectUserId)
  const userEmail = useSelector(selectUserEmail)
  const userFirstName = useSelector(selectUserFirstName)
  const userLastName = useSelector(selectUserLastName)

  console.log(
    userName,
    userId,
    userEmail,
    userFirstName,
    userLastName
  )
  return (
    <div className="App">
    <h1>Hello world</h1>
    </div>
  );
}

export default App;
