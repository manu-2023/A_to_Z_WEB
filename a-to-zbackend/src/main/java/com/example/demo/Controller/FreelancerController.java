package com.example.demo.Controller;

import java.util.List;
import com.example.demo.SmtpMail.*;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.FreelancerEntity;
import com.example.demo.Repository.AddCityRepository;
import com.example.demo.Repository.AddJobRepository;
import com.example.demo.Repository.FreelancerRepository;

@RestController
@CrossOrigin("*")
public class FreelancerController {
	
	@Autowired
	private SmtpServer smtpservice;

	
	
	@Autowired
	public FreelancerRepository frRepo;
	
	@Autowired
	public AddJobRepository addJobRepo;
	
	@Autowired
	public AddCityRepository addCityRepo;
	
	
	
	@PostMapping("/AddFreelancer/{jobid}/{cityid}")
	public ResponseEntity<?>addFreelancer(@RequestBody FreelancerEntity obj,@PathVariable int jobid,@PathVariable int cityid){
		if(frRepo.existsByMobile(obj.getMobile())) {
			return new ResponseEntity<>("Mobile Number Already Exists",HttpStatus.BAD_REQUEST);
		}
		else if (frRepo.existsByEmail(obj.getEmail())) {
			return  new ResponseEntity<>("Email Already Exists",HttpStatus.BAD_REQUEST);
		}

		else {
			var jobs=addJobRepo.findById(jobid).orElseThrow(()->new RuntimeException("Job not found"));
			var cities=addCityRepo.findById(cityid).orElseThrow(()->new RuntimeException("City not found"));
			Random random = new Random();
			int randnumber = random.nextInt(9000)+1000;
			obj.setPassword((String.valueOf(randnumber)));
			obj.setCategoryObject(jobs);
			obj.setCity(cities);
			
			FreelancerEntity savedFreelancer = frRepo.save(obj);
			 com.example.demo.DTO.EmailDTO emailData = new com.example.demo.DTO.EmailDTO();
	            emailData.setRecipient(savedFreelancer.getEmail());

	            emailData.setSubject("Login credentials");
	            String message = "Welcome to A to Z DoorStep Service Optimization:\nYour Login Credentials:\nFreelnacer ID: " + savedFreelancer.getEmail() + "\nPassword: " + randnumber;
	            emailData.setMessage(message);

	            smtpservice.sendMail(emailData);

	            return ResponseEntity.ok("Freelancer profile created successfully. Login credentials sent to email.");
		}

			
	}
	
	
	@GetMapping("/GetFreelancerByEmail/{email}")
	public ResponseEntity<?> getFreelancer(@PathVariable String email) {
	    Optional<FreelancerEntity> freelancer = frRepo.findByEmail(email);

	    if (freelancer.isPresent()) {
	        return new ResponseEntity<>(freelancer.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Freelancer not found", HttpStatus.NOT_FOUND);
	    }
	}
	
	
	@GetMapping("/GetFreelancer")
	public ResponseEntity<?> getFreelancers(){
		List<FreelancerEntity> freelancers = frRepo.findAll();
		return ResponseEntity.ok(freelancers);
	}
	
	
    @PutMapping("/UpdateFreelancer/{freelanceId}/{cityId}")
    public ResponseEntity<?> updateFreelancer (@PathVariable String freelanceId, @PathVariable Integer cityId, @RequestBody FreelancerEntity obj){
        var freelancer = frRepo.findByEmail(freelanceId).orElseThrow(()->new RuntimeException("Freelancer not found"));
        var city = addCityRepo.findById(cityId).orElseThrow(()->new RuntimeException("City not found"));
        freelancer.setName(obj.getName());
        freelancer.setMobile(obj.getMobile());
        freelancer.setEmail(obj.getEmail());
        freelancer.setCity(city);
        freelancer.setAddress(obj.getAddress());
        freelancer.setPassword(obj.getPassword());
        frRepo.save(freelancer);
        return new ResponseEntity<>("Profile Updated successfully", HttpStatus.OK);
    
    }
}
