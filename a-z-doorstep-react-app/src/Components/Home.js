import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { BiSolidLike } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { SiGooglesearchconsole } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Home() {

  const numCustomers = 100;
  const numFreelancers = 50;
  const numComplaintsSolved = 80;
  
  return (
    <div>
      <Navbar className="shadow bg-dark">
        <Container>
          <Navbar.Brand className="text-light" >
          A to Z Doorstep Electrical Service
          </Navbar.Brand> 
            <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
        </Container>
      </Navbar>
      <div className="bg-image">
        <div className="txt ">
          <h2 className="text-light tx">A to Z</h2>
          <h1 className="text-warning"> Doorstep Service</h1>
          <h2 className="text-light">One-stop solution for all problems.</h2>
        </div>
        <Container className="my-5">
          <Row  md={5}>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#10ad8e", height: "200px", textAlign: "center", padding: "20px" }}>
                <span className='fs-3 fw-bold text-light'><FaUsers size={50} /> <br/> Happy Customers {numCustomers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#ef476f", height: "200px", textAlign: "center", padding: "20px" }}>
                <span className='fs-3 fw-bold text-light'><SiGooglesearchconsole size={50} /> <br/> Skilled Freelancers {numFreelancers}+</span>
              </div>
            </Col>
            <Col>
              <div className="box bounce-top" style={{ backgroundColor: "#fcbe03", height: "200px", textAlign: "center", padding: "25px" }}>
                <span className='fs-3 fw-bold text-dark'><BiSolidLike size={50} /> <br/> Complaints Solved <br/>  {numComplaintsSolved}+</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
