package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer>{
	
	Optional<CustomerEntity> findByEmail(String email);

	boolean existsByEmail(String email);
}
