import React, { useEffect, useState } from "react";
import { baseurl } from "../../App";
import axios from "axios";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ViewComplaints() {
  const [bookingList, setBookingList] = useState([]);
  const [amount, setAmount] = useState("");
  const [complaintReply, setComplaintReply] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [appDate, setAppdate] = useState("");
  const [appTime, setApptime] = useState("");

  const freelancerId = sessionStorage.getItem("freelancer");

  useEffect(() => {
    getBookings();
  }, [freelancerId]);

  function getBookings() {
    var fid = freelancerId;
    if (fid == null){
      toast.error("Something went wrong");
    }
    axios

      .get(baseurl + `/GetBookingByFreelancer/${fid}`)
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShowAccept = (id) => {
    setShow(true);
    setBookingId(id);
  };
  const handleShowReject = (id) => {
    setShow1(true);
    setBookingId(id);
  };

  function handleCost(e) {
    e.preventDefault();
    const obj = { amount, complaintReply };
    axios
      .put(baseurl + `/EstimateCost/${bookingId}`, obj)
      .then((res) => {
        toast.success("Your Estimated cost sent successfully");
        setShow(false);
        getBookings();
        setAmount("")
        setComplaintReply("")
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  function handleReject(e) {
    e.preventDefault();
    const obj = { complaintReply };
    axios
      .put(baseurl + `/RejectBooking/${bookingId}`, obj)
      .then((res) => {
        toast.success("Booking rejected successfully");
        setShow(false);
        getBookings();
        setComplaintReply("")
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  function handleAppointment(id) {
    const obj = { appDate, appTime };
    axios
      .put(baseurl + `/Appointment/${id}`, obj)
      .then((res) => {
        toast.success("Appointment scheduled successfully");
        getBookings();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  function handleWorkCompleted(bookingId) {
    axios
      .put(baseurl + `/WorkCompleted/${bookingId}`)
      .then((res) => {
        toast.success("Work completed successfully");
        getBookings();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <div className="container my-4">
      <h4 className="text-center my-4">View Complaint Status</h4>
      <Card>
        {bookingList.filter((work)=>work.status !== "Customer complaint has been solved"  && work.status !== "Booking rejected by freelancer")
        .map((booking) => (
          <div key={booking.id} className="row mb-4">
            <div className="col-6">
              <img src={booking.image} className="card-img-top" alt="" />
            </div>
            <div className="col-6 mt-4">
              <h5 className="card-title">{booking.bookingTitle}</h5>
              <p className="card-text">Booking ID: {booking.id}</p>
              <p className="card-text">Booking Date: {booking.date}</p>
              <p className="card-text">
                Booking Complaint: {booking.complaint}
              </p>
              <p className="card-text">
                Freelancer Name: {booking.freelancerBooking.name}
              </p>
              <p className="card-text">
                Category:{" "}
                {booking.freelancerBooking.categoryObject.categoryName}
              </p>

              {booking?.appDate && (
                <div>
                  <p className="card-text">Estimate Cost: {booking.amount}</p>
                  <p className="card-text">
                    Appointment Date: {booking.appDate}
                  </p>
                  <p className="card-text">
                    Appointment TIme: {booking.appTime}
                  </p>
                </div>
              )}

              {booking.status == "Pending" && (
                <div className="d-flex gap-4 mb-3">
                  <Button
                    className="btn btn-success"
                    onClick={() => handleShowAccept(booking.id)}
                  >
                    Estimate Cost{" "}
                  </Button>
                  <Button
                    className="btn btn-danger "
                    onClick={() => handleShowReject(booking.id)}
                  >
                    Reject{" "}
                  </Button>
                </div>
              )}

              {booking.status === "Customer estimated cost approved" && (
                <Form >
                  <div className="row">
                    <Col md={5}>
                      <label className="text-danger">Appointment Date</label>
                      <Form.Control
                        type="date"
                        value={appDate}
                        className="my-3"
                        onChange={(e) => setAppdate(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={5}>
                      <label className="text-danger">Appointment Time</label>
                      <Form.Control
                        type="time"
                        value={appTime}
                        className="my-3"
                        onChange={(e) => setApptime(e.target.value)}
                        required
                      />
                    </Col>
                    <div>
                      <Button type="submit" variant="success" onClick={()=>handleAppointment(booking.id)}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>
              )}

              {booking.status === "Appointment Scheduled" && (
                <Button
                  onClick={() => handleWorkCompleted(booking.id)}
                  className="mt-3 btn btn-success"
                >
                  {" "}
                  Work Completed
                </Button>
              )}
              <p className="card-text mt-2 text-danger fw-bold">
                Status: {booking.status}
              </p>
            </div>
          </div>
        ))}
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Estimate Repair Cost</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Control
              type="number"
              value={amount}
              className="mb-3"
              placeholder="Please enter estimated cost"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Form.Control
              as="textarea"
              value={complaintReply}
              placeholder="Description"
              onChange={(e) => setComplaintReply(e.target.value)}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCost}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Booking </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Control
              as="textarea"
              value={complaintReply}
              placeholder="Description"
              onChange={(e) => setComplaintReply(e.target.value)}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={handleReject}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
