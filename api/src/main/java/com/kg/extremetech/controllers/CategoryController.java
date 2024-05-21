package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @GetMapping("/all")
  public ResponseEntity<?> findAll() {
    System.out.println("------------------------------------------------------------------");
    return Response.of(categoryService::findAll);
  }

  @GetMapping
  public ResponseEntity<?> find(Integer page, Integer size) {
    return Response.of(page, size, categoryService::find);
  }

  @GetMapping("/{categoryId}")
  public ResponseEntity<?> findById(@PathVariable String categoryId) {
    return Response.of(() -> categoryService.findById(categoryId));
  }

  @GetMapping("/name/{categoryName}")
  public ResponseEntity<?> findByName(@PathVariable String categoryName) {
    return Response.of(() -> categoryService.findByName(categoryName));
  }

  @GetMapping("/code/{categoryCode}")
  public ResponseEntity<?> findCode(@PathVariable String categoryCode) {
    return Response.of(() -> categoryService.findByCode(categoryCode));
  }

}
