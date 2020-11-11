package pl.beertrade.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.repositories.ProductRepository;
import pl.beertrade.services.ProductService;


public class Initialization implements CommandLineRunner {

    ProductService productService;

    @Override
    public void run(String... args) throws Exception {
        Beer beer = new Beer();
        if(beer == null)
            throw new IllegalArgumentException();
        productService.addProduct(beer);

    }
}
