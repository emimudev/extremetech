package com.kg.extremetech.services;

import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.ProductResponseDTO;
import com.kg.extremetech.entitites.Product;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.entitites.WishList;
import com.kg.extremetech.repositories.WishListRepository;

@Service
public class WishListService extends BaseServiceImp<WishList, String, WishListRepository> {

  public WishList findByOwnerId(String ownerId) {
    return repository.findByOwnerId(ownerId).orElseThrow();
  }

  public WishList findByOwnerEmail(String ownerEmail) {
    return repository.findByOwnerEmail(ownerEmail).orElseThrow();
  }

  public WishList addItem(User owner, ProductResponseDTO product) {
    final var wishList = findByOwnerId(owner.getId());
    wishList.getItems().add(
        Product.builder()
            .id(product.getId())
            .build());
    return repository.save(wishList);
  }

  public WishList removeItem(User owner, ProductResponseDTO product) {
    final var wishList = findByOwnerId(owner.getId());
    for (Product item : wishList.getItems()) {
      if (item.getId().equals(product.getId())) {
        wishList.getItems().remove(item);
        break;
      }
    }
    return repository.save(wishList);
  }

}
