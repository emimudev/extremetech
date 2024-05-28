package com.kg.extremetech.entitites;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  @UuidGenerator
  private String code;

  @Column(nullable = false, unique = true)
  private String name;

  private String description;

  @Column(nullable = false)
  private Double price;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "offer_id")
  private Offer offer;

  @ManyToOne(optional = false)
  private Brand brand;
  
  @ManyToOne(optional = false )
  private Category category;

  @Column(nullable = false)
  @Builder.Default
  private Boolean isOnSale = true;

  @Column(nullable = false)
  @Builder.Default
  private Long stock = 1L;

  @ElementCollection()
  @CollectionTable(name = "product_image")
  @Column(name = "image", length = 1000)
  @Builder.Default
  private List<String> images = List.of();

  @CreationTimestamp
  private Date createdAt;

  @UpdateTimestamp
  private Date updatedAt;

  @Builder.Default
  private Boolean isFeatured = false;

  @ElementCollection()
  @CollectionTable(name = "product_feature")
  @MapKeyColumn(name = "feature_key")
  @Column(name = "value")
  @Builder.Default
  private Map<String, String> features = new HashMap<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.PERSIST)
  private List<AttributeValue> attributes;

  @PrePersist
  public void linkBidirectional() {
    attributes.forEach(attribute -> attribute.setProduct(this));
  }

}
