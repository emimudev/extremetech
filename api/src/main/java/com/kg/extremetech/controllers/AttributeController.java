package com.kg.extremetech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.ProductAttributeValueDTO;
import com.kg.extremetech.dtos.ProductFiltersRequestDTO;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.AttributeService;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/attribute")
public class AttributeController {

  @Autowired
  private AttributeService attributeService;

  @PostMapping("/filters")
  public ResponseEntity<?> getMethodName(@RequestBody ProductFiltersRequestDTO AllFilters) {
    final var results = attributeService
        .getAttributesByFilter(AllFilters)
        .stream()
        .map(a -> ProductAttributeValueDTO.from(a));
    return Response.of(() -> {
      return results.collect(Collectors.groupingBy(
        (element) -> element.getAttribute().getName(),
        Collectors.mapping((element) -> element.getValue(), Collectors.toSet())
      ));
    });
  }

}
