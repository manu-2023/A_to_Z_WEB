import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { baseurl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookFreelance = () => {
  const [complaintDescription, setComplaintDescription] = useState("");
  const [image, setImage] = useState(null);

  const selectedFreelancer = JSON.parse(
    sessionStorage.getItem("selectedFreelancer")
  );

  const customerId = sessionStorage.getItem("customer");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { complaint: complaintDescription, image };
    var cid= customerId;
    var fid=selectedFreelancer.email;
    if (cid == null || fid ==null) {
      toast.error("Sonething went wrong");
      
    }
    else{
      axios
      .post(
        baseurl + `/BookFreelancer/${cid}/${fid}`,
        obj
      )
      .then((res) => {
        toast.success("Your request has been sent successfully!");
        navigate("/customer/viewbooking");
        clearAll();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
    }
  };

  function clearAll() {
    setComplaintDescription("");
    document.getElementById("file").value = "";
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <Container>
      <Card className="p-3 mt-4">
        <h2 className="text-center my-3 text-primary">Book Freelancer</h2>
        <div>
          <h4 className="my-3">Freelancer Information:</h4>
          <p>Name: {selectedFreelancer.name}</p>
          <p>Email: {selectedFreelancer.email}</p>
          <p>Category: {selectedFreelancer.categoryObject.categoryName}</p>
          <p>Rating: {selectedFreelancer.rating}</p>
        </div>
        <div>
         <Form onSubmit={handleSubmit}>
         <h4>Complaint Details:</h4>
          <Form.Group>
            <Form.Label>Complaint Description</Form.Label>
            <Form.Control
              as="textarea"
              className="mb-3"
              rows={5}
              value={complaintDescription}
              onChange={(e) => setComplaintDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              id="file"
              className="mb-3"
              onChange={handleImageChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Booking
          </Button>
         </Form>
        </div>
      </Card>
    </Container>
  );
};

export default BookFreelance;
