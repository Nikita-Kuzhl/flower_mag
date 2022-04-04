import React from 'react'
import Admin from '../components/Cabinet/Admin'
import Client from '../components/Cabinet/Client'
import role from '../store/role'

const Cabinet = () => {
  return (
    <div>
      {role.isAdmin?<Admin/>:<Client/>}
    </div>
  )
}

export default Cabinet