import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseurl } from "../../App";

export default function ChangePassword() {
  const admin = sessionStorage.getItem("admin");

  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  function clearAll() {
    setPassword("");
    setcPassword("");
  }

  function updatePassword(e) {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Password Mismatch");
      return;
    }
    axios
      .put(baseurl + `/updatePassword/${admin}`, { password })
      .then((res) => {
        toast.success(res.data);
        clearAll();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data);
      });
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={updatePassword}>
        <Card className="w-50 mx-auto p-3">
          <h4 className="text-primary text-center my-3"> Update Password</h4>
            <Form.Control
              type="text"
              placeholder="New Password"
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={cpassword}
              className="mb-3"
              onChange={(e) => setcPassword(e.target.value)}
              required
            />
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
        </Card>
      </Form>
    </Container>
  );
}
