package com.kg.extremetech.dtos;

import com.kg.extremetech.entitites.ShoppingOrderInfo;

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
public class ShoppingOrderInfoDTO {
  private Long id;
  private String email;
  private String cardNumber;
  private String cardHolderName;
  private String cvv;
  private String expiryDate;
  private String address;
  @Builder.Default
  private String country = "Costa Rica";
  private String city;
  private String province;
  private String zipCode;

  public static ShoppingOrderInfoDTO from(ShoppingOrderInfo info) {
    return ShoppingOrderInfoDTO.builder()
        .id(info.getId())
        .email(info.getEmail())
        .cardNumber(info.getCardNumber())
        .cardHolderName(info.getCardHolderName())
        .cvv(info.getCvv())
        .expiryDate(info.getExpiryDate())
        .address(info.getAddress())
        .country(info.getCountry())
        .city(info.getCity())
        .province(info.getProvince())
        .zipCode(info.getZipCode())
        .build();
  }

}
