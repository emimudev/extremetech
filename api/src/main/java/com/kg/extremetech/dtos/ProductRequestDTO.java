package com.kg.extremetech.dtos;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.kg.extremetech.entitites.Brand;
import com.kg.extremetech.entitites.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {
  private String name;
  private String description;
  private Double price;
  private OfferResponseDTO offer;
  private Brand brand;
  private Category category;
  @Builder.Default
  private Boolean isOnSale = true;
  @Builder.Default
  private Long stock = 1L;
  @Builder.Default
  private List<String> images = List.of();
  @Builder.Default
  private Boolean isFeatured = false;
  @Builder.Default
  private Map<String, String> features = new HashMap<>();
  private List<ProductAttributeValueDTO> attributes;
}
