package com.kg.extremetech.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.kg.extremetech.entitites.RefreshToken;

@Repository
public interface RefreshTokenRepository extends IRepository<RefreshToken, String> {
  public Optional<RefreshToken> findByToken(String token);
  public void deleteByToken(String token);
}
