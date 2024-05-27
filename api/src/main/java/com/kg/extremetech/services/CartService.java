package com.kg.extremetech.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.CartItemRequestDTO;
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
    final var result = repository.findByOwnerId(ownerId).orElseThrow();
    System.out.println("SIZE: " + result.getItems().size());
    for (CartItem item : result.getItems()) {
      System.out.println(item);
    }
    return result;
  }

  public Cart createCart(User owner) {
    Cart cart = Cart.builder().owner(owner).build();
    return repository.save(cart);
  }

  public CartItem addItem(User owner, CartItemRequestDTO item) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    // if item.product is already in the cart, then update the quantity of the item
    CartItem cartItem = cart
        .getItems()
        .stream()
        .filter(i -> i.getProduct().getId().equals(item.getProduct().getId()))
        .findFirst()
        .orElse(CartItem.builder().quantity(0).cart(cart).product(item.getProduct()).build());
    cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
    return cartItemRepository.save(cartItem);
  }

  public List<CartItem> addItem(User owner, List<CartItemRequestDTO> items) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    return cartItemRepository.saveAll(items.stream().map(i -> CartItem.builder()
        .cart(cart)
        .product(i.getProduct())
        .quantity(i.getQuantity())
        .build()).toList());
  }

  public void removeOne(User owner, Long itemId) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    final var optionalCartItem = cart.getItems().stream().filter(i -> i.getId().equals(itemId)).findFirst();
    if (optionalCartItem.isEmpty()) {
      throw new NoSuchElementException("Item not found in the cart");
    }
    final var cartItem = optionalCartItem.get();
    if (cartItem.getQuantity() > 1) {
      cartItem.setQuantity(cartItem.getQuantity() - 1);
      cartItemRepository.save(cartItem);
    } else {
      cartItemRepository.deleteById(itemId);
    }
  }

  public void deleteItem(User owner, Long itemId) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new AccessDeniedException("You are not the owner of this cart");
    }
    if (cart.getItems().stream().noneMatch(item -> item.getId().equals(itemId))) {
      throw new NoSuchElementException("Item not found in the cart");
    }
    cartItemRepository.deleteById(itemId);
  }

  public Cart clean(User owner) {
    Cart cart = repository.findByOwnerId(owner.getId()).orElseThrow();
    if (!cart.getOwner().getId().equals(owner.getId())) {
      throw new IllegalArgumentException("You are not the owner of this cart");
    }
    cartItemRepository.deleteAll(cart.getItems());
    return repository.findByOwnerId(owner.getId()).orElseThrow();
  }

}
