package com.kg.extremetech.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.kg.extremetech.dtos.UserDTO;
import com.kg.extremetech.entitites.Cart;
import com.kg.extremetech.entitites.User;
import com.kg.extremetech.entitites.WishList;
import com.kg.extremetech.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService extends AbstractService<User, String, UserRepository>{

  @Autowired
  private CartService cartService;

  @Autowired
  private WishListService wishListService;
  
  public Page<?> findAll(PageRequest pageRequest) {
    return repository.findAll(pageRequest).map(UserDTO::from);
  }

  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }

  public User createUser(User user) {
    final var userCreated = repository.save(user);
    final var newCart = Cart.builder().owner(userCreated).build();
    final var newWishList = WishList.builder().owner(userCreated).build();
    cartService.save(newCart);
    wishListService.save(newWishList);
    return userCreated;
  }

}
