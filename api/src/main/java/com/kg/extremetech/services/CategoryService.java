package com.kg.extremetech.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.entitites.Category;
import com.kg.extremetech.repositories.CategoryRepository;

@Service
@Transactional
public class CategoryService extends BaseServiceImp<Category, Long, CategoryRepository> {

  public Category findByName(String name) {
    return repository
        .findByName(name)
        .orElseThrow();
  }

  public Category findByCode(String code) {
    return repository
        .findByCode(code)
        .orElseThrow();
  }

}
