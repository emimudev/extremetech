package com.kg.extremetech.entitites.keys;

import java.io.Serializable;

import com.kg.extremetech.entitites.Attribute;
import com.kg.extremetech.entitites.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductAttributeValueKey implements Serializable {
  private Product product;
  private Attribute attribute;
  // private Brand brand;
}
