import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const {name, blogs} = user
  
  return (
    <table>
      
        <th></th>
        <th>blogs created</th>
      <tbody>
        <tr>
          <Link to={`/users/${user.id}`}>
            <td>{name}</td>
          </Link>
          <td>{blogs.length}</td>  
        </tr>
      </tbody>
    </table>
  )
}

const Users = () => {
  const users = useSelector(({users}) => users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (users == null) {
    return
  }
  return (
    <div>
      <h2>Users</h2>
      {
        users.map(user => <User key={user.id} user={user}/>)
      }
    </div>
  )
}

export default Users
