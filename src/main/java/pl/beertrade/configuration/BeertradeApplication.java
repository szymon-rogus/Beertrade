package pl.beertrade.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = "pl.beertrade")
@EntityScan(basePackages = "pl.beertrade.model")
@EnableScheduling
public class BeertradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeertradeApplication.class, args);
	}

}
