import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { baseurl } from "../../App";
import { toast } from "react-toastify";

export default function AddFreelancer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cId, setCid] = useState("");
  const [cityId, setCityid] = useState("");
  const [submiting,setSubbmiting]=useState(true);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    getCategories();
    getFreelancer();
    getCities();
  }, []);

 function getFreelancer(){
  axios
      .get(baseurl + `/GetFreelancer`)
      .then((res) => {
        setFreelancers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
 }

  function handleSubmit(e) {
    e.preventDefault();
    const obj = { name, email, mobile, address };
    setSubbmiting(false);
    axios
      .post(baseurl + `/AddFreelancer/${cId}/${cityId}`, obj)
      .then((res) => {
        toast.success(res.data);
        setSubbmiting(true);
        clearAll();
      })
      .catch((error) => {
        setSubbmiting(true);
        console.log(error);
        toast.error(error.response.data);
      });
  }


  function getCategories() {
    axios
      .get(baseurl + "/GetCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCities() {
    axios
      .get(baseurl + "/GetCity")
      .then((response) => {
        setCities(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



 

  function clearAll() {
    setAddress("");
    setMobile("");
    setEmail("");
    setName("");
    setCid("");
    setCityid("");
  }

  return (
    <>
      <Container>
        <Card className="w-75 mx-auto p-4 mt-4">
          <h4 className="my-3 text-center text-primary">
            Add Skilled Freelancer
          </h4>
          <form onSubmit={handleSubmit}>
            <select
              className="form-select mb-3 text-center"
              value={cId}
              onChange={(e) => setCid(e.target.value)}
              required
            >
              <option value={0} hidden>
                ----Select Category----
              </option>
              {categories.map((element, index) => {
                return (
                  <option key={index} value={element.cId}>
                    {element.categoryName}
                  </option>
                );
              })}
            </select>
            <select
              className="form-select mb-3 text-center"
              value={cityId}
              onChange={(e) => setCityid(e.target.value)}
              required
            >
              <option value={0} hidden>
                ----Select City----
              </option>
              {cities.map((element, index) => {
                return (
                  <option key={index} value={element.id}>
                    {element.city}
                  </option>
                );
              })}
            </select>
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
              pattern="[6-9]{1}[0-9]{9}"
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
            <label>Enter Address</label>
            <input
              type="text"
              className="form-control mb-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            {submiting ? (<Button className="mb-3" type="submit">
              Submit
            </Button>):(<Button className="mb-3" type="submit" disabled>
              Please Wait 
            </Button>)}
          </form>
        </Card>
        <h4 className="my-4 text-center text-primary">View</h4>
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>Freelancer ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.categoryObject.categoryName}</td>
                <td>{data.email}</td>
                <td>{data.mobile}</td>
                <td>{data.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
