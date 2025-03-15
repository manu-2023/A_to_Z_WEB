import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseurl } from '../../App';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

export default function ViewCustomerLog() {
  const [bookingList, setBookingList] = useState([]);
  const [ratings, setRatings] = useState([]);
  const customerEmail = sessionStorage.getItem("customer");

  useEffect(() => {
    getBookings();
    getRatings()
  }, [customerEmail]);

  function getBookings() {
    axios
      .get(baseurl + `/GetBookingByCustomer/${customerEmail}`)
      .then((res) => {
        setBookingList(res.data);
        console.log(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getRatings() {
    axios
      .get(baseurl + `/GetRatingByCustomer/${customerEmail}`)
      .then((res) => {
        setRatings(res.data);
        console.log(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function rateOrder(bookingId, fEmail, rating) {
    axios
      .post(baseurl + `/AddRating/${customerEmail}/${fEmail}/${bookingId}`, {
        rating,
      })
      .then((res) => {
        toast.success(res.data);
        getRatings();
        setBookingList((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, rating: rating } : booking
          )
        );
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }


  return (
    <div className=" my-4">
      <h4 className="text-center my-4">View Complaint's Log</h4>
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booking Date</th>
            <th>Booking Complaint</th>
            <th>Estimated Cost</th>
            <th>Appointment Date & Time</th>
            <th>Rating</th>
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
              <td>{booking.appDate} - {booking.appTime}</td>
              <td>{booking.status === "Customer complaint has been solved" && (
                    <div className="pe-3">
                      <span>Rate Order:</span>{" "}
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FaStar
                          key={rating}
                          size={24}
                          className={
                            rating <=
                            (ratings.find(
                              (rate) => rate.bookingRating.id === booking.id
                            )?.rating || 0)
                              ? "text-warning"
                              : "text-secondary"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            rateOrder(
                              booking.id,
                              booking.freelancerBooking.email,
                              rating
                            )
                          }
                        />
                      ))}
                    </div>
                  )}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
