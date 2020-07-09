package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.UserNotClientException;
import pl.beertrade.model.beer.*;
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

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailsJTO> getProductDetails(@PathVariable UUID id) {
        return ResponseEntity.of(productService.getProductDetails(id));
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
