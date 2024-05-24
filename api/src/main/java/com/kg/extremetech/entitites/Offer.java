package com.kg.extremetech.entitites;

import java.util.Date;
import java.util.List;

import org.hibernate.id.factory.spi.GenerationTypeStrategy;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Offer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Double discount;
  private Date expiresAt;
  private String name;
  // @OneToMany(mappedBy = "offer")
  // private List<Product> products;
}
