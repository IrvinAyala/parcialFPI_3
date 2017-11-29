package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

@Component
public class Coneccion {
	private static Coneccion cnx=null;
	public static Connection conector;


public static synchronized Coneccion getInstance(){
    
if(cnx==null){
   cnx = new Coneccion();
}     
    return cnx;
}


public Connection conectarDB() {
	try {
		conector=DriverManager.getConnection("jdbc:sqlite:src/main/java/com/example/demo/pokemon.db");
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return conector;
}

public void cerrarStatement(PreparedStatement ps) {
	try {
		ps.close();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
public void cerrarConeccion(Connection cn) {
	try {
		cn.close();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
public void cerrarResultSet(ResultSet rs) {
	try {
		rs.close();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
