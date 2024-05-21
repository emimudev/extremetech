package com.kg.extremetech.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SignupRequestDTO {
  public String email;
  public String password;
  public String name;
  public String lastname;
}