package com.kg.extremetech.entitites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShoppingOrderInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String cardNumber;

  @Column(nullable = false)
  private String cardHolderName;

  @Column(nullable = false)
  private String cvv;

  @Column(nullable = false)
  private String expiryDate;

  @Column(nullable = false)
  private String address;

  @Builder.Default
  private String country = "Costa Rica";

  @Column(nullable = false)
  private String city;

  @Column(nullable = false)
  private String province;

  @Column(nullable = false)
  private String zipCode;
  
}
