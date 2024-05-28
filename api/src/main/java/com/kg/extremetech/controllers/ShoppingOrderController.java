package com.kg.extremetech.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.ShoppingOrderDTO;
import com.kg.extremetech.dtos.ShoppingOrderRequestDTO;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.ShoppingOrderService;

@RestController
@RequestMapping("/api/v1/shopping-order")
public class ShoppingOrderController {

  @Autowired
  private ShoppingOrderService orderService;

  @GetMapping
  public ResponseEntity<?> findByOwner(Integer page, Integer size) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    System.out.println(currentUser);
    return Response.of(page, size, (pageRequest) -> orderService
        .findByCustomerId(currentUser.getId(), pageRequest)
        .map(ShoppingOrderDTO::from));
  }

  @PostMapping
  public ResponseEntity<?> addOrder(@RequestBody ShoppingOrderRequestDTO orderDTO) {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    return Response.of(() -> {
      return ShoppingOrderDTO.from(orderService.addOrder(currentUser, orderDTO));
    });
  }

}
