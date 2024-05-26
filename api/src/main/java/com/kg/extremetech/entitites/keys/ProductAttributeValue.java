package com.kg.extremetech.entitites.keys;

import com.kg.extremetech.entitites.Attribute;
import com.kg.extremetech.entitites.Product;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @Entity
// @IdClass(ProductAttributeValueKey.class)
public class ProductAttributeValue {
  @Id
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
  private Product product;
  @Id
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
  private Attribute attribute;
  // @Id
  // @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  // private Brand brand;
  @Column(nullable = false)
  private String value;
}
