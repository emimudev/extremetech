package com.kg.extremetech.dtos;

import java.util.Date;

import com.kg.extremetech.entitites.CartItem;
import com.kg.extremetech.entitites.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
  private Long id;
  private ProductResponseDTO product;
  private Integer quantity;
  private Date addedAt;
  public static CartItemDTO from(CartItem cartItem) {
    return CartItemDTO.builder()
      .id(cartItem.getId())
      .product(ProductResponseDTO.from(cartItem.getProduct()))
      .quantity(cartItem.getQuantity())
      .addedAt(cartItem.getAddedAt())
      .build();
  }
}
