package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.beer.enums.ProductState;
import pl.beertrade.model.beer.jto.*;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.beer.*;
import pl.beertrade.model.order.enums.OrderState;
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
    private static final int orderViewId = 321;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<ProductListItemJTO> getAllProductOnStoreList() {
        log.trace("ENTRY - getAllProductList");
        final List<Beer> productList = productRepository.findAll();
        final List<ProductListItemJTO> productJTOList = productList.stream()
                .filter(beer -> beer.getProductState().equals(ProductState.ON_STORE))
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

    public void orderProduct(@NonNull UUID id, @NonNull Client client) throws NotFoundException {
        log.trace("ENTRY - orderProduct - {} {}", id, client);
        final Optional<Order> boughtBeerOptional = productRepository.findById(id)
                .map((beer) -> Order.builder()
                        .client(client)
                        .product(beer)
                        .price(10)  // TODO: Take price from algorithm
                        .boughtDate(Date.from(Instant.now()))
                        .orderViewId(orderViewId)
                        .orderState(OrderState.WAITING)
                        .amount(1)
                        .build());
        final Order order = boughtBeerOptional.orElseThrow(() ->
                new NotFoundException(Beer.class.getName(), id.toString()));
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

    public List<ManageProductsListItemJTO> getManageProductsList() {
        log.trace("ENTRY - getManageRemoveProductsList");
        final List<ManageProductsListItemJTO> manageProductList = productRepository.findAll()
                .stream()
                .map(Beer::toManageProductsListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getManageRemoveProductsList - {}", manageProductList);
        return manageProductList;
    }

    public ProductDetailsJTO getProductDetails(@NonNull UUID id) throws NotFoundException {
        log.trace("ENTRY - getProductDetails - {}", id);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new NotFoundException(Beer.class.getName(), id.toString()));
        final ProductDetailsJTO productDetailsJTO = product.toProductDetailsJTO();
        log.trace("EXIT - getProductDetails - {}", productDetailsJTO);
        return productDetailsJTO;
    }

    public Beer setProductOnStore(UUID id, String state) throws NotFoundException {
        log.trace("ENTRY - setProductOnStore - {} {}", id, state);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new NotFoundException(Beer.class.getName(), id.toString()));
        product.setProductState(ProductState.valueOf(state));
        productRepository.save(product);
        log.trace("EXIT - setProductOnStore");
        return product;
    }

}
