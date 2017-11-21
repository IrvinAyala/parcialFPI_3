package com.example.demo;

import java.io.IOException;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/pokedex")
public class PokedexHandler {

	@RequestMapping(method=RequestMethod.POST)
	public void post(HttpServletRequest request,HttpServletResponse response) {
		String email=request.getParameter("email");
		User user=new User(email,request.getParameter("password"),request.getParameter("nombre"));
		if(Controlador.emailExist(email)) {
	try {
		PrintWriter out=response.getWriter();
		out.print("El email ya esta en uso");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
		
		}else {
			Controlador.crearUsuario(user);
		}
	}
	@RequestMapping(method=RequestMethod.GET)
	public void get(HttpServletRequest request,HttpServletResponse response) {
		
	}
}
