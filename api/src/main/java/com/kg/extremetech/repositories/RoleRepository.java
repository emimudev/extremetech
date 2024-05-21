package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.Role;
import com.kg.extremetech.entitites.RoleType;

@Repository
public interface RoleRepository extends IRepository<Role, String>  {

  public Optional<Role> findByType(RoleType roleType);

}
