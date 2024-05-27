package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.ProductResponseDTO;
import com.kg.extremetech.dtos.WishListResponseDTO;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.WishListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/v1/wishlist")
public class WishListController {
  @Autowired
  private WishListService wishListService;

  @GetMapping
  public ResponseEntity<?> findById() {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    System.out.println(currentUser);
    return Response.of(() -> WishListResponseDTO.from(wishListService.findByOwnerId(currentUser.getId())));
  }

  @GetMapping("/{wishListId}")
  public ResponseEntity<?> findById(@PathVariable String wishListId) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    System.out.println(currentUser);
    return Response.of(() -> WishListResponseDTO.from(wishListService.findById(wishListId)));
  }

  @PostMapping("/add/item")
  public ResponseEntity<?> clean(@RequestBody ProductResponseDTO productDTO) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    return Response.of(() -> wishListService.addItem(currentUser, productDTO));
  }

  // Lo mejor sería enviar un item y recibir el carrito completo actualizado
  @PostMapping("/remove/item")
  public ResponseEntity<?> addItem(@RequestBody ProductResponseDTO productDTO) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    return Response.of(() -> wishListService.removeItem(currentUser, productDTO));
  }

}
