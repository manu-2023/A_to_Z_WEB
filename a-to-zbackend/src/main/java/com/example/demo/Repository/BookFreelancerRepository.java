package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Controller.BookingController;
import com.example.demo.Entity.BookFreelancer;

public interface BookFreelancerRepository extends JpaRepository<BookFreelancer, Integer>{
	

    List<BookFreelancer> findByCustomerBookingEmail(String email);

    List<BookFreelancer> findByFreelancerBookingEmail(String email);
}
