import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseurl } from '../../App';
import { Table } from 'react-bootstrap';
import { toast } from "react-toastify";


export default function ViewLog() {
  const [bookingList, setBookingList] = useState([]);
  const freelancerId = sessionStorage.getItem("freelancer");

  useEffect(() => {
    getBookings();
  }, [freelancerId]);

  function getBookings() {
    axios
      .get(baseurl + `/GetBookingByFreelancer/${freelancerId}`)
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <div className="container my-4">
      <h4 className="text-center my-4">View Complaint's Log</h4>
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booking Date</th>
            <th>Booking Complaint</th>
            <th>Estimated Cost</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.filter((work) => work.status === "Customer complaint has been solved" || work.status === "Booking rejected by freelancer").map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.complaint}</td>
              <td>{booking.amount}</td>
              <td>{booking.appDate}</td>
              <td>{booking.appTime}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
