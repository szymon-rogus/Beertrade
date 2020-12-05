package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.beer.jto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.model.beer.*;
import pl.beertrade.services.ProductService;
import pl.beertrade.util.UserContextProvider;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserContextProvider userContextProvider;

    @GetMapping("/onStore")
    public List<ProductListItemJTO> getAllProductsOnStore() {
        log.trace("ENTRY - getAllProductsOnStore");
        final List<ProductListItemJTO> productList = productService.getAllProductOnStoreList();
        log.trace("EXIT - getAllProductsOnStore - {}", productList);
        return productList;
    }

    @GetMapping("/manage/all")
    public List<ManageProductsListItemJTO> getManageProductsList() {
        log.trace("ENTRY - getManageEnabledProductsList");
        final List<ManageProductsListItemJTO> productList = productService.getManageProductsList();
        log.trace("EXIT - getManageEnabledProductsList - {}", productList);
        return productList;
    }

    @GetMapping("/configure/all")
    public List<ConfigureProductsListItemJTO> getConfigureProductsList() {
        final List<ConfigureProductsListItemJTO> productList = productService.getConfigureProductsList();
        return productList;
    }

    @PostMapping("/state/{id}/{state}")
    public ManageProductsListItemJTO setProductState(@PathVariable UUID id, @PathVariable String state) throws NotFoundException {
        log.trace("ENTRY - enableProduct");
        final ManageProductsListItemJTO manageProductsListItem = productService.setProductState(id, state)
                .toManageProductsListItemJTO();
        log.trace("EXIT - enableProduct - {}", manageProductsListItem);
        return manageProductsListItem;
    }

    @GetMapping("/{id}")
    public ProductDetailsJTO getProductDetails(@PathVariable UUID id) throws NotFoundException {
        log.trace("ENTRY - getProductDetails - {}", id);
        final ProductDetailsJTO productDetails = productService.getProductDetails(id);
        log.trace("EXIT - getProductDetails - {}", productDetails);
        return productDetails;
    }

    @PostMapping
    public void addProduct(@RequestBody Beer product) {
        log.trace("ENTRY - addProduct - {}", product);
        productService.addProduct(product);
        log.trace("EXIT - addProduct");
    }

    @PostMapping("/order/{id}")
    public ResponseEntity<?> orderProduct(@PathVariable UUID id, @RequestBody LinkedHashMap<String, Float> price) throws NotFoundException {
        log.trace("ENTRY - orderProduct - {}", id);
        productService.orderProduct(id, price.get("price"), userContextProvider.getUserAsClient());
        log.trace("EXIT - orderProduct");
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/order")
    public List<OrderedProductListItemJTO> getClientOrderedProducts() throws NotFoundException {
        log.trace("ENTRY - getUserOrderedProducts");
        final List<OrderedProductListItemJTO> orderedProductList = productService.getClientOrderedProducts(userContextProvider.getUserAsClient());
        log.trace("EXIT - getUserOrderedProducts - {}", orderedProductList);
        return orderedProductList;
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> handleException(Exception e) {
        log.warn(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

}
