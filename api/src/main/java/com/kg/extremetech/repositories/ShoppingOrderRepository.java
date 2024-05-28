package com.kg.extremetech.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.ShoppingOrder;

@Repository
public interface ShoppingOrderRepository extends IRepository<ShoppingOrder, Long>{
  public Page<ShoppingOrder> findByCustomerId(String customerId, Pageable pageable);
  public Page<ShoppingOrder> findByCustomerEmail(String customerEmail, Pageable pageable);
}
