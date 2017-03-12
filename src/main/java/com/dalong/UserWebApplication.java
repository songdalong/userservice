package com.dalong;
 
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;


@SpringBootApplication
@ComponentScan
@Controller
public class UserWebApplication { 
    public static void main(String[] args) {
    	SpringApplication app = new SpringApplication(UserWebApplication.class);
    	app.setLogStartupInfo(false);
    	app.run(args);
    }
}
