package com.kg.extremetech.dtos;

import java.util.List;
import java.util.stream.Collectors;

import com.kg.extremetech.entitites.WishList;

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
public class WishListResponseDTO {
  private String id;
  private UserDTO owner;
  private List<ProductResponseDTO> items;
  @Builder.Default
  private Boolean isPublic = false;

  public static WishListResponseDTO from(WishList wishList) {
    return WishListResponseDTO.builder()
        .id(wishList.getId())
        .owner(UserDTO.from(wishList.getOwner()))
        .items(
            wishList.getItems().stream()
                .map(ProductResponseDTO::from)
                .collect(Collectors.toList()))
        .isPublic(wishList.getIsPublic())
        .build();
  }
}
