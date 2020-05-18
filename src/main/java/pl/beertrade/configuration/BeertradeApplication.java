package pl.beertrade.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "pl.beertrade")
@EntityScan(basePackages = "pl.beertrade.model")
@EnableJpaRepositories(basePackages = "pl.beertrade.repositories")
public class BeertradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeertradeApplication.class, args);
	}

}
