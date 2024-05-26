package com.kg.extremetech.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.*;
import org.springframework.lang.NonNull;

import com.kg.extremetech.dtos.KeyValuePair;
import com.kg.extremetech.dtos.KeyValuePairList;
import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.entitites.Product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification {

  public static Specification<Product> columnEqual(ProductFiltersRequestDTO allFilters) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();
      String categoryCode = allFilters.getCategoryCode();
      final var brands = allFilters.getBrands();
      List<KeyValuePairList> filters = allFilters.getFilters();
      System.out.println("categoryCode: " + categoryCode);
      predicates.add(
          criteriaBuilder.and(criteriaBuilder.equal(root.get("category").get("code"), categoryCode)));
      if (brands != null && !brands.isEmpty()) {
        predicates.add(
            criteriaBuilder.and(root.get("brand").get("name").in(brands)));
      }
      // check isOnSale = true
      predicates.add(
          criteriaBuilder.and(criteriaBuilder.equal(root.get("isOnSale"), true)));
      // for (int i = 0; i < filtersList.size(); i++) {
      // final var filter = filtersList.get(i);
      // final var key = filter.key;
      // final var values = filter.values;
      // query.where(
      // product.attributes.any().attribute.name.eq(key)
      // .and(product.attributes.any().value.in(values)));
      // }

      // filters.forEach(filter -> {
      //   predicates.add(
      //       criteriaBuilder.and(
      //           criteriaBuilder.equal(root.get("attributes").get("attribute").get("name"), filter.key),
      //           criteriaBuilder.any(
      //               query.subquery(null).from(root.getClass())
      //           ).));
      // });

      return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
    };
  }

}
