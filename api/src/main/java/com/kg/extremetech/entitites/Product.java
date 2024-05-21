package com.kg.extremetech.entitites;

import java.util.List;
import java.util.Set;

import com.kg.extremetech.entitites.keys.ProductAttributeValue;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  // @Column(nullable = false, updatable = false)
  private String id;
  @Column(nullable = false)
  private String name;
  private String description;
  @Column(nullable = false)
  private Double price;
  // @OneToMany()
  // @JoinTable(
  //   name = "product_attribute",
  //   joinColumns = @JoinColumn(name = "product_id"),
  //   inverseJoinColumns = @JoinColumn(name = "attribute_id")
  // )
  @ManyToOne(optional = false)
  private Brand brand;
  @ManyToOne(optional = false)
  private Category category;
  @Column(nullable = false)
  @Builder.Default
  private Long stock = 1L;
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private Set<ProductAttributeValue> attributes;
}
