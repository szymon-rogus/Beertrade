package pl.beertrade.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "pl.beertrade")
public class BeertradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeertradeApplication.class, args);
	}

}
