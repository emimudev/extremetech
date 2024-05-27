package com.kg.extremetech.controllers;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kg.extremetech.dtos.JwtResponseDTO;
import com.kg.extremetech.dtos.LoginRequestDTO;
import com.kg.extremetech.dtos.LoginResponseDTO;
import com.kg.extremetech.dtos.RefreshTokenRequestDTO;
import com.kg.extremetech.dtos.SignupRequestDTO;
import com.kg.extremetech.dtos.UserDTO;
import com.kg.extremetech.entitites.RefreshToken;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.responses.Response;
import com.kg.extremetech.services.AuthService;
import com.kg.extremetech.services.CartService;
import com.kg.extremetech.services.JwtService;
import com.kg.extremetech.services.RefreshTokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthService authService;
  @Autowired
  private RefreshTokenService refreshTokenService;

  @Autowired
  private CartService cartService;

  @PostMapping("/signup")
  public ResponseEntity<?> signup(@RequestBody SignupRequestDTO registerUserDto) {
    final var result = authService.signup(registerUserDto);
    cartService.createCart(result);
    LoginRequestDTO loginUserDto = LoginRequestDTO.builder()
        .email(registerUserDto.getEmail())
        .password(registerUserDto.getPassword())
        .build();
    UserDTO userDTO = UserDTO.from(result);
    String jwtToken = jwtService.generateToken(UserDTO.toMap(userDTO), result);
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginUserDto.getEmail());
    return Response.of(() -> LoginResponseDTO
        .builder()
        .token(
            JwtResponseDTO.builder()
                .accessToken(jwtToken)
                .expiresIn(jwtService.getExpirationTime())
                .refreshToken(refreshToken.getToken())
                .build())
        .user(userDTO)
        .build());
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginUserDto) {
    User authenticatedUser = authService.authenticate(loginUserDto);
    UserDTO userDTO = UserDTO.from(authenticatedUser);
    String jwtToken = jwtService.generateToken(UserDTO.toMap(userDTO), authenticatedUser);
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginUserDto.getEmail());
    return Response.of(() -> LoginResponseDTO
        .builder()
        .token(
            JwtResponseDTO.builder()
                .accessToken(jwtToken)
                .expiresIn(jwtService.getExpirationTime())
                .refreshToken(refreshToken.getToken())
                .build())
        .user(userDTO)
        .build());
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
    return Response.of(() -> {
      final var refreshToken = refreshTokenService.findByToken(refreshTokenRequestDTO.getToken());
      if (refreshToken.isEmpty()) {
        throw new NoSuchElementException("Invalid refresh token");
      }
      // Verify if refresh token has expired (90 days)
      refreshTokenService.verifyExpiration(refreshToken.get());
      final var user = refreshToken.get().getUser();
      // Generate new access token
      final var accessToken = jwtService.generateToken(UserDTO.toMap(UserDTO.from(user)), user);
      // Generate new refresh token
      RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getEmail());
      // Invalidate old refresh token
      refreshTokenService.deleteByToken(refreshTokenRequestDTO.getToken());
      return JwtResponseDTO.builder()
          .accessToken(accessToken)
          .expiresIn(jwtService.getExpirationTime())
          .refreshToken(newRefreshToken.getToken())
          .build();
    });
  }
}
