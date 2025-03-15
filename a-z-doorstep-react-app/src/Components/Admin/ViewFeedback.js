import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import {VscFeedback} from 'react-icons/vsc'
import {ImMobile} from 'react-icons/im'
import {BsFillPersonFill} from 'react-icons/bs'
import {FaMapMarkerAlt} from 'react-icons/fa'
import { baseurl } from '../../App';
import { toast } from 'react-toastify';

export default function ViewFeeback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get(baseurl + "/GetFeedback")
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((error) => toast.error(error));
  },[]);


  return (
  
    <div>
      <h4 className='text-center text-primary mt-5'>View Feedback</h4>
      {feedback.map((fb,index) => {
        return (
          <Container key={index} className="my-3 ">
            <Card className="mx-auto w-75">
              <Card.Header className="d-flex gap-3 justify-content-between w-100">
              <div><BsFillPersonFill/> {fb?.customerFeedback.name}</div>
              <div><ImMobile/> {fb?.customerFeedback.mobile}</div>
              <div><FaMapMarkerAlt/> {fb?.customerFeedback.address}</div>
              </Card.Header>
              <Card.Body className="d-flex gap-3 align-items-center"><VscFeedback size="30px" color="gray"/>
                <span>{fb?.feedback}</span></Card.Body>
                <p className=" text-muted text-end"><i>Posted : {fb.date}</i></p>
            </Card>
          </Container>
        );
      })}
    </div>
  );
}
  
