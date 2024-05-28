package com.kg.extremetech.dtos;

import java.util.List;

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
public class ShoppingOrderRequestDTO {
  private List<ShoppingOrderItemRequestDTO> items;
  private ShoppingOrderInfoDTO orderInfo;
}
