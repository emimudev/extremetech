package com.kg.extremetech.services;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.entitites.Brand;
import com.kg.extremetech.repositories.BrandRepository;

@Service
@Transactional
public class BrandService extends BaseServiceImp<Brand, String, BrandRepository> {

  public Brand findByName(String name) {
    return repository
        .findByName(name)
        .orElseThrow(() -> new NoSuchElementException("Brand not found"));
  }

}
