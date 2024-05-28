package com.kg.extremetech.dtos;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.kg.extremetech.entitites.ShoppingOrder;
import com.kg.extremetech.entitites.ShoppingOrderStatus;

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
public class ShoppingOrderDTO {
  private Long id;
  private Date orderedDate;
  private Date updatedDate;
  private UserDTO customer;
  private List<ShoppingOrderItemDTO> items;
  private Double totalAmount;
  @Builder.Default
  private ShoppingOrderStatus status = ShoppingOrderStatus.PENDING;
  private ShoppingOrderInfoDTO orderInfo;

  public static ShoppingOrderDTO from(ShoppingOrder order) {
    return ShoppingOrderDTO.builder()
        .id(order.getId())
        .orderedDate(order.getOrderedDate())
        .updatedDate(order.getUpdatedDate())
        .customer(UserDTO.from(order.getCustomer()))
        .items(
            order.getItems().stream()
                .map(ShoppingOrderItemDTO::from)
                .collect(Collectors.toList()))
        .totalAmount(order.getTotalAmount())
        .status(order.getStatus())
        .orderInfo(ShoppingOrderInfoDTO.from(order.getOrderInfo()))
        .build();
  }

}
