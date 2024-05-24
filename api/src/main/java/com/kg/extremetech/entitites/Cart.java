package com.kg.extremetech.entitites;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @Builder.Default
  @OneToMany(mappedBy = "cart", orphanRemoval = true)
  private List<CartItem> items = new ArrayList<>();
  @OneToOne(optional = false)
  private User owner;
}
