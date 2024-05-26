package com.kg.extremetech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.entitites.AttributeValue;
import com.kg.extremetech.entitites.QAttribute;
import com.kg.extremetech.entitites.QAttributeValue;
import com.kg.extremetech.entitites.QCategory;
import com.kg.extremetech.entitites.QProduct;
import com.kg.extremetech.repositories.AttributeRepository;
import com.kg.extremetech.specifications.AttributeSpecification;
import com.kg.extremetech.specifications.ProductSpecification;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

@Service
@Transactional
public class AttributeService {

  @Autowired
  private AttributeRepository attributeRepository;

  public List<AttributeValue> findByFilters(ProductFiltersRequestDTO filters) {
    return attributeRepository.findAll(AttributeSpecification.columnEqual(filters));
  }

  // @Autowired
  // private EntityManager entityManager;

  @Autowired
  private JPAQueryFactory queryFactory;

  public List<AttributeValue> getAttributesByFilter(ProductFiltersRequestDTO allFilters) {
    QProduct product = QProduct.product;
    QCategory category = QCategory.category;
    QAttributeValue attributeValue = QAttributeValue.attributeValue;
    QAttribute attribute = QAttribute.attribute;
    final var categoryCode = allFilters.getCategoryCode();
    final var brands = allFilters.getBrands();
    final var filtersList = allFilters.getFilters();

    final var query = queryFactory.select(attributeValue).from(product)
        .innerJoin(product.category, category).on(category.code.eq(categoryCode))
        .innerJoin(product.attributes, attributeValue)
        .innerJoin(attributeValue.attribute, attribute)
        .where(product.isOnSale.isTrue());

    if(brands != null && !brands.isEmpty()) {
      query.where(product.brand.name.in(brands));
    }

    for (int i = 0; i < filtersList.size(); i++) {
      final var filter = filtersList.get(i);
      final var key = filter.key;
      final var values = filter.values;
      query.where(
          product.attributes.any().attribute.name.eq(key)
              .and(product.attributes.any().value.in(values)));
    }
 
    return query.fetch();
  }
}
