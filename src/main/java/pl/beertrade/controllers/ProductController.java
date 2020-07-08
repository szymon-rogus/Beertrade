package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.UserNotClientException;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.beer.BoughtBeer;
import pl.beertrade.model.beer.OrderedProductListItemJTO;
import pl.beertrade.model.beer.ProductListItemJTO;
import pl.beertrade.services.ProductService;
import pl.beertrade.util.UserContextProvider;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserContextProvider userContextProvider;

    @RequestMapping("/list")
    public List<ProductListItemJTO> getAllProducts() {
        return productService.getAllProductList();
    }

    @PostMapping
    public void addProduct(@RequestBody Beer product) {
        productService.add(product);
    }

    @PostMapping("/order/{id}")
    public ResponseEntity<UUID> orderProduct(@PathVariable UUID id) throws UserNotClientException {
        return ResponseEntity.of(productService.order(id, userContextProvider.getUserAsClient()).map(BoughtBeer::getId));
    }

    @GetMapping("/order")
    public List<OrderedProductListItemJTO> getOrderedProducts() throws UserNotClientException {
        return productService.getOrderedProducts(userContextProvider.getUserAsClient());
    }
}
