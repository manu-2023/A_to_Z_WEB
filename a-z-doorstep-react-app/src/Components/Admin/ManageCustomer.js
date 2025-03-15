import React, { useEffect, useState } from 'react'
import { baseurl } from '../../App'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function ManageCustomer() {

  const [ customers, setCustomers] = useState([])

  useEffect(()=>{
    getCustomers()
  },[])


  function getCustomers(){
    axios.get(baseurl+`/GetCustomer`)
    .then((res)=>{
      setCustomers(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  function updateStatus(customerEmail, status){
    axios.put(baseurl + `/UpdateStatus/${customerEmail}`, {status:status})
    .then((res)=>{
      toast.success(res.data)
      getCustomers()
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  return (
    <div>
      <h4 className='text-center my-5'>Manage Customer</h4>
      <table className="table table-striped w-75 mx-auto">
        <thead>
        <tr>
        <th>Sl No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>City</th>
          <th>Address</th>
          <th>Status</th>
          <th colSpan={2}>Action</th>
        </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.mobile}</td>
              <td>{customer.cityCustomer.city}</td>
              <td>{customer.address}</td>
              <td>{customer.status}</td>
              <td>{customer.status === "Active" && <Button variant="danger" onClick={()=> updateStatus(customer.email,"Blocked")}>Block</Button>}</td>
              <td>{customer.status === "Blocked" && <Button variant="success" onClick={()=> updateStatus(customer.email, "Active")}>Unblock</Button>}</td>
            </tr>
         ) )}
        </tbody>
      </table>
    </div>
  )
}
