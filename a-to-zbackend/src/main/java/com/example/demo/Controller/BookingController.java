package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.BookFreelancer;
import com.example.demo.Entity.CustomerEntity;
import com.example.demo.Entity.FreelancerEntity;
import com.example.demo.Repository.BookFreelancerRepository;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.FreelancerRepository;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")

public class BookingController {

    @Autowired
    public BookFreelancerRepository bookingRepo;

    @Autowired
    public CustomerRepository customerRepo;

    @Autowired
    public FreelancerRepository freelancerRepo;

    @PostMapping("/BookFreelancer/{cid}/{fid}")
    public ResponseEntity<?> bookFreelancer(@PathVariable String cid, @PathVariable String fid, @RequestBody BookFreelancer obj){
        var customer =customerRepo.findByEmail(cid).orElseThrow(()->new RuntimeException("Customer not found"));
        var freelancer =freelancerRepo.findByEmail(fid).orElseThrow(()->new RuntimeException("Freelancer not found"));
        System.out.println(customer.getEmail());
        System.out.println(freelancer.getEmail());
        obj.setCustomerBooking(customer);
        obj.setFreelancerBooking(freelancer);
        obj.setDate(String.valueOf(LocalDate.now()));
        obj.setStatus("Pending");
        bookingRepo.save(obj);
        return new ResponseEntity<>("Booking successfully", HttpStatus.OK);
    }


    @GetMapping("/GetBookingByCustomer/{cid}")
    public ResponseEntity<?> getBookingByCustomer(@PathVariable String cid) {
       var bookings = bookingRepo.findByCustomerBookingEmail(cid);
       return new ResponseEntity<>(bookings,HttpStatus.OK);
    }

    @GetMapping("/GetBookingByFreelancer/{fid}")
    public ResponseEntity<?> getBookingByFreelancer(@PathVariable String fid) {
        var bookings = bookingRepo.findByFreelancerBookingEmail(fid);
        return new ResponseEntity<>(bookings,HttpStatus.OK);
    }



    @PutMapping("/EstimateCost/{bid}")
    public ResponseEntity<?> estimateCost(@PathVariable Integer bid, @RequestBody BookFreelancer obj){
    	var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Id not found"));
    	booking.setAmount(obj.getAmount());
    	booking.setComplaintReply(obj.getComplaintReply());
    	booking.setStatus("Estimated cost approval pending");
    	bookingRepo.save(booking);
    	return new ResponseEntity<>("Estimated cost updated successfully", HttpStatus.OK);
    }


    @PutMapping("/RejectBooking/{bid}")
    public ResponseEntity<?> rejectBooking(@PathVariable Integer bid, @RequestBody BookFreelancer obj){
    	var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Id not found"));
    	booking.setComplaintReply(obj.getComplaintReply());
    	booking.setStatus("Booking rejected by freelancer");
    	bookingRepo.save(booking);
    	return new ResponseEntity<>("Booking rejected  successfully", HttpStatus.OK);
    }

    @PutMapping("/ApproveCost/{bid}")
    public ResponseEntity<?> approveCost(@PathVariable Integer bid){
        var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Id not found"));
        booking.setStatus("Customer estimated cost approved");
        bookingRepo.save(booking);
        return new ResponseEntity<>("Approved successfully", HttpStatus.OK);
    }

    @PutMapping("/WorkCompleted/{bid}")
    public ResponseEntity<?> workCompleted(@PathVariable Integer bid){
        var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Id not found"));
        booking.setStatus("Customer complaint has been solved");
        bookingRepo.save(booking);
        return new ResponseEntity<>("Complaint solved successfully", HttpStatus.OK);
    }

    @PutMapping("/Appointment/{bid}")
    public ResponseEntity<?> Appointment(@PathVariable Integer bid,@RequestBody BookFreelancer obj){
        var booking = bookingRepo.findById(bid).orElseThrow(()->new RuntimeException("Id not found"));
        booking.setStatus("Appointment Scheduled");
        booking.setAppDate(obj.getAppDate());
        booking.setAppTime(obj.getAppTime());
        bookingRepo.save(booking);
        return new ResponseEntity<>("Appointment scheduled successfully", HttpStatus.OK);
    }
}
