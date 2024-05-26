package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Product;

@Repository
public interface ProductRepository extends IRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  @NonNull
  // @EntityGraph(attributePaths = { "category", "brand", "attributes", "features", "offer" })
  public Page<Product> findAll(@NonNull Pageable pageable);

  @NonNull
  // @EntityGraph(attributePaths = { "category", "brand", "attributes", "features", "offer" })
  public Optional<Product> findById(@NonNull Long id);

  @NonNull
  // @EntityGraph(attributePaths = { "category", "brand", "attributes", "features", "offer" })
  public Optional<Product> findByCode(@NonNull String code);

  @Query("SELECT p FROM Product p WHERE p.name LIKE %:name%")
  // @EntityGraph(attributePaths = { "category", "brand", "attributes", "features", "offer" })
  public Page<Product> findByName(String name, Pageable pageable);

  @NonNull
  public Page<Product> findByIsFeaturedTrue(Pageable pageable);

  @NonNull
  public Page<Product> findByCategoryCode(String categoryCode, Pageable pageable);

  // query all products that has a discount offer and sort them by discount value
  @Query("SELECT p FROM Product p WHERE p.offer.discount IS NOT NULL ORDER BY p.offer.discount DESC")
  public Page<Product> findByOfferDiscount(Pageable pageable);

  @NonNull
  // @EntityGraph(attributePaths = { "category", "brand", "attributes", "features", "offer" })
  public Optional<Product> removeByCode(@NonNull String code);

  

}
