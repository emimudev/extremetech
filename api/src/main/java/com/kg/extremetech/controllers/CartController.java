package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.CartDTO;
import com.kg.extremetech.dtos.CartItemDTO;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/v1/cart")
public class CartController {
  @Autowired
  private CartService cartService;

  @GetMapping("/{cartId}")
  public ResponseEntity<?> findById(@RequestParam String cartId) {
    return Response.of(() -> CartDTO.from(cartService.findById(cartId)));
  }

  @GetMapping("/owner/{ownerId}")
  public ResponseEntity<?> findByOwner(@PathVariable String ownerId) {
    return Response.of(() -> CartDTO.from(cartService.findByOwner(ownerId)));
  }

  @GetMapping("/clean")
  public ResponseEntity<?> clean(@RequestParam String cartId) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    cartService.clean(currentUser, cartId);
    return Response.ok();
  }

  @PostMapping("/item")
  public ResponseEntity<?> addItem(@RequestBody CartItemDTO cartItemDTO) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    return Response.of(() -> cartService.addItem(currentUser, cartItemDTO));
  }

  @DeleteMapping("/{cartId}/{itemId}")
  public ResponseEntity<?> deleteItem(@RequestParam String cartId, @RequestParam Long itemId) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    cartService.deleteItem(currentUser, cartId, itemId);
    return Response.ok();
  }

}
