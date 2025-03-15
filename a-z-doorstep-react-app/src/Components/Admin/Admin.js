import React from 'react';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import { toast } from 'react-toastify';
import { FaUsers } from 'react-icons/fa';
import { SiGooglesearchconsole } from "react-icons/si";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';



export default function Admin() {
  const admin = sessionStorage.getItem("admin");
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin'; 

  function logout(e) {
    e.preventDefault();
    sessionStorage.clear();
    toast.success("Logout successfully")
    navigate("/");
  }

  if (!admin) {
    return <ErrorPage />;
  }

  const numCustomers = 100;
  const numFreelancers = 50;
  const numComplaintsSolved = 80;

  return (
    <>
      <Navbar className="shadow bg-dark">
        <Container>
          <Navbar.Brand className="text-light" as={Link} to="/admin"> Welcome Admin</Navbar.Brand>
          <Nav.Link as={Link} to="addcity" className="text-light">Add City</Nav.Link>
          <Nav.Link as={Link} to="addcategory" className="text-light">Add Category</Nav.Link>
          <Nav.Link as={Link} to="addfree" className="text-light">Add Skilled Freelancer</Nav.Link>
          <Nav.Link as={Link} to="managecustomer" className="text-light">Manage Customer</Nav.Link>
          <Nav.Link as={Link} to="viewfeedback" className="text-light">View Feedback</Nav.Link>
          <Nav.Link as={Link} to="changepassword" className="text-light">Change Password</Nav.Link>
          <Nav.Link as={Link} to="/" className="text-light" onClick={logout}>Logout</Nav.Link>
        </Container>
      </Navbar>
      <h4 className='text-center my-3 text-danger'>Admin Dashboard</h4>
      {isAdminPath && (
        <Container className="my-5">
          <Row>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#26547c", height: "200px", textAlign: "center", padding: "30px" }}>
                <span className='fs-3 fw-bold text-light'><FaUsers size={60} /> <br/> Happy Customers {numCustomers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#ef476f", height: "200px", textAlign: "center", padding: "30px" }}>
                <span className='fs-3 fw-bold text-light'><SiGooglesearchconsole size={60} /> <br/> Skilled Freelancers {numFreelancers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#ffd166", height: "200px", textAlign: "center", padding: "30px" }}>
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
