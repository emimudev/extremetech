package com.kg.extremetech.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.entitites.Product;
import com.kg.extremetech.repositories.ProductRepository;

@Service
@Transactional
public class ProductService extends BaseServiceImp<Product, Long, ProductRepository> {

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

  public Product removeByCode(String code) {
    return repository.removeByCode(code).orElseThrow();
  }

}
