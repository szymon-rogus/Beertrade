package pl.beertrade.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "pl.beertrade")
@EntityScan(basePackages = "pl.beertrade.model")
public class BeertradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeertradeApplication.class, args);
	}

}
