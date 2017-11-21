package com.example.demo;

import java.io.IOException;

import java.io.PrintWriter;

import javax.servlet.http.Cookie;
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
		PrintWriter out=null;
		int idUsuario=0;
		String email=request.getParameter("email");
		User user=new User(email,request.getParameter("password"),request.getParameter("nombre"));
		
	try {
		out=response.getWriter();
		
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}if(Controlador.emailExist(email)) {
		out.print("exist");
		out.flush();
		}else if((idUsuario=Controlador.crearUsuario(user))!=0){
			Cookie cookie = new Cookie("UserID", String.valueOf(idUsuario));
            cookie.setMaxAge(180);//segundos(3 minutos)
            cookie.setPath("/");
            response.addCookie(cookie);
			out.print("href");
			out.flush();
		}
	}
	@RequestMapping(method=RequestMethod.GET)
	public void get(HttpServletRequest request,HttpServletResponse response) {
		
	}
}
