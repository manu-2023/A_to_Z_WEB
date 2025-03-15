
package com.example.demo.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AddJob {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cid;
    private String categoryName;


    @OneToMany (mappedBy = "categoryObject")
    @JsonIgnore
    private List<FreelancerEntity> freelancer;


	public Integer getcId() {
		return cid;
	}


	public void setcId(Integer cid) {
		this.cid = cid;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public List<FreelancerEntity> getFreelancer() {
		return freelancer;
	}


	public void setFreelancer(List<FreelancerEntity> freelancer) {
		this.freelancer = freelancer;
	}


	
}