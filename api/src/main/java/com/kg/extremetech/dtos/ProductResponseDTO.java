package com.kg.extremetech.dtos;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.kg.extremetech.entitites.Brand;
import com.kg.extremetech.entitites.Category;
import com.kg.extremetech.entitites.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {
  private Long id;
  private String code;
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
  private Date createdAt;
  private Date updatedAt;
  @Builder.Default
  private Boolean isFeatured = false;
  @Builder.Default
  private Map<String, String> features = new HashMap<>();
  private List<ProductAttributeValueDTO> attributes;

  public static ProductResponseDTO from(Product product) {
    if (product == null) {
      return null;
    }
    return ProductResponseDTO.builder()
        .id(product.getId())
        .code(product.getCode())
        .name(product.getName())
        .description(product.getDescription())
        .price(product.getPrice())
        .offer(OfferResponseDTO.from(product.getOffer()))
        .brand(product.getBrand())
        .category(product.getCategory())
        .isOnSale(product.getIsOnSale())
        .stock(product.getStock())
        .images(product.getImages())
        .createdAt(product.getCreatedAt())
        .updatedAt(product.getUpdatedAt())
        .isFeatured(product.getIsFeatured())
        .features(product.getFeatures())
        .attributes(
            product.getAttributes() != null
                ? product.getAttributes().stream().map(ProductAttributeValueDTO::from).collect(Collectors.toList())
                : List.of())
        .build();
  }
}
