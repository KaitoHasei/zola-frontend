import React from 'react'
import { Link } from 'react-router-dom'

const SettingNav = () => {
  return (
    <div>
      <Link to="/updateUser">User</Link>
      <Link to="/account">Account</Link>
    </div>
  )
}

export default SettingNav