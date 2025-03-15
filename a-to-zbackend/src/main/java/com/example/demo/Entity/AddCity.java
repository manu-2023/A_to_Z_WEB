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
public class AddCity {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String city;

	    @OneToMany(mappedBy = "city")
	    @JsonIgnore
	    private List<FreelancerEntity> freelancerCity;

	    @OneToMany(mappedBy = "cityCustomer")
	    @JsonIgnore
	    private List<CustomerEntity> customers;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public List<FreelancerEntity> getFreelancerCity() {
			return freelancerCity;
		}

		public void setFreelancerCity(List<FreelancerEntity> freelancerCity) {
			this.freelancerCity = freelancerCity;
		}

		public List<CustomerEntity> getCustomers() {
			return customers;
		}

		public void setCustomers(List<CustomerEntity> customers) {
			this.customers = customers;
		}

	
	
	
	
	
}
