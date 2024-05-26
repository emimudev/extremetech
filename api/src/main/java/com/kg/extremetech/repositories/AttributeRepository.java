package com.kg.extremetech.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.AttributeValue;

@Repository
public interface AttributeRepository extends IRepository<AttributeValue, Long>, JpaSpecificationExecutor<AttributeValue> {
  
}
