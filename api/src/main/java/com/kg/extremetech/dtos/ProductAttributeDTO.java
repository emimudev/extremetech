package com.kg.extremetech.dtos;

import com.kg.extremetech.entitites.Attribute;
import com.kg.extremetech.entitites.keys.ProductAttributeValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttributeDTO {
  private Attribute attribute;
  private String value;

  public static ProductAttributeDTO from(ProductAttributeValue productAttributeValue) {
    return ProductAttributeDTO.builder()
        .attribute(productAttributeValue.getAttribute())
        .value(productAttributeValue.getValue())
        .build();
  }
}
