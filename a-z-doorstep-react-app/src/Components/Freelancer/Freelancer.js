import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../App";
import ErrorPage from "../ErrorPage";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";
import { SiGooglesearchconsole } from "react-icons/si";
import { BiSolidLike } from "react-icons/bi";

export default function Freelancer() {
  const freelancer = sessionStorage.getItem("freelancer");

  const [data, setData] = useState({});

  const navigate = useNavigate();
  const { state } = useLocation();

  const location = useLocation();
  const isCustomerPath = location.pathname === '/freelancer'; 

  const numCustomers = 100;
  const numFreelancers = 50;
  const numComplaintsSolved = 80;

  useEffect(() => {
    axios
      .get(baseurl + `/GetFreelancerByEmail/${freelancer}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [ state?.updated, freelancer]);

  function logOut(e) {
    e.preventDefault();
    sessionStorage.clear();
    toast.success('Logged out successfully')
    navigate("/");

  }
  if (!freelancer) {
    return <ErrorPage />;
  }


  return (
    <>
      <Navbar className="shadow bg-dark">
        <Container>
          <Navbar.Brand className="text-light"  as={Link} to="/freelancer">
            <h4> Welcome {data.name}</h4>
          </Navbar.Brand>
          <Nav.Link as={Link} to="viewcmpl" className="text-light">
            View Complaints
          </Nav.Link>
          <Nav.Link as={Link} to="viewlog" className="text-light">
            View Complaint's Log
          </Nav.Link>
          <Nav.Link as={Link} to="updatefreelancer" className="text-light">
            Update Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/" className="text-light" onClick={logOut}>
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
      <h4 className='text-center my-3 text-danger'>Freelancer Dashboard</h4>
      {isCustomerPath && (
        <Container className="my-5">
          <Row>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#12263a", height: "200px", textAlign: "center", padding: "30px" }}>
                <span className='fs-3 fw-bold text-light'><FaUsers size={60} /> <br/> Happy Customers {numCustomers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#06bcc1", height: "200px", textAlign: "center", padding: "30px" }}>
                <span className='fs-3 fw-bold text-dark'><SiGooglesearchconsole size={60} /> <br/> Skilled Freelancers {numFreelancers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#c5d8d1", height: "200px", textAlign: "center", padding: "30px" }}>
                <span className='fs-3 fw-bold text-dark'><BiSolidLike size={60} /> <br/> Complaints Solved {numComplaintsSolved}+</span>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Outlet />
    </>
  );
}
