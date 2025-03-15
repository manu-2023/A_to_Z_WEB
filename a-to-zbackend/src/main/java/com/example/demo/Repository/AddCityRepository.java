package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AddCity;

public interface AddCityRepository extends JpaRepository<AddCity, Integer> {
	
	boolean existsByCity(String city);

}
