package com.example.demo;

public class User {
	
	public String email;
	public String Contrasenia;
	public String nombre;

	public User() {
		
	}
	
	public User(String email,String contrasenia,String nombre) {
		this.email=email;
		this.Contrasenia=contrasenia;
		this.nombre=nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContrasenia() {
		return Contrasenia;
	}

	public void setContrasenia(String contrasenia) {
		Contrasenia = contrasenia;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
