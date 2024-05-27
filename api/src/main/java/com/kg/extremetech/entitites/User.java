package com.kg.extremetech.entitites;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "user")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @Column(nullable = false, length = 500)
  private String name;
  @Column(nullable = false, length = 500)
  private String lastname;
  @Column(nullable = false, length = 500)
  private String fullName;
  @Column(unique = true, nullable = false)
  @Email
  private String email;
  @JsonIgnore
  private String password;
  @CreationTimestamp
  private Date createdAt;
  @ManyToOne()
  @JoinColumn(name = "role_id")
  private Role role;
  @Builder.Default
  private boolean isEnabled = true;
  @Builder.Default
  private boolean isLocked = false;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().toString());

    return List.of(authority);
  }

  @Override
  public String getUsername() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public boolean isAccountNonExpired() {
    return isEnabled;
  }

  public boolean isAccountNonLocked() {
    return !isLocked;
  }

  public boolean isCredentialsNonExpired() {
    return true;
  }

  public boolean isEnabled() {
    return isEnabled;
  }

}
