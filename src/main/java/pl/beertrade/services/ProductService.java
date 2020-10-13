package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.beer.*;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.repositories.BoughtProductRepository;
import pl.beertrade.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BoughtProductRepository boughtProductRepository;


    public List<ProductListItemJTO> getAllProductList() {
        final List<Beer> productList = productRepository.findAll();
        return productList.stream()
                .map(Beer::toProductListItemJTO)
                .collect(Collectors.toList());
    }

    public void add(Beer product) {
        productRepository.save(product);
    }

    public Optional<BoughtBeer> order(UUID id, User client) {
        Optional<BoughtBeer> bb = productRepository.findById(id).map((b) -> BoughtBeer.builder().user(client).beer(b).price(10).boughtTime(System.currentTimeMillis()).build());
        bb.ifPresent(boughtBeer -> boughtProductRepository.save(boughtBeer));
        return bb;
    }

    public List<OrderedProductListItemJTO> getOrderedProducts(Client userAsClient) {
        return boughtProductRepository.findByUserOrderByBoughtTimeAsc(userAsClient)
                .stream()
                .map(BoughtBeer::toOrderedProductListItemJTO)
                .collect(Collectors.toList());
    }


    public Optional<ProductDetailsJTO> getProductDetails(UUID id) {
        return productRepository.findById(id).map(Beer::toProductDetailsJTO);
    }
}
