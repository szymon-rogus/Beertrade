package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.ProductNotFoundException;
import pl.beertrade.model.beer.jto.ManageProductsListItemJTO;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.beer.jto.ProductDetailsJTO;
import pl.beertrade.model.beer.jto.ProductListItemJTO;
import pl.beertrade.model.beer.*;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.OrderRepository;
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
    private OrderRepository orderRepository;

    public List<ProductListItemJTO> getAllProductOnStoreList() {
        log.trace("ENTRY - getAllProductList");
        final List<Beer> productList = productRepository.findAll();
        final List<ProductListItemJTO> productJTOList = productList.stream()
                .filter(Beer::isOnStore)
                .map(Beer::toProductListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getAllProductList - {}", productJTOList);
        return productJTOList;
    }

    public void addProduct(@NonNull Beer product) {
        log.trace("ENTRY - addProduct - {}", product);
        productRepository.save(product);
        log.trace("EXIT - addProduct");
    }

    public void orderProduct(@NonNull UUID id, @NonNull Client client) throws ProductNotFoundException {
        log.trace("ENTRY - orderProduct - {} {}", id, client);
        final Optional<Order> boughtBeerOptional = productRepository.findById(id)
                .map((beer) -> Order.builder()
                        .client(client)
                        .product(beer)
                        .price(10)  // TODO: Take price from algorithm
                        .boughtDate(Date.from(Instant.now()))
                        .build());
        final Order order = boughtBeerOptional.orElseThrow(() ->
                new ProductNotFoundException(String.format("Product with id: %s does not exist", id.toString())));
        orderRepository.save(order);
        log.trace("EXIT - orderProduct - {}", order);
    }

    public List<OrderedProductListItemJTO> getClientOrderedProducts(@NonNull Client client) {
        log.trace("ENTRY - getUserOrderedProducts - {}", client);
        final List<OrderedProductListItemJTO> orderedProducts = orderRepository.findByClientOrderByBoughtDateAsc(client)
                .stream()
                .map(Order::toOrderedProductListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getUserOrderedProducts - {}", orderedProducts);
        return orderedProducts;
    }

    public List<ManageProductsListItemJTO> getManageRemoveProductsList() {
        log.trace("ENTRY - getManageRemoveProductsList");
        final List<ManageProductsListItemJTO> manageProductList = productRepository.findAll()
                .stream()
                .filter(Beer::isOnStore)
                .map(Beer::toManageProductsListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getManageRemoveProductsList - {}", manageProductList);
        return manageProductList;
    }

    public List<ManageProductsListItemJTO> getManageAddProductsList() {
        log.trace("ENTRY - getManageAddProductsList");
        final List<ManageProductsListItemJTO> manageProductList = productRepository.findAll()
                .stream()
                .filter(product -> !product.isOnStore())
                .map(Beer::toManageProductsListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getManageAddProductsList - {}", manageProductList);
        return manageProductList;
    }

    public ProductDetailsJTO getProductDetails(@NonNull UUID id) throws ProductNotFoundException {
        log.trace("ENTRY - getProductDetails - {}", id);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new ProductNotFoundException(String.format("Product with id: %s does not exist", id.toString())));
        final ProductDetailsJTO productDetailsJTO = product.toProductDetailsJTO();
        log.trace("EXIT - getProductDetails - {}", productDetailsJTO);
        return productDetailsJTO;
    }

    public void setProductOnStore(UUID id, boolean onStore) throws ProductNotFoundException {
        log.trace("ENTRY - setProductOnStore - {} {}", id, onStore);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new ProductNotFoundException(String.format("Product with id: %s does not exist", id.toString())));
        product.setOnStore(onStore);
        productRepository.save(product);
        log.trace("EXIT - setProductOnStore");
    }

}
