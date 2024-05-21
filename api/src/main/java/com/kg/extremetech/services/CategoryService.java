package com.kg.extremetech.services;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.entitites.Category;
import com.kg.extremetech.repositories.CategoryRepository;

@Service
@Transactional
public class CategoryService extends BaseServiceImp<Category, String, CategoryRepository> {

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
