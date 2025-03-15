package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookFreelancer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "LONGTEXT")
    private String complaint;

    @Column(columnDefinition = "LONGTEXT")
    private String complaintReply;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private String date;
    private Float amount;
    private String status;
    private String appDate;
    private String appTime;

    @ManyToOne
    @JoinColumn(name = "cid")
    private CustomerEntity customerBooking;

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComplaint() {
		return complaint;
	}

	public void setComplaint(String complaint) {
		this.complaint = complaint;
	}

	public String getComplaintReply() {
		return complaintReply;
	}

	public void setComplaintReply(String complaintReply) {
		this.complaintReply = complaintReply;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAppDate() {
		return appDate;
	}

	public void setAppDate(String appDate) {
		this.appDate = appDate;
	}

	public String getAppTime() {
		return appTime;
	}

	public void setAppTime(String appTime) {
		this.appTime = appTime;
	}

	public CustomerEntity getCustomerBooking() {
		return customerBooking;
	}

	public void setCustomerBooking(CustomerEntity customerBooking) {
		this.customerBooking = customerBooking;
	}

	public FreelancerEntity getFreelancerBooking() {
		return freelancerBooking;
	}

	public void setFreelancerBooking(FreelancerEntity freelancerBooking) {
		this.freelancerBooking = freelancerBooking;
	}

	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

	@ManyToOne
    @JoinColumn(name = "fid",nullable= false)
    private FreelancerEntity freelancerBooking;

    @OneToMany(mappedBy = "bookingRating")
    @JsonIgnore
    private List<Rating> ratings;
}
