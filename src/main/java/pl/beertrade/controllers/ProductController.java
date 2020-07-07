package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.model.beer.ProductDetailsJTO;
import pl.beertrade.model.beer.ProductListItemJTO;
import pl.beertrade.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping("/list")
    public List<ProductListItemJTO> getAllProducts() {
        return productService.getAllProductList();
    }

    @RequestMapping("/details/{productName}")
    public ProductDetailsJTO getProductDetails(@PathVariable String productName) {
        return productService.getProductDetails(productName);
    }

}
