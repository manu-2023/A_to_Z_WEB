import React, { useEffect, useState } from "react";
import { baseurl } from "../../App";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

export default function ViewBookings() {
  const [bookingList, setBookingList] = useState([]);
 

  const customerId = sessionStorage.getItem("customer");

  useEffect(() => {
    getBookings();
  }, [customerId]);

  function getBookings() {
    axios
      .get(baseurl + `/GetBookingByCustomer/${customerId}`)
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }



  
  function handleApprove(bookingId) {
    axios
      .put(baseurl + `/ApproveCost/${bookingId}`)
      .then((res) => {
        toast.success(res.data);
        getBookings();
      })
      .catch((error) => {
        toast.error("Error Occurred!");
      });
  }

  return (
    <div className="container my-4">
      <h4 className="text-center my-4">View Complaint Status</h4>
      {bookingList
        .filter((booking) => booking.status !== "Customer complaint has been solved" && booking.status !== "Booking rejected by freelancer" )
        .map((booking) => (
          <Card key={booking.id} className="mb-4">
            <Card.Body>
              <div className="row">
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
                  <p className="card-text">
                    Estimate Cost: {booking.amount > 0 ? booking.amount : " - "}
                  </p>
                  {booking.appDate && (
                    <div>
                      <p className="card-text">
                        Appointment Date: {booking.appDate}
                      </p>
                      <p className="card-text">
                        Appointment TIme: {booking.appTime}
                      </p>
                    </div>
                  )}
                  {booking.status === "Estimated cost approval pending" && (
                    <div>
                      <Button onClick={() => handleApprove(booking.id)}>
                        Approve Estimation Cost
                      </Button>
                    </div>
                  )}
                  <p className="card-text fw-bold mt-3 text-danger">
                    Status: {booking.status}
                  </p>
                  
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
