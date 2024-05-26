package com.kg.extremetech.dtos;

import com.kg.extremetech.entitites.Attribute;
import com.kg.extremetech.entitites.AttributeValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeValueDTO {
  private Long id;
  private String value;
  private Attribute attribute;

  public static ProductAttributeValueDTO from(AttributeValue attributeValue) {
    if (attributeValue == null) {
      return null;
    }
    return ProductAttributeValueDTO.builder()
        .id(attributeValue.getId())
        .value(attributeValue.getValue())
        .attribute(attributeValue.getAttribute())
        .build();
  }

}
