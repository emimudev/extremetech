package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Category;

@Repository
public interface CategoryRepository extends IRepository<Category, String> {

  // @EntityGraph(attributePaths = { "attributes" })
  // @NonNull
  // List<Category> findAll();

  Optional<Category> findByCode(String code);

  Optional<Category> findByName(String name);
}
