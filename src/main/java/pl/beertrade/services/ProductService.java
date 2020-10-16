package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.ProductNotFoundException;
import pl.beertrade.model.beer.BoughtBeer;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.beer.jto.ProductDetailsJTO;
import pl.beertrade.model.beer.jto.ProductListItemJTO;
import pl.beertrade.model.beer.*;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.repositories.BoughtProductRepository;
import pl.beertrade.repositories.ProductRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BoughtProductRepository boughtProductRepository;


    public List<ProductListItemJTO> getAllProductList() {
        log.trace("ENTRY - getAllProductList");
        final List<Beer> productList = productRepository.findAll();
        final List<ProductListItemJTO> productJTOList = productList.stream()
                .map(Beer::toProductListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getAllProductList - {}", productJTOList);
        return productJTOList;
    }

    public void addProduct(Beer product) {
        log.trace("ENTRY - addProduct - {}", product);
        productRepository.save(product);
        log.trace("EXIT - addProduct");
    }

    public void orderProduct(UUID id, User client) throws ProductNotFoundException {
        log.trace("ENTRY - orderProduct - {} {}", id, client);
        final Optional<BoughtBeer> boughtBeerOptional = productRepository.findById(id)
                .map((beer) -> BoughtBeer.builder()
                        .user(client)
                        .beer(beer)
                        .price(10)  // TODO: Take price from algorithm
                        .boughtTime(Date.from(Instant.now()))
                        .build());
        final BoughtBeer boughtBeer = boughtBeerOptional.orElseThrow(() ->
                new ProductNotFoundException(String.format("Product with id: %s does not exist", id.toString())));
        boughtProductRepository.save(boughtBeer);
        log.trace("EXIT - orderProduct - {}", boughtBeer);
    }

    public List<OrderedProductListItemJTO> getOrderedProducts(Client client) {
        log.trace("ENTRY - getOrderedProducts - {}", client);
        final List<OrderedProductListItemJTO> orderedProducts = boughtProductRepository.findByUserOrderByBoughtTimeAsc(client)
                .stream()
                .map(BoughtBeer::toOrderedProductListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getOrderedProducts - {}", orderedProducts);
        return orderedProducts;
    }

    public ProductDetailsJTO getProductDetails(UUID id) throws ProductNotFoundException {
        log.trace("ENTRY - getProductDetails - {}", id);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new ProductNotFoundException(String.format("Product with id: %s does not exist", id.toString())));
        final ProductDetailsJTO productDetailsJTO = product.toProductDetailsJTO();
        log.trace("EXIT - getProductDetails - {}", productDetailsJTO);
        return productDetailsJTO;
    }

}
