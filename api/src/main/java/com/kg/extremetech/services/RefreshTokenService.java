package com.kg.extremetech.services;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kg.extremetech.entitites.RefreshToken;
import com.kg.extremetech.exceptions.RefreshTokenException;
import com.kg.extremetech.repositories.RefreshTokenRepository;
import com.kg.extremetech.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RefreshTokenService extends AbstractService<RefreshToken, String, RefreshTokenRepository> {
  @Autowired
  private UserRepository userRepository;

  public RefreshToken createRefreshToken(String username) {
    RefreshToken refreshToken = RefreshToken.builder()
        .user(userRepository.findByEmail(username).get())
        .token(UUID.randomUUID().toString())
        .expiryDate(Instant.now().plusMillis(7776000000L)) // 90 days
        .build();
    return repository.save(refreshToken);
  }

  public Optional<RefreshToken> findByToken(String token) {
    return repository.findByToken(token);
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      repository.delete(token);
      throw new RefreshTokenException(token.getToken() + " Refresh token has expired");
    }
    return token;
  }

  public void deleteByToken(String token) {
    repository.deleteByToken(token);
  }

}
