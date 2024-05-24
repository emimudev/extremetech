package com.kg.extremetech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.LoginRequestDTO;
import com.kg.extremetech.dtos.SignupRequestDTO;
import com.kg.extremetech.dtos.UserDTO;
import com.kg.extremetech.entitites.Role;
import com.kg.extremetech.entitites.RoleType;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.repositories.RoleRepository;
import com.kg.extremetech.repositories.UserRepository;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private AuthenticationManager authenticationManager;

  public User signup(SignupRequestDTO input) {
    Optional<Role> optionalRole = roleRepository.findByType(RoleType.CLIENT);

    if (optionalRole.isEmpty()) {
      return null;
    }

    var user = User.builder()
      .email(input.email)
      .password(passwordEncoder.encode(input.password))
      .role(optionalRole.get())
      .name(input.name)
      .lastname(input.lastname)
      .fullName(input.name + " " + input.lastname)
      .build();

    return userRepository.save(user);
  }

  public User authenticate(LoginRequestDTO input) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              input.getEmail(),
              input.getPassword()));
    } catch (AuthenticationException e) {
      throw new UsernameNotFoundException("User not found", e);
    }
    return userRepository.findByEmail(input.getEmail()).orElseThrow();
  }

}