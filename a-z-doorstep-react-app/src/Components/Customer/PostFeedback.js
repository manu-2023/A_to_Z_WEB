import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { baseurl } from "../../App";
import { toast } from "react-toastify";
import { VscFeedback } from "react-icons/vsc";

export default function PostFeedback() {
  const customerEmail = sessionStorage.getItem("customer");

  const [feedbacks, setFeedbacks] = useState([]);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    getFeedbacks();
  }, []);


  function getFeedbacks() {
    axios
      .get(baseurl + `/GetFeedbackByEmail/${customerEmail}`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFeedback(e){
    e.preventDefault()
    const obj = {feedback};
    axios.post(baseurl +`/PostFeedback/${customerEmail}` ,obj )
    .then((res) => {
        toast.success('Your feedback posted Successfully')
        setFeedback("")
        getFeedbacks()
    })
    .catch((error)=>{
        console.log(error)
    })

}

  return (
    <>
      <Card className="w-50 mx-auto p-4 mt-5">
        <h4 className="text-center">Post Feedback</h4>
        <Form onSubmit={handleFeedback}>
          <Form.Control
            as="textarea"
            placeholder="Enter feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Button type="submit" className="mt-3">Submit</Button>
        </Form>
      </Card>
      <div class="container my-5">
        <h4 className="text-center">View Feedbacks</h4>
      { feedbacks.length > 0 ? (feedbacks.map((fb)=>(
        <Card className="card w-75 mx-auto   my-5">
          <Card.Header className="text-center fw-bold">Feedback</Card.Header>
         <div className="p-2">
         <p className="fw-bold mt-3"><VscFeedback size={25} />  {fb.feedback}</p>
          <p className=" text-muted text-end"><i>Posted : {fb.date}</i></p>
         </div>
        </Card>
      ))) : <p className="text-center text-danger fw-bold mt-4">No data found</p>}
      </div>
    </>
  );
}
