package com.example.demo.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerEntity {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String mobile;
    private String email;
    private String password;
    private String address;

    @ManyToOne
    @JoinColumn(name = "cid")
    private AddJob categoryObject;

    @ManyToOne
    @JoinColumn(name = "cityid")
    private AddCity city;

    @OneToMany(mappedBy = "freelancerBooking")
    @JsonIgnore
    private List<BookFreelancer> bookingList;

    @OneToMany( mappedBy = "freelancerRating")
    @JsonIgnore
    private List<Rating> ratingsList;

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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public AddJob getCategoryObject() {
		return categoryObject;
	}

	public void setCategoryObject(AddJob categoryObject) {
		this.categoryObject = categoryObject;
	}

	public AddCity getCity() {
		return city;
	}

	public void setCity(AddCity city) {
		this.city = city;
	}

	public List<BookFreelancer> getBookingList() {
		return bookingList;
	}

	public void setBookingList(List<BookFreelancer> bookingList) {
		this.bookingList = bookingList;
	}

	public List<Rating> getRatingsList() {
		return ratingsList;
	}

	public void setRatingsList(List<Rating> ratingsList) {
		this.ratingsList = ratingsList;
	}

	public void setAddFreeJob(AddJob jobs) {
		// TODO Auto-generated method stub
		
	}


}
