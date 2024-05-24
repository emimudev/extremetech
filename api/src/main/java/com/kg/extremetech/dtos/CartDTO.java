package com.kg.extremetech.dtos;

import java.util.List;
import java.util.stream.Collectors;

import com.kg.extremetech.entitites.Cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDTO {
  private String id;
  private UserDTO owner;
  private List<CartItemDTO> items;

  public static CartDTO from(Cart cart) {
    return CartDTO.builder()
      .id(cart.getId())
      .owner(UserDTO.from(cart.getOwner()))
      .items(cart.getItems().stream().map(CartItemDTO::from).collect(Collectors.toList()))
      .build();
  }

}
