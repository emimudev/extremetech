package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.WishList;

@Repository
public interface WishListRepository extends IRepository<WishList, String> {
  public Optional<WishList> findByOwnerId(String ownerId);
  public Optional<WishList> findByOwnerEmail(String ownerEmail);
}
