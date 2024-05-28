package com.kg.extremetech.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.dtos.ProductRequestDTO;
import com.kg.extremetech.entitites.AttributeValue;
import com.kg.extremetech.entitites.Offer;
import com.kg.extremetech.entitites.Product;
import com.kg.extremetech.entitites.QAttribute;
import com.kg.extremetech.entitites.QAttributeValue;
import com.kg.extremetech.entitites.QCategory;
import com.kg.extremetech.entitites.QProduct;
import com.kg.extremetech.repositories.ProductRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Service
@Transactional
public class ProductService extends BaseServiceImp<Product, Long, ProductRepository> {

  @Autowired
  private JPAQueryFactory queryFactory;

  public Page<Product> findByFilters(ProductFiltersRequestDTO filters, Pageable pageable) {
    QProduct product = QProduct.product;
    QCategory category = QCategory.category;
    QAttributeValue attributeValue = QAttributeValue.attributeValue;
    QAttribute attribute = QAttribute.attribute;
    final var categoryCode = filters.getCategoryCode();
    final var brands = filters.getBrands();
    final var filtersList = filters.getFilters();

    final var countQuery = queryFactory.select(product.countDistinct()).from(product)
        .innerJoin(product.category, category).on(category.code.eq(categoryCode))
        .innerJoin(product.attributes, attributeValue)
        .innerJoin(attributeValue.attribute, attribute)
        .where(product.isOnSale.isTrue());

    if (brands != null && !brands.isEmpty()) {
      countQuery.where(product.brand.name.in(brands));
    }

    for (int i = 0; i < filtersList.size(); i++) {
      final var filter = filtersList.get(i);
      final var key = filter.key;
      final var values = filter.values;
      countQuery.where(
          product.attributes.any().attribute.name.eq(key)
              .and(product.attributes.any().value.in(values)));
    }

    final var total = countQuery.fetchFirst();

    System.out.println("total " + total);

    if (pageable.getPageSize() * pageable.getPageNumber() > total) {
      return new PageImpl<Product>(List.of(), pageable, total);
    }

    final var query = queryFactory.selectFrom(product)
        .innerJoin(product.category, category).on(category.code.eq(categoryCode))
        .innerJoin(product.attributes, attributeValue)
        .innerJoin(attributeValue.attribute, attribute)
        .where(product.isOnSale.isTrue());

    if (brands != null && !brands.isEmpty()) {
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

    final var size = pageable.getPageSize();
    final var page = pageable.getPageNumber();
    final var offset = page * size;

    System.out.println("pageSize " + size);
    System.out.println("pageNumber " + page);
    System.out.println("offset " + offset);

    final var results = query.fetch();

    var pagedResults = results.subList(offset, Math.min(offset + size, results.size()));

    return new PageImpl<Product>(pagedResults, pageable, total);
  }

  public Page<Product> findSortDesc(Pageable pageable) {
    final var pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
        Sort.by(Direction.DESC, "id"));
    return repository.findAll(pageRequest);
  }

  public Page<Product> findByName(String name, Pageable pageable) {
    return repository.findByName(name, pageable);
  }

  public Page<Product> findByIsFeatured(Pageable pageable) {
    return repository.findByIsFeaturedTrue(pageable);
  }

  public Product findByCode(String code) {
    return repository.findByCode(code).orElseThrow();
  }

  public Page<Product> findByDiscount(Pageable pageable) {
    return repository.findByOfferDiscount(pageable);
  }

  public Page<Product> findByCategoryCode(String categoryCode, Pageable pageable) {
    return repository.findByCategoryCode(categoryCode, pageable);
  }

  public Product removeByCode(String code) {
    return repository.removeByCode(code).orElseThrow();
  }

  public Product createProduct(ProductRequestDTO productRequest) {
    final var offer = productRequest.getOffer() != null ? Offer.builder()
        .discount(productRequest.getOffer().getDiscount())
        .build() : null;

    final var attributes = productRequest.getAttributes().stream()
        .map(attr -> AttributeValue.builder()
            .value(attr.getValue())
            .attribute(attr.getAttribute())
            .build())
        .collect(Collectors.toList());

    final var productToAdd = Product.builder()
        .name(productRequest.getName())
        .description(productRequest.getDescription())
        .price(productRequest.getPrice())
        .offer(offer)
        .attributes(attributes)
        .brand(productRequest.getBrand())
        .category(productRequest.getCategory())
        .isOnSale(productRequest.getIsOnSale())
        .stock(productRequest.getStock())
        .images(productRequest.getImages())
        .isFeatured(productRequest.getIsFeatured())
        .features(productRequest.getFeatures())
        .build();

    return repository.save(productToAdd);
  }

}
