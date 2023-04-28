import React from 'react'
import { isLoggedIn } from '../../../auth'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  if (isLoggedIn()) {
    return (
      <>
        Profile
      </>
    )
  }
  else {
    <Navigate to='/login' />
  }
}

export default Profile
