package com.kg.extremetech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.kg.extremetech.repositories.IRepository;

public abstract class AbstractService<T, K, Repo extends IRepository<T, K>> {

  @Autowired
  public Repo repository;

  public Page<T> find(PageRequest pageRequest) {
    return repository.findAll(pageRequest);
  }

}
