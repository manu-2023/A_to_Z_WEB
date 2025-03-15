import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const navigate = useNavigate();

  const users = ["Admin", "Customer", "Freelancer"];

  const [role, setRoll] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(e) {
    e.preventDefault();
    
    const obj = { id, password, userType: role };
    axios.post("http://localhost:8080/LoginVerify", obj)
  .then((res) => {
    if (res.data === "Admin") {
      sessionStorage.setItem("admin", id);
      navigate("/admin");
      toast.success("Login successfully");
    } else if (res.data === "Customer") {
      sessionStorage.setItem("customer", id);
      navigate("/customer");
      toast.success("Login successfully");
    } else if (res.data === "Freelancer") {
      sessionStorage.setItem("freelancer", id);
      navigate("/freelancer");
      toast.success("Login successfully");
    } else {
      toast.error("Unexpected response: " + res.data);
    }
  })
  .catch((err) => {
    console.error("Login request failed", err);
    
    // Handle different error scenarios
    if (!err.response) {
      toast.error("No response from server. Please check backend or network.");
    } else {
      toast.error(err.response.data || "Failed to login");
    }
  });

  }
  return (
    <div className="bg-login">
      <Card className="mrg">
        <Card.Body>
          <Card.Title className="text-center ">
            <h1>Login</h1>
            <p className="text-secondary">"Securely Access Your Account"</p>
            <br />
          </Card.Title>
          <form onSubmit={handleLogin}>
            <Card.Text>
              <label className="text-center">Select User Type</label>
              <select
                className="form-select mb-3 text-center"
                value={role}
                onChange={(e) => setRoll(e.target.value)}
                required
              >
                <option value={0} hidden>----Select User Type----</option>
                {users.map((element,index) => {
                  return <option value={element} key={index}>{element}</option>;
                })}
              </select>
              <label>Enter User ID</label>
              <input
                type={"text"}
                className="form-control mb-3"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <label>Enter Password</label>
              <input
                type={"password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Card.Text>
            <Link to="/reg">New Registration</Link>
            <div className="d-flex gap-3 mt-3">
              <Button className="btn btn-primary" type="submit">
                Login
              </Button>
              <Link className="btn btn-secondary" to="/">
                Back
              </Link>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
