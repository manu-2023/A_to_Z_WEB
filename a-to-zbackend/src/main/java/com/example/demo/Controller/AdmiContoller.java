


package com.example.demo.Controller;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Entity.CustomerEntity;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AdmiContoller {
    @Autowired
    public AdminRepository adminRepo;

    @Autowired
    public CustomerRepository customerRepoAdmin;

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<?> updatePassword (@RequestBody AdminEntity obj, @PathVariable String id){
        var data = adminRepo.findById(id).orElse(null);
        if (data != null){
            data.setPassword(obj.getPassword());
            adminRepo.save(data);
            return new ResponseEntity<>("Password Upadated Succesfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot Upadated Succesfully", HttpStatus.BAD_REQUEST);


    }

    @GetMapping("/GetCustomer")
    public ResponseEntity<?> getCustomer(){
        List<CustomerEntity> data=customerRepoAdmin.findAll();
        return new ResponseEntity<>(data,HttpStatus.OK);
    }



}
