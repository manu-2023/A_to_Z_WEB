package com.example.demo.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Rating;
import com.example.demo.Repository.BookFreelancerRepository;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.FreelancerRepository;
import com.example.demo.Repository.RatingRepo;

@RestController
@CrossOrigin("*")

public class RatingController {

    @Autowired
    public RatingRepo ratingRepo;

    @Autowired
    public FreelancerRepository freelancerRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private BookFreelancerRepository bookingRepo;

    @PostMapping("/AddRating/{cEmail}/{fEmail}/{bid}")
    public ResponseEntity<?> addCity(@PathVariable String cEmail, @PathVariable String fEmail,@PathVariable Integer bid, @RequestBody Rating obj){
        var customer = customerRepo.findByEmail(cEmail).orElseThrow(()->new RuntimeException("Customer not found"));
        var freelancer = freelancerRepo.findByEmail(fEmail).orElseThrow(()->new RuntimeException("Freelancer not found"));
        var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Booking not found"));
        if(ratingRepo.existsByBookingRatingId(bid)){
            throw new RuntimeException("Sorry..already rated");
        }
        obj.setCustomerRating(customer);
        obj.setFreelancerRating(freelancer);
        obj.setBookingRating(booking);
        ratingRepo.save(obj);
        return new ResponseEntity<>("Rated successfully", HttpStatus.OK);
    }
    @GetMapping("/GetRating")
    public ResponseEntity<?> getRating (){
        var data = ratingRepo.findAll();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/GetRatingByFreelancer/{email}")
    public ResponseEntity<?> getRatingByFreelancer (@PathVariable String email){
        var data = ratingRepo.findByFreelancerRatingEmail(email);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/GetRatingByCustomer/{email}")
    public ResponseEntity<?> getRatingByCustomer (@PathVariable String email){
        var data = ratingRepo.findByCustomerRatingEmail(email);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/GetRatingByBooking/{bid}")
    public ResponseEntity<?>getRatingByBooking (@PathVariable Integer bid){
        var data = ratingRepo.findByBookingRatingId(bid);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
