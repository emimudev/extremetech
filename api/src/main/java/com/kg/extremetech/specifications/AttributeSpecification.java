package com.kg.extremetech.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.*;
import org.springframework.lang.NonNull;

import com.kg.extremetech.dtos.KeyValuePair;
import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.entitites.AttributeValue;
import com.kg.extremetech.entitites.Product;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

public class AttributeSpecification {

  public static Specification<AttributeValue> columnEqual(ProductFiltersRequestDTO allFilters) {
    return (root, query, builder) ->  {
        List<Predicate> predicates = new ArrayList<>();
        String categoryCode = allFilters.getCategoryCode();
        final var brands = allFilters.getBrands();
        // List<KeyValuePair> filters = allFilters.getFilters();
        List<KeyValuePair> filters = List.of();
        System.out.println("categoryCode: " + categoryCode);
        if (categoryCode != null) {
          predicates.add(
            builder.and(builder.equal(root.get("product").get("category").get("code"), categoryCode))
          );
        }
        if (brands != null && !brands.isEmpty()) {
          predicates.add(
            brands.stream()
              .map(brand -> builder.equal(root.get("product").get("brand").get("name"), brand))
              .reduce(builder::or)
              .orElseThrow()
          );
        }
        // check isOnSale = true
        predicates.add(
          builder.and(
            builder.equal(root.get("product").get("isOnSale"), true)
          )
        );
        Join<Product, AttributeValue> productAttributes = root.join("product");

        // productAttributes.get();
        filters.forEach(filter -> {
          predicates.add(
            builder.and(
              builder.equal(root.get("product").get("attributes").get("attribute").get("name"), filter.key), 
              builder.equal(root.get("product").get("attributes").get("value"), filter.value))
          );
        });
        return builder.and(predicates.toArray(new Predicate[predicates.size()]));
    };
  }

}
