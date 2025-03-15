package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.CustomerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.AddCity;
import com.example.demo.Repository.AddCityRepository;

@RestController
@CrossOrigin("*")
public class CityController {
	
	
	@Autowired
	private AddCityRepository cityrepo;
	
	
	@PostMapping("/addCity")
	public ResponseEntity<?> addCity(@RequestBody AddCity obj){
		if (cityrepo.existsByCity(obj.getCity())){
			return new ResponseEntity<>("City already exists" , HttpStatus.BAD_REQUEST);
		}
		else {
			cityrepo.save(obj);
			return new ResponseEntity<>("City Added Succesfully" ,HttpStatus.OK);
		}
	
	}
	
	
	@GetMapping("/GetCity")
	public ResponseEntity<?> getCity(){
		var data = cityrepo.findAll();
		return new ResponseEntity<>(data,HttpStatus.OK);
		
	}

	@PutMapping("/updateCity/{id}")
	public ResponseEntity<?> updateCity(@PathVariable int id,@RequestBody AddCity obj){
		if(cityrepo.existsById(id)){
			var data = cityrepo.findById(id).orElse(null);
			if(data!=null){
				data.setCity(obj.getCity());
				cityrepo.save(data);
				return new ResponseEntity<>("City Updated Succesfully" ,HttpStatus.OK);
			}
		}

		return new ResponseEntity<>("City Not Found" ,HttpStatus.NOT_FOUND);
	}


	



}
