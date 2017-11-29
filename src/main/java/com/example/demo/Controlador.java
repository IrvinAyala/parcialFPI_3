package com.example.demo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.http.LegacyCookieProcessor;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class Controlador {

	public static String[] userExist(String email) {
		String values[] = new String[4];

		Coneccion objeto = Coneccion.getInstance();
		Connection coneccion = objeto.conectarDB();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String query = "SELECT correo,password,idUsuario,nombre FROM usuarios WHERE correo=?";

		try {
			ps = coneccion.prepareStatement(query);
			ps.setString(1, email);
			rs = ps.executeQuery();
			if (rs.next()) {
				values[0] = rs.getString(1);// tendra el correo
				values[1] = rs.getString(2);// tendra la contraseña
				values[2] = rs.getString(3);// tendra el id
				values[3] = rs.getString(4);// tendra el nombre
			}
			return values;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} finally {
			objeto.cerrarStatement(ps);
			objeto.cerrarConeccion(coneccion);
			objeto.cerrarResultSet(rs);
		}
	}

	public static boolean emailExist(String email) {
		Coneccion objeto = Coneccion.getInstance();
		Connection coneccion = objeto.conectarDB();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String query = "SELECT correo FROM usuarios WHERE correo=?";

		try {
			ps = coneccion.prepareStatement(query);
			ps.setString(1, email);
			rs = ps.executeQuery();
			return rs.next();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} finally {
			objeto.cerrarStatement(ps);
			objeto.cerrarConeccion(coneccion);
			objeto.cerrarResultSet(rs);
		}
	}

	public static String[] crearUsuario(User user) {
		String []values=new String[4];
		Coneccion objeto = Coneccion.getInstance();
		Connection coneccion = objeto.conectarDB();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String query = "INSERT INTO usuarios (nombre,correo,password)" + "VALUES (?,?,?)";
		String query2 = "SELECT correo,password,idUsuario,nombre FROM usuarios ORDER BY idUsuario desc limit 1;";

		try {
			ps = coneccion.prepareStatement(query);
			ps.setString(1, user.getNombre());
			ps.setString(2, user.getEmail());
			ps.setString(3, user.getContrasenia());
			ps.executeUpdate();
			ps.close();
			ps = coneccion.prepareStatement(query2);
			rs = ps.executeQuery();
			if(rs.next()) {
				values[0] = rs.getString(1);// tendra el correo
				values[1] = rs.getString(2);// tendra la contraseña
				values[2] = rs.getString(3);// tendra el id
				values[3] = rs.getString(4);// tendra el nombre
			}
			return values;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} finally {
			objeto.cerrarStatement(ps);
			objeto.cerrarConeccion(coneccion);
		}
	}

	public static int insertarFavorito(int idPokemon, int idUser, String url) {

		Coneccion objeto = Coneccion.getInstance();
		Connection coneccion = objeto.conectarDB();
		PreparedStatement ps = null;
		String query = "INSERT INTO pokemon (idPokemon,idUsuario,url)" + "VALUES (?,?,?)";
		try {
			ps = coneccion.prepareStatement(query);
			ps.setInt(1, idPokemon);
			ps.setInt(2, idUser);
			ps.setString(3, url);

			return ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		} finally {
			objeto.cerrarStatement(ps);
			objeto.cerrarConeccion(coneccion);
		}

	}

	public static List<Integer> favoritos(int idUsuario) {

		Coneccion objeto = Coneccion.getInstance();
		Connection coneccion = objeto.conectarDB();
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Integer> lista = new ArrayList<>();
		String query = "SELECT idPokemon,url FROM pokemon WHERE idUsuario=?";

		try {
			ps = coneccion.prepareStatement(query);
			ps.setInt(1, idUsuario);
			rs = ps.executeQuery();
			while (rs.next()) {
				lista.add(rs.getInt(1));
			}
			return lista;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;

		} finally {
			objeto.cerrarStatement(ps);
			objeto.cerrarConeccion(coneccion);
			objeto.cerrarResultSet(rs);
		}

	}
	@Bean
	public EmbeddedServletContainerCustomizer customizer() {
	    return container -> {
	        if (container instanceof TomcatEmbeddedServletContainerFactory) {
	            TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;
	            tomcat.addContextCustomizers(context -> context.setCookieProcessor(new LegacyCookieProcessor()));
	        }
	    };
	}
}
