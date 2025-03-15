import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { baseurl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AddCity() {
  const [city, setCity] = useState("");
  const [cityId, setCityid] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getCities();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (cityId) {
      axios.put(baseurl+`/updateCity/${cityId}`, { city })
        .then((res) => {
          toast.success(res.data);
          getCities(); 
          setCity(""); 
          setCityid(""); 
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    } else {
      axios.post(baseurl + "/addCity", { city })
        .then((res) => {
          toast.success(res.data);
          getCities(); 
          setCity(""); 
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    }
  }
  

  function getCities() {
    axios
      .get(baseurl + "/GetCity")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  function assignData(data) {
    setCity(data.city);
    setCityid(data.id);
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h4 className="my-3">Add City</h4>
            <form onSubmit={handleSubmit}>
              <label>Enter City Name</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <Button className="my-3" type="submit">
                Submit
              </Button>
            </form>
          </Col>
          <Col md={6}>
            <h4 className="mt-4">View Category</h4>
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>City</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.city}</td>
                    <td>
                      <Link onClick={() => assignData(data)}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
