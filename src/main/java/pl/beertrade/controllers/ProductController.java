package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.exception.ProductNotFoundException;
import pl.beertrade.exception.UserNotFoundException;
import pl.beertrade.model.beer.jto.ManageProductsListItemJTO;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.beer.jto.ProductDetailsJTO;
import pl.beertrade.model.beer.jto.ProductListItemJTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.model.beer.*;
import pl.beertrade.services.ProductService;
import pl.beertrade.util.UserContextProvider;

import java.util.Arrays;
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
        log.trace("ENTRY - getAllProducts");
        final List<ProductListItemJTO> productList = productService.getAllProductOnStoreList();
        log.trace("EXIT - getAllProducts - {}", productList);
        return productList;
    }

    @GetMapping("/manage/remove/all")
    public List<ManageProductsListItemJTO> getManageRemoveProductsList() {
        log.trace("ENTRY - getAllProducts");
        final List<ManageProductsListItemJTO> productList = productService.getManageRemoveProductsList();
        log.trace("EXIT - getAllProducts - {}", productList);
        return productList;
    }

    @GetMapping("/manage/add/all")
    public List<ManageProductsListItemJTO> getManageAddProductsList() {
        log.trace("ENTRY - getManageAddProductsList");
        final List<ManageProductsListItemJTO> productList = productService.getManageAddProductsList();
        log.trace("EXIT - getManageAddProductsList - {}", productList);
        return productList;
    }

    @PostMapping("/enable/{id}")
    public void enableProduct(@PathVariable UUID id) throws ProductNotFoundException {
        log.trace("ENTRY - enableProduct");
        productService.setProductOnStore(id, true);
        log.trace("EXIT - enableProduct");
    }

    @PostMapping("/disable/{id}")
    public void disableProduct(@PathVariable UUID id) throws ProductNotFoundException {
        log.trace("ENTRY - disableProduct");
        productService.setProductOnStore(id, false);
        log.trace("EXIT - disableProduct");
    }

    @GetMapping("/{id}")
    public ProductDetailsJTO getProductDetails(@PathVariable UUID id) throws ProductNotFoundException {
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
    public ResponseEntity<?> orderProduct(@PathVariable UUID id) throws UserNotFoundException, ProductNotFoundException {
        log.trace("ENTRY - orderProduct - {}", id);
        productService.orderProduct(id, userContextProvider.getUserAsClient());
        log.trace("EXIT - orderProduct");
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/order")
    public List<OrderedProductListItemJTO> getClientOrderedProducts() throws UserNotFoundException {
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
