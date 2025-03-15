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

public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String feedback;
    private String date;

    @ManyToOne
    @JoinColumn(name = "cid")
    private CustomerEntity customerFeedback;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public CustomerEntity getCustomerFeedback() {
		return customerFeedback;
	}

	public void setCustomerFeedback(CustomerEntity customerFeedback) {
		this.customerFeedback = customerFeedback;
	}
}

