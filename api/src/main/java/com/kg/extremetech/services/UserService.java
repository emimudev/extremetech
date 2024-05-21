package com.kg.extremetech.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.UserDTO;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService extends AbstractService<User, String, UserRepository>{
  
  public Page<?> findAll(PageRequest pageRequest) {
    return repository.findAll(pageRequest).map(UserDTO::from);
  }

  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }

}
