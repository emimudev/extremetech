package com.kg.extremetech.dtos;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kg.extremetech.entitites.Role;
import com.kg.extremetech.entitites.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
  private String id;
  private String name;
  private String lastname;
  private String fullName;
  private String email;
  private Date createdAt;
  private Role role;
  private boolean isEnabled;
  private boolean isLocked;

  public static UserDTO from(User user) {
    return UserDTO.builder()
        .id(user.getId())
        .name(user.getName())
        .lastname(user.getLastname())
        .fullName(user.getFullName())
        .email(user.getEmail())
        .createdAt(user.getCreatedAt())
        .role(user.getRole())
        .isEnabled(user.isEnabled())
        .isLocked(user.isLocked())
        .build();
  }

  public static Map<String, Object> toMap(UserDTO user) {
    final var mapper = new ObjectMapper();
    return mapper.convertValue(user, new TypeReference<Map<String, Object>>() {
    });
  }

}
