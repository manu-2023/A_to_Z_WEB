package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.AddJob;
import com.example.demo.Repository.AddJobRepository;

@RestController
@CrossOrigin("*")
public class JobController {

	 @Autowired
	    private AddJobRepository categaoryRepo;

	    @PostMapping("/AddCategory")
	    public ResponseEntity<?> addCategory(@RequestBody AddJob obj){
	        categaoryRepo.save(obj);
	        return new ResponseEntity<>("Category added successfully", HttpStatus.OK);
	    }

	    @GetMapping("/GetCategory")
	    public ResponseEntity<?> getCategory(){
	        var data = categaoryRepo.findAll();
	        return new ResponseEntity<>(data,HttpStatus.OK);
	    }

	    @PutMapping("/UpdateCategory/{cid}")
	    public ResponseEntity<?> updateCategory (@PathVariable Integer cid, @RequestBody AddJob obj){
	        System.out.println("Updating category with ID: " + cid);  // Debugging log
	        var data = categaoryRepo.findById(cid).orElseThrow(()->new RuntimeException("Id not found"));
	        data.setCategoryName(obj.getCategoryName());
	        categaoryRepo.save(data);
	        return new ResponseEntity<>("Category updated successfully", HttpStatus.OK);
	    }

	    @DeleteMapping("/DeleteCategory/{cid}")
	    public ResponseEntity<?> deleteCategory (@PathVariable Integer cid) {
	        var data = categaoryRepo.findById(cid).orElseThrow(() -> new RuntimeException("Id not found"));
	        categaoryRepo.delete(data);
	        return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);

	    }
}
