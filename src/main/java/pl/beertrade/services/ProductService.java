package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.beer.BoughtBeer;
import pl.beertrade.model.beer.ProductDetailsJTO;
import pl.beertrade.model.beer.ProductListItemJTO;
import pl.beertrade.repositories.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductListItemJTO> getAllProductList() {
        final List<BoughtBeer> productList = productRepository.findAll();
        return productList.stream()
                .map(BoughtBeer::toProductListItemJTO)
                .collect(Collectors.toList());
    }

    public ProductDetailsJTO getProductDetails(String name) {
        final BoughtBeer product = productRepository.findByBeerName(name);
        return product.toProductDetailsJTO();
    }

}
