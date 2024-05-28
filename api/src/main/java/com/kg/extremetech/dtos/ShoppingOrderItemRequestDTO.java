package com.kg.extremetech.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingOrderItemRequestDTO {
  private ProductResponseDTO product;
  @Builder.Default
  private Integer quantity = 1;
}
