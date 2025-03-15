package com.example.demo.Entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter

public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private float rating;

    @ManyToOne
    @JoinColumn(name = "cid")
    private CustomerEntity customerRating;

    public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public float getRating() {
		return rating;
	}


	public void setRating(float rating) {
		this.rating = rating;
	}


	public CustomerEntity getCustomerRating() {
		return customerRating;
	}


	public void setCustomerRating(CustomerEntity customerRating) {
		this.customerRating = customerRating;
	}


	public FreelancerEntity getFreelancerRating() {
		return freelancerRating;
	}


	public void setFreelancerRating(FreelancerEntity freelancerRating) {
		this.freelancerRating = freelancerRating;
	}


	public BookFreelancer getBookingRating() {
		return bookingRating;
	}


	public void setBookingRating(BookFreelancer bookingRating) {
		this.bookingRating = bookingRating;
	}


	@ManyToOne
    @JoinColumn(name = "fid")
    private FreelancerEntity freelancerRating;


    @ManyToOne
    @JoinColumn(name = "bid")
    private BookFreelancer  bookingRating;
}
