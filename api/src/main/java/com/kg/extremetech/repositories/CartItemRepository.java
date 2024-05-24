package com.kg.extremetech.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.CartItem;

@Repository
public interface CartItemRepository extends IRepository<CartItem, Long> {
  
  //  @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId")
  public List<CartItem> findByCartId(String cartId);

}
