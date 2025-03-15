package com.example.demo.Entity;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CustomerEntity {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;
	    private String name;
	    private String mobile;
	    private String address;
	    private String email;
	    private String password;
	    private String status;

	    @ManyToOne
	    @JoinColumn(name = "cityid")
	    private AddCity cityCustomer;


	    @OneToMany( mappedBy = "customerBooking")
	    @JsonIgnore
	    private List<BookFreelancer> booking;

	    @OneToMany( mappedBy = "customerFeedback")
	    @JsonIgnore
	    private List<Feedback> feedbacks;

	    public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public AddCity getCityCustomer() {
			return cityCustomer;
		}

		public void setCityCustomer(AddCity cityCustomer) {
			this.cityCustomer = cityCustomer;
		}

		public List<BookFreelancer> getBooking() {
			return booking;
		}

		public void setBooking(List<BookFreelancer> booking) {
			this.booking = booking;
		}

		public List<Feedback> getFeedbacks() {
			return feedbacks;
		}

		public void setFeedbacks(List<Feedback> feedbacks) {
			this.feedbacks = feedbacks;
		}

		public List<Rating> getRatings() {
			return ratings;
		}

		public void setRatings(List<Rating> ratings) {
			this.ratings = ratings;
		}

		@OneToMany( mappedBy = "customerRating")
	    @JsonIgnore
	    private List<Rating> ratings;

		public void setCity(AddCity city) {
		    this.cityCustomer = cityCustomer;
			
		}



}
