package com.kg.extremetech.dtos;

import java.util.Date;

import com.kg.extremetech.entitites.Offer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OfferResponseDTO {
  private Long id;
  private Double discount;
  private Date expiresAt;
  private String name;

  public static OfferResponseDTO from(Offer offer) {
    if(offer == null) {
      return null;
    }
    return OfferResponseDTO.builder()
        .id(offer.getId())
        .discount(offer.getDiscount())
        .expiresAt(offer.getExpiresAt())
        .name(offer.getName())
        .build();
  }
}
