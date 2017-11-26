package com.example.demo;

import java.io.IOException;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/pokedex")
public class PokedexHandler {

	@RequestMapping(method = RequestMethod.POST)
	public void post(HttpServletRequest request, HttpServletResponse response,ModelMap map) {
		String action = request.getParameter("action");
		PrintWriter out = null;
		int idUsuario = 0;
		try {
			out = response.getWriter();

		} catch (IOException e) {
			e.printStackTrace();
		}
		if (action.equals("registro")) {
			String email = request.getParameter("email");
			User user = new User(email, request.getParameter("password"), request.getParameter("nombre"));

			
			if (Controlador.emailExist(email)) {
				out.print("exist");
				out.flush();
			} else if ((idUsuario = Controlador.crearUsuario(user)) != 0) {
				Cookie cookie = new Cookie("userID", String.valueOf(idUsuario));
				cookie.setMaxAge(180);// segundos(3 minutos)
				cookie.setPath("/");
				response.addCookie(cookie);
				out.print("href");
				out.flush();
			}
		} else if (action.equals("login")) {
			String email = request.getParameter("email");
				String info[]=Controlador.userExist(email);
				String password=request.getParameter("password");
				if(email.equals(info[0])&&password.equals(info[1])) {
					Cookie cookie = new Cookie("userID", String.valueOf(info[2]));
					
					cookie.setMaxAge(180);// segundos(3 minutos)
					cookie.setPath("/");
					response.addCookie(cookie);
					out.print("href");
					out.flush();
				}else {
					out.print("error");
					out.flush();
				}
		}
	}

	@RequestMapping(value="/favoritos/{id}",method = RequestMethod.GET)
	@ResponseBody
	public List<String> get(@PathVariable int id) {
		
		return Controlador.favoritos(id);
	}
//	@RequestMapping(value="/favoritos/{id}",method = RequestMethod.GET)
//	public List<String> get(@PathVariable int id) {
//		System.out.println("este es el ID: "+id);
//		return Controlador.favoritos(id);
//	}
	
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public String postFav(@RequestBody String body) {
		String [] favsData=body.split(",");
		int idPokemon=Integer.parseInt(favsData[0]);
		int idUser=Integer.parseInt(favsData[1]);
		String url=favsData[2];
		Controlador.insertarFavorito(idPokemon,idUser,url);
		return "";
	}
}
