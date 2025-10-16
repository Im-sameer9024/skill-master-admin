import React from 'react'
import TableComponent from '../../components/common/TableComponent'
import { userColumns, userData } from '../../constants/UserData'

const UserPage = () => {


  return (
    <div className=" p-4 w-full h-full">
        <TableComponent column={userColumns} data={userData}  />
    </div>
  )
}

export default UserPage