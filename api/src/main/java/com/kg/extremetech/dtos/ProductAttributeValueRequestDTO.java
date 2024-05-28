package com.kg.extremetech.dtos;

import com.kg.extremetech.entitites.Attribute;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeValueRequestDTO {
  private String value;
  private Attribute attribute;
}
