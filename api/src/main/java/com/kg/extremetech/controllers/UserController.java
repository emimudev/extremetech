package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.UserDTO;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("api/v1/users")
public class UserController {
  
  @Autowired
  private UserService userService;

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
  public ResponseEntity<?> find(Integer page, Integer size) {
    return Response.of(page, size, userService::findAll);
  }

  @GetMapping("/me")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> me() {
    final var auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal(); 
    return Response.of(() -> UserDTO.from(currentUser));
  }

}
