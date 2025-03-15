package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.FreelancerEntity;

public interface FreelancerRepository extends JpaRepository<FreelancerEntity, Integer>{
	
	Optional<FreelancerEntity> findByEmail(String email);
	boolean existsByEmail (String email);

	Optional<FreelancerEntity> findByMobile(String mobile);
	boolean existsByMobile(String mobile);
	
	

	
}
