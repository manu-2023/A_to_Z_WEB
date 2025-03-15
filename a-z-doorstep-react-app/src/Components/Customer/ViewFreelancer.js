import React, { useEffect, useState } from "react";
import { baseurl } from "../../App";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ViewFreelancer() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [ratings, setRatings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFreelancer();
    getRatings();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchQuery, ratings]);

  function getFreelancer() {
    axios
      .get(baseurl + `/GetFreelancer`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRatings() {
    axios
      .get(baseurl + `/GetRating`)
      .then((res) => {
        setRatings(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function filterData() {
    const filtered = data.filter((free) => {
      const nameMatches = free.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatches = free.categoryObject.categoryName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatches || categoryMatches;
    });

    // Calculate average rating for each freelancer
    const freelancersWithAverageRating = filtered.map((free) => {
      const ratingsForFreelancer = ratings.filter(
        (rating) => rating.freelancerRating.id === free.id
      );
      const totalRatings = ratingsForFreelancer.length;
      const sumRatings = ratingsForFreelancer.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
      return { ...free, averageRating };
    });

    setFilteredData(freelancersWithAverageRating);
  }

  function handleBookFreelancer(freelancer) {
    sessionStorage.setItem("selectedFreelancer", JSON.stringify(freelancer));
    navigate("booking");
  }

  return (
    <Container>
      <h4 className="text-center my-4">Search Freelancers</h4>
      <input
        type="text"
        placeholder="Search freelancer..."
        className="form-control my-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredData.length === 0 && (
        <p className="text-center">No results found</p>
      )}

      <Container>
        <Row>
          {filteredData.map((free, index) => (
            <Col md={3} key={index}>
              <Card className="">
                <Card.Header className="bg-primary text-white fw-bold text-center">
                  {free.categoryObject.categoryName}
                </Card.Header>
                <Card.Body>
                  <p>Name: {free.name}</p>
                  <p>Email: {free.email}</p>
                  <p>Category: {free.categoryObject.categoryName}</p>
                  <p>Rating :  
                   {[1, 2, 3, 4, 5].map((ratingValue) => (
                    <FaStar
                      key={ratingValue}
                      size={24}
                      className={
                        ratingValue <= Math.round(free.averageRating)
                          ? "text-warning"
                          : "text-secondary"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ))}</p>

                  <Button
                    variant="primary"
                    className="mb-3"
                    onClick={() => handleBookFreelancer(free)}
                  >
                    Book Freelancer
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
