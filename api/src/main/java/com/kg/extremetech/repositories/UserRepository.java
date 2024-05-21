package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.User;

@Repository
public interface UserRepository extends IRepository<User, String>{
  
  public Optional<User> findByEmail(String email);

}
