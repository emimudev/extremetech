package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.BrandService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandController {

  @Autowired
  private BrandService brandService;

  @GetMapping("/all")
  public ResponseEntity<?> findAll() {
    return Response.of(brandService::findAll);
  }

  @GetMapping
  public ResponseEntity<?> find(Integer page, Integer size) {
    return Response.of(page, size, brandService::find);
  }

  @GetMapping("/{brandId}")
  public ResponseEntity<?> findById(@PathVariable String brandId) {
    return Response.of(() -> brandService.findById(brandId));
  }

  @GetMapping("/byName/{brandName}")
  public ResponseEntity<?> findByName(@PathVariable String brandName) {
    return Response.of(() -> brandService.findByName(brandName));
  }

}
