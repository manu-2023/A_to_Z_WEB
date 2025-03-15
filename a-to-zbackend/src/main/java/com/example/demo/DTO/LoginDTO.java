package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginDTO {

    private String userType;
    private String id;
    private String password;
    
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
