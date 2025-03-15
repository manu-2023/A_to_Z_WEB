	package com.example.demo.Controller;
	
	
	
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RestController;
	
	import com.example.demo.DTO.LoginDTO;
	import com.example.demo.Entity.AdminEntity;
	import com.example.demo.Entity.CustomerEntity;
	import com.example.demo.Entity.FreelancerEntity;
	import com.example.demo.Repository.AdminRepository;
	import com.example.demo.Repository.CustomerRepository;
	import com.example.demo.Repository.FreelancerRepository;
	
	@RestController
	@CrossOrigin("*")
	
	public class LoginController {
	
	
	    @Autowired
	    private AdminRepository adminRepo;
	
	    @Autowired
	    private CustomerRepository customerRepo;
	
	    @Autowired
	    private FreelancerRepository freelancerRepo;
	    @PostMapping("/LoginVerify")
	    public ResponseEntity<?> loginVerify(@RequestBody LoginDTO obj) {
	        String userType = obj.getUserType();
	        String email = obj.getId();
	        String password = obj.getPassword();

	        if ("Admin".equals(userType)) {
	            AdminEntity admin = adminRepo.findById(email)
	                    .orElse(null);
	            if (admin != null && admin.getPassword().equals(password)) {
	                return new ResponseEntity<>("Admin", HttpStatus.OK);
	            }
	            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
	        }

	        else if ("Customer".equals(userType)) {
	            CustomerEntity customer = customerRepo.findByEmail(email)
	                    .orElse(null);
	            if (customer != null) {
	                if ("Blocked".equals(customer.getStatus())) {
	                    return new ResponseEntity<>("Your account is blocked!", HttpStatus.FORBIDDEN);
	                }
	                if (customer.getPassword().equals(password)) {
	                    return new ResponseEntity<>("Customer", HttpStatus.OK);
	                }
	            }
	            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
	        }

	        else if ("Freelancer".equals(userType)) {
	            FreelancerEntity freelancer = freelancerRepo.findByEmail(email)
	                    .orElse(null);
	            if (freelancer != null && freelancer.getPassword().equals(password)) {
	                return new ResponseEntity<>("Freelancer", HttpStatus.OK);
	            }
	            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
	        }

	        return new ResponseEntity<>("Invalid User Type", HttpStatus.BAD_REQUEST);
	    }

	
}