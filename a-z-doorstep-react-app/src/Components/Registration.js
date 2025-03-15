import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../App";

function Registration() {
  const navigate = useNavigate();

  const [name,setName]=useState("")
  const [mobile,setMobile]=useState("")
  const [email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [password, setPassword] = useState("")
  const [cityId, setCityid] = useState("")

  const [cities, setCities] = useState([]);

  useEffect(()=>{
    axios
    .get(baseurl + "/GetCity")
    .then((response) => {
      setCities(response.data);
    })
    .catch((err) => {
      toast.error(err);
    });
  },[])


  function handleReg(e) {

    e.preventDefault();
    const obj = {name, mobile, email, address, password, status:"Active"};
    axios
      .post(baseurl + `/AddCustomer/${cityId}`, obj)
      .then((res) => {
        toast.success(res.data);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }

  return (
    <div className=" bg-reg">
      <div className="p-4 w-40 margin">  
          <h2 className="text-center ">
            User Registration
          </h2>
        <Form onSubmit={handleReg}>
        <label>Enter Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="[A-Za-z\s]+"
                title="Name should contain only alphabets"
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
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Invalid email format"
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
            <Button variant="secondary" as={Link} to="/">
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Registration;
