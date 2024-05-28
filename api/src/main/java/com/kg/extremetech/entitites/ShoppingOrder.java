package com.kg.extremetech.entitites;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingOrder {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @CreationTimestamp
  @Column(updatable = false)
  private Date orderedDate;

  @UpdateTimestamp
  @Column(nullable = false)
  private Date updatedDate;

  @ManyToOne
  private User customer;

  @OneToMany(mappedBy = "order", orphanRemoval = true, cascade = CascadeType.ALL)
  private List<ShoppingOrderItem> items;

  @Column(nullable = false)
  private Double totalAmount;

  @Column(nullable = false)
  @Builder.Default
  private ShoppingOrderStatus status = ShoppingOrderStatus.PENDING;

  @ManyToOne(cascade = CascadeType.ALL)
  private ShoppingOrderInfo orderInfo;

  @PrePersist
  public void linkBidirectional() {
    items.forEach(item -> item.setOrder(this));
  }

}
