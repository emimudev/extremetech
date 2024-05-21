package com.kg.extremetech.repositories;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Product;

@Repository
public interface ProductRepository extends IRepository<Product, String> {

}
