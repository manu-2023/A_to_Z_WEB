package com.example.demo.Controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.FeedbackRepo;


@RestController
@CrossOrigin("*")

public class FeedbackController {

    @Autowired
    public FeedbackRepo feedbackRepo;

    @Autowired
    public CustomerRepository customerRepo;

    @PostMapping("/PostFeedback/{email}")
    public ResponseEntity<?> postFeedback (@RequestBody com.example.demo.Entity.Feedback obj, @PathVariable String email){
        var customer = customerRepo.findByEmail(email).orElseThrow(()->new RuntimeException("Customer not found"));
        obj.setCustomerFeedback(customer);
        obj.setDate(String.valueOf(LocalDate.now()));
        feedbackRepo.save(obj);
        return new ResponseEntity<>("Feedback posted successfully", HttpStatus.OK);
    }

    @GetMapping("/GetFeedbackByEmail/{email}")
    public ResponseEntity<?> getFeedbackByEmail (@PathVariable String email){
        var data = feedbackRepo.findByCustomerFeedbackEmail(email);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/GetFeedback")
    public ResponseEntity<?> getFeedback (){
        var data = feedbackRepo.findAll();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }


}
