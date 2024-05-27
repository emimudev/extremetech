package com.kg.extremetech.dtos;

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
public class CartItemRequestDTO {
  private Product product;
  private Integer quantity;
}