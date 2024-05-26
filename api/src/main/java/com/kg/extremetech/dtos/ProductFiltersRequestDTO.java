package com.kg.extremetech.dtos;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductFiltersRequestDTO {
  private String categoryCode;
  @Builder.Default
  private Set<String> brands = Set.of();
  @Builder.Default
  private List<KeyValuePairList> filters = List.of(); 
}
