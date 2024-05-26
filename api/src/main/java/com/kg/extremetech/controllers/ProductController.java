package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.KeyValuePair;
import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.dtos.ProductResponseDTO;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.ProductService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  public ResponseEntity<?> find(Integer page, Integer size) {
    return Response.of(page, size, (pageRequest) -> productService.find(pageRequest));
  }

  @GetMapping("/{productCode}")
  public ResponseEntity<?> findById(@PathVariable String productCode) {
    return Response.of(() -> productService.findByCode(productCode));
  }

  @GetMapping("/name/{productName}")
  public ResponseEntity<?> findByName(@PathVariable String productName, Integer page, Integer size) {
    return Response.of(page, size, (pageRequest) -> productService.findByName(productName, pageRequest));
  }

  @GetMapping("/featured")
  public ResponseEntity<?> findFeatured(Integer page, Integer size) {
    return Response.of(page, size, (pageRequest) -> productService
        .findByIsFeatured(pageRequest)
        .map(p -> ProductResponseDTO.from(p)));
  }

  @GetMapping("/offers")
  public ResponseEntity<?> findByOffers(Integer page, Integer size) {
    return Response.of(page, size, (pageRequest) -> productService
        .findByDiscount(pageRequest)
        .map(p -> ProductResponseDTO.from(p)));
  }

  @GetMapping("/category/{categoryCode}")
  public ResponseEntity<?> findByCategoryCode(@PathVariable String categoryCode, Integer page, Integer size) {
    return Response.of(page, size, (pageRequest) -> productService
        .findByCategoryCode(categoryCode, pageRequest)
        .map(p -> ProductResponseDTO.from(p)));
  }

  @PostMapping("/filter")
  public ResponseEntity<?> findByFilters(Integer page, Integer size, @RequestBody ProductFiltersRequestDTO filters) {
    return Response.of(page, size, (pageRequest) -> productService
        .findByFilters(filters, pageRequest)
        .map(p -> ProductResponseDTO.from(p)));
  }

  @DeleteMapping("/{productCode}")
  public ResponseEntity<?> deleteById(@PathVariable String productCode) {
    return Response.of(() -> productService.removeByCode(productCode));
  }

}
