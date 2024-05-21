package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IRepository<T, K> extends JpaRepository<T, K> {
  public Optional<T> removeById(K id);
}
