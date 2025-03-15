package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AddJob;
import com.example.demo.Entity.FreelancerEntity;



public interface AddJobRepository extends JpaRepository<AddJob, Integer>{
	

}
