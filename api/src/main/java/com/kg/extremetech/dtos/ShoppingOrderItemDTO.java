package com.kg.extremetech.dtos;

import java.util.Date;

import com.kg.extremetech.entitites.ShoppingOrderItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class ShoppingOrderItemDTO {
  private Long id;
  private ProductResponseDTO product;
  @Builder.Default
  private Integer quantity = 1;
  private Date addedAt;

  public static ShoppingOrderItemDTO from(ShoppingOrderItem item) {
    return ShoppingOrderItemDTO.builder()
        .id(item.getId())
        .product(ProductResponseDTO.from(item.getProduct()))
        .quantity(item.getQuantity())
        .addedAt(item.getAddedAt())
        .build();
  }

}
