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
import pl.beertrade.services.prices.BorderPrices;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService {
    private ReentrantLock globalLock = new ReentrantLock();
    private int counter;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostConstruct
    private void setCounter() {
        counter = orderRepository.findAll().size();
    }

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


    public Optional<FullProductJTO> getProduct(@NonNull UUID id) {
        log.trace("ENTRY - getProduct - {}", id);
        return  productRepository.findById(id).map(Beer::toFullProductJTO);

    }

    public void orderProduct(@NonNull UUID id, Float price, Integer amount, @NonNull Client client) throws NotFoundException {
        log.trace("ENTRY - orderProduct - {} {}", id, client);
        globalLock.lock();
        final Optional<Order> boughtBeerOptional = productRepository.findById(id)
                .map((beer) -> Order.builder()
                        .client(client)
                        .product(beer)
                        .price(price*amount)
                        .boughtDate(Date.from(Instant.now()))
                        .orderViewId(++counter)
                        .orderState(OrderState.WAITING)
                        .amount(amount)
                        .build());
        final Order order = boughtBeerOptional.orElseThrow(() ->
                new NotFoundException(Beer.class.getName(), id.toString()));
        orderRepository.save(order);
        globalLock.unlock();
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
                .filter(beer -> !beer.getProductState().equals(ProductState.ARCHIVED))
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

    public Beer setProductState(UUID id, String state) throws NotFoundException {
        log.trace("ENTRY - setProductOnStore - {} {}", id, state);
        final Optional<Beer> productOptional = productRepository.findById(id);
        final Beer product = productOptional.orElseThrow(() ->
                new NotFoundException(Beer.class.getName(), id.toString()));
        product.setProductState(ProductState.valueOf(state));
        productRepository.save(product);
        log.trace("EXIT - setProductOnStore");
        return product;
    }

    public Map<UUID, Double> getBaseProductPrices() {
        log.trace("ENTRY - getBaseProductPrices");
        final List<Beer> products = productRepository.findAll();
        final Map<UUID, Double> productPricesMap = products.stream()
                .collect(Collectors.toMap(Beer::getId, Beer::getBasePrice));
        log.trace("EXIT - getBaseProductPrices - {}", productPricesMap);
        return productPricesMap;
    }

    public List<ConfigureProductsListItemJTO> getConfigureProductsList() {
        log.trace("ENTRY - getConfigureRemoveProductsList");
        final List<ConfigureProductsListItemJTO> configureProductList = productRepository.findAll()
                .stream()
                .filter(beer -> !beer.getProductState().equals(ProductState.ARCHIVED))
                .sorted(Comparator.comparing(b -> b.getName().toLowerCase()))
                .map(Beer::toConfigureProductsListItemJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getConfigureRemoveProductsList - {}", configureProductList);
        return configureProductList;
    }

    public Optional<Beer> setBasePrice(UUID productId, Double basePrice){
        Optional<Beer> p = productRepository.findById(productId);
        if(p.isPresent()){
            Beer b = p.get();
            b.setBasePrice(basePrice);
            return Optional.of(productRepository.save(b));
        }
        return Optional.empty();
    }

    public Optional<Beer> setMinPrice(UUID productId, Double price){
        Optional<Beer> p = productRepository.findById(productId);
        if(p.isPresent()){
            Beer b = p.get();
            b.setMinPrice(price);
            return Optional.of(productRepository.save(b));
        }
        return Optional.empty();
    }
    public Optional<Beer> setMaxPrice(UUID productId, Double price){
        Optional<Beer> p = productRepository.findById(productId);
        if(p.isPresent()){
            Beer b = p.get();
            b.setMaxPrice(price);
            return Optional.of(productRepository.save(b));
        }
        return Optional.empty();
    }

    public Map<UUID, BorderPrices> getBorderPrices() {
        Map<UUID, BorderPrices> borderPrices = new HashMap<>();
        List<Beer> products = productRepository.findAll();
        for (Beer product : products) {
            borderPrices.put(product.getId(), BorderPrices.apply(product.getMinPrice(), product.getMaxPrice()));
        }
        return borderPrices;
    }
}
