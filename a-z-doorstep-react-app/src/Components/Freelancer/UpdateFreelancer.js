import React, { useEffect, useState } from 'react'
import { baseurl } from '../../App'
import { Button, Card, Container, Form } from 'react-bootstrap'
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function UpdateFreelancer() {

    const [name,setName]=useState("")
  const [mobile,setMobile]=useState("")
  const [email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [password, setPassword] = useState("")
  const [cityId, setCityid] = useState("")


  const [cities, setCities] = useState([]);
const navigate = useNavigate()

    const freelanceId = sessionStorage.getItem("freelancer")

    useEffect(()=>{
        getFreeelancer()
        getCities()
    },[freelanceId])

    function getFreeelancer(){
        axios.get(baseurl + `/GetFreelancerByEmail/${freelanceId}`)
            .then((res) => { 
               setName(res.data.name)
               setMobile(res.data.mobile)
               setEmail(res.data.email)
               setAddress(res.data.address)
               setCityid(res.data.city.id)
               setPassword(res.data.password)
            })
            .catch((err)=>
            console.log(err))  
            }   

            function getCities(){
                axios
                .get(baseurl + "/GetCity")
                .then((response) => {
                  setCities(response.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }


            function handleUpdate(e){
                e.preventDefault()
                const obj = {name, mobile , email , address , password};
                axios.put(baseurl +`/UpdateFreelancer/${freelanceId}/${cityId}` ,obj )
                .then((res) => {
                    toast.success('Profile Updated Successfully')
                    navigate("/login", {state : {updated : true}})
                })
                .catch((error)=>{
                    console.log(error)
                })

            }




  return (
    <div>
        <Container className="mt-5">
      <Card className="p-4 col-8 mx-auto">
          <h4 className="text-center text-primary my3 ">
            Update Profile
          </h4>
        <Form onSubmit={handleUpdate}>
        <label>Enter Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
        <label>Enter Mobile</label>
        <input
  type="tel"
  id="mobile"
  className="form-control"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
  pattern="[0-9]{10}"
  title="Mobile number should contain exactly 10 digits"
  required
/>
        <label>Enter Email</label>
              <input
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
               <select
                className="form-select mb-3 text-center"
                value={cityId}
                onChange={(e) => setCityid(e.target.value)}
                required
              >
                <option value={0} hidden>----Select City----</option>
                {cities.map((element,index) => {
                  return <option key={index} value={element.id}>{element.city}</option>;
                })}
              </select>
        <label>Enter Address</label>
              <input
                type="text"
                className="form-control mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
        <label>Enter Password</label>
              <input
                type="text"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" as={Link} to="/freelancer">
              Back
            </Button>
          </div>
        </Form>
      </Card>
    </Container>

    </div>
  )
}
