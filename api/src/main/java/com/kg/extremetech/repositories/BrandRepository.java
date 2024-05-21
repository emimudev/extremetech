package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Brand;

@Repository
public interface BrandRepository extends IRepository<Brand, String> {
  public Optional<Brand> findByName(String name);
}
