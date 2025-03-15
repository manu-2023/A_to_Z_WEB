package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Feedback;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {

        List<Feedback> findByCustomerFeedbackEmail(String email);
}
