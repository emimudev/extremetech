package com.kg.extremetech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.kg.extremetech.repositories.IRepository;

public class BaseServiceImp<T, K, Repository extends IRepository<T, K>> {
  
  @Autowired
  public Repository repository;

  public List<T> findAll() {
    return repository.findAll();
  }

  public Page<T> find(PageRequest pageRequest) {
    return repository.findAll(pageRequest);
  }

  public T findById(K id) {
    return repository.findById(id).orElseThrow();
  }

  public T save(T entity) {
    return repository.save(entity);
  }

  public T update(T entity) {
    return repository.save(entity);
  }

  public void deleteById(K id) {
    repository.deleteById(id);
  }

  public T removeById(K id) {
    return repository.removeById(id).orElseThrow();
  }

  public void delete(T entity) {
    repository.delete(entity);
  }

  public boolean existsById(K id) {
    return repository.existsById(id);
  }

  public long count() {
    return repository.count();
  }

}
