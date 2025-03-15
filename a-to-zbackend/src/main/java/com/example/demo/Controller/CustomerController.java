package com.example.demo.Controller;

import com.example.demo.Entity.FreelancerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.AddCity;
import com.example.demo.Entity.CustomerEntity;
import com.example.demo.Repository.AddCityRepository;
import com.example.demo.Repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class CustomerController {
	
	
	@Autowired
	public CustomerRepository customerRepo;

	@Autowired
	public AddCityRepository cityRepoo;
	
	
	@PostMapping("/AddCustomer/{cityid}")
	public ResponseEntity<?> addCustomer(@RequestBody CustomerEntity obj, @PathVariable int cityid) {
	    if (customerRepo.existsByEmail(obj.getEmail())) {
	        return new ResponseEntity<>("Email Already Exists", HttpStatus.BAD_REQUEST);
	    } else {
	        // Fetch the city based on the given ID
	        AddCity city = cityRepoo.findById(cityid).orElseThrow(() -> new RuntimeException("City not found with id: " + cityid));
	        if (city == null) {
	            return new ResponseEntity<>("City not found", HttpStatus.NOT_FOUND);
	        }
	        
	        // Set the city to the customer entity
	        obj.setStatus("Active");
	        obj.setCityCustomer(city);

	        // Save the customer with the city reference
	        customerRepo.save(obj);
	        
	        return new ResponseEntity<>("Customer Registered Successfully", HttpStatus.OK);
	    }
	}


	@GetMapping("/GetCustomerByEmail/{id}")
	public ResponseEntity<?> getCustomerByEmail(@PathVariable String id){
		var data = customerRepo.findByEmail(id);
		return new ResponseEntity<>(data, HttpStatus.OK);

	}

	@PutMapping("/UpdateStatus/{id}")
	public ResponseEntity<?> updateCustomerStatus(@RequestBody CustomerEntity obj,@PathVariable String id){
		var data = customerRepo.findByEmail(id).orElse (null);
		if (data != null){
			data.setStatus(obj.getStatus());
			customerRepo.save(data);
			return new ResponseEntity<>("Updated Scussessfully",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<>("Not found",HttpStatus.BAD_REQUEST);

		}


	}
	
	
	@PutMapping("/UpdateCustomer/{customerEmail}/{cid}")
	public ResponseEntity<?> updatCustomer(@PathVariable String customerEmail, @PathVariable String cid, @RequestBody CustomerEntity obj) {
	    var data = customerRepo.findByEmail(customerEmail).orElseThrow(() -> new RuntimeException("Customer Not Found"));

	    Integer cityIdInt = Integer.parseInt(cid); // Convert String to Integer
	    AddCity city_update_customer = cityRepoo.findById(cityIdInt).orElseThrow(() -> new RuntimeException("City Not Found"));

	    data.setAddress(obj.getAddress());
	    data.setName(obj.getName());
	    data.setMobile(obj.getMobile());
	    data.setPassword(obj.getPassword());
	    data.setCityCustomer(city_update_customer);
	    data.setEmail(obj.getEmail());

	    customerRepo.save(data);
	    return new ResponseEntity<>("Profile Updated Successfully", HttpStatus.OK);
	}
	

}





