import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { baseurl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const [CategoryName, setCategoryName] = useState("");
  const [cid, setId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  
    if (cid) {
      // Update existing category
      axios.put(baseurl + `/UpdateCategory/${cid}`, { categoryName: CategoryName })
        .then((res) => {
          toast.success(res.data);
          getCategories();
          setCategoryName("");
          setId("");
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    } else {
      // Add new category
      axios.post(baseurl + "/AddCategory", { categoryName: CategoryName })
        .then((res) => {
          toast.success(res.data);
          getCategories();
          setCategoryName("");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
    }
  }
  

  function getCategories() {
    axios
      .get(baseurl + "/GetCategory")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
      });
  }

  function assignData(data) {
    if (data.cId !== undefined) {
        setCategoryName(data.categoryName);
        setId(data.cId); // Correct case
    } else {
        toast.error("cId is missing in data:", data);
    }
}

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h4 className="my-3">Add Category</h4>
          <form onSubmit={handleSubmit}>
            <label>Enter Category Name</label>
            <input
              type="text"
              className="form-control"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <Button className="my-3" type="submit">
              {cid ? "Edit" : "Submit"}
            </Button>
          </form>
        </Col>
        <Col md={6}>
          <h4 className="mt-4">View Jobs</h4>
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Job</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, cId) => (
                <tr key={cId}>
                  <td>{item.categoryName}</td>
                  <td>
                    <Link onClick={() => assignData(item)}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
