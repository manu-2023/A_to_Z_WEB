package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, String>{

}
