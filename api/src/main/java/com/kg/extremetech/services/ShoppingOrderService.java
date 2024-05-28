package com.kg.extremetech.services;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.dtos.ShoppingOrderRequestDTO;
import com.kg.extremetech.entitites.Product;
import com.kg.extremetech.entitites.ShoppingOrder;
import com.kg.extremetech.entitites.ShoppingOrderInfo;
import com.kg.extremetech.entitites.ShoppingOrderItem;
import com.kg.extremetech.entitites.ShoppingOrderStatus;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.repositories.ShoppingOrderRepository;

@Service
@Transactional
public class ShoppingOrderService extends BaseServiceImp<ShoppingOrder, Long, ShoppingOrderRepository> {

  @Autowired
  private CartService cartService;

  public Page<ShoppingOrder> findByCustomerId(String customerId, Pageable pageable) {
    return repository.findByCustomerId(customerId, pageable);
  }

  public Page<ShoppingOrder> findByCustomerEmail(String customerEmail, Pageable pageable) {
    return repository.findByCustomerEmail(customerEmail, pageable);
  }

  public ShoppingOrder addOrder(User customer, ShoppingOrderRequestDTO requestDTO) {
    final var totalAmount = requestDTO.getItems().stream()
        .map((item) -> {
          final var product = item.getProduct();
          final var offer = product.getOffer();
          if (offer != null && offer.getDiscount() > 0) {
            return product.getPrice() * item.getQuantity() * (1 - offer.getDiscount() / 100);
          } else {
            return product.getPrice() * item.getQuantity();
          }
        })
        .reduce(0.0, Double::sum);
    final var order = ShoppingOrder.builder()
        .customer(customer)
        .items(
            requestDTO.getItems().stream()
                .map(item -> ShoppingOrderItem.builder()
                    .product(
                        Product.builder()
                            .id(item.getProduct().getId())
                            .build())
                    .quantity(item.getQuantity())
                    .build())
                .collect(Collectors.toList()))
        .totalAmount(totalAmount)
        .status(ShoppingOrderStatus.PENDING)
        .orderInfo(
            ShoppingOrderInfo.builder()
                .email(requestDTO.getOrderInfo().getEmail())
                .cardNumber(requestDTO.getOrderInfo().getCardNumber())
                .cardHolderName(requestDTO.getOrderInfo().getCardHolderName())
                .cvv(requestDTO.getOrderInfo().getCvv())
                .expiryDate(requestDTO.getOrderInfo().getExpiryDate())
                .address(requestDTO.getOrderInfo().getAddress())
                .country(requestDTO.getOrderInfo().getCountry())
                .city(requestDTO.getOrderInfo().getCity())
                .province(requestDTO.getOrderInfo().getProvince())
                .zipCode(requestDTO.getOrderInfo().getZipCode())
                .build())
        .build();

    final var savedOrder = repository.save(order);
    cartService.clean(customer);
    return repository.findById(savedOrder.getId()).orElseThrow();
  }

  public ShoppingOrder updateOrderStatus(Long orderId, ShoppingOrderStatus status) {
    final var order = repository.findById(orderId)
        .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    order.setStatus(status);
    return repository.save(order);
  }

}
