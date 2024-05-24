package com.kg.extremetech.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.CartItemDTO;
import com.kg.extremetech.entitites.Cart;
import com.kg.extremetech.entitites.CartItem;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.repositories.CartItemRepository;
import com.kg.extremetech.repositories.CartRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CartService extends BaseServiceImp<Cart, String, CartRepository> {
  @Autowired
  private CartItemRepository cartItemRepository;

  public Cart findByOwner(String ownerId) {
    return repository.findByOwnerId(ownerId).orElseThrow();
  }

  public Cart createCart(User owner) {
    Cart cart = Cart.builder().owner(owner).build();
    return repository.save(cart);
  }

  public CartItem addItem(User owner, CartItemDTO item) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    CartItem cartItem = CartItem.builder()
      .cart(cart)
      .product(item.getProduct())
      .quantity(item.getQuantity())
      .build();
    return cartItemRepository.save(cartItem);
  }

  public void deleteItem(User owner, String cartId, Long itemId) {
    Cart cart = repository.findById(cartId).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    if(cart.getItems().stream().noneMatch(item -> item.getId().equals(itemId))) {
      throw new NoSuchElementException("Item not found in the cart");
    }
    cartItemRepository.deleteById(itemId);
  }

  public void clean(User owner, String cartId) {
    Cart cart = repository.findById(cartId).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new IllegalArgumentException("You are not the owner of this cart");
    }
    cartItemRepository.deleteAll(cart.getItems());
  }

}
