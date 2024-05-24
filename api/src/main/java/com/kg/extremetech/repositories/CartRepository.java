package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Cart;

@Repository
public interface CartRepository extends IRepository<Cart, String> {
  public Optional<Cart> findByOwnerId(String ownerId);
}
