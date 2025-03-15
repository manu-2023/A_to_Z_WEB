package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Rating;

import java.util.List;

public interface RatingRepo extends JpaRepository<Rating, Integer> {

    List<Rating> findByCustomerRatingEmail(String email);
    List<Rating> findByFreelancerRatingEmail(String email);
    List<Rating> findByBookingRatingId(Integer id);

    boolean existsByCustomerRatingEmail(String email);
    boolean existsByBookingRatingId(Integer id);
}

