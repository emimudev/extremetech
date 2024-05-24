package com.kg.extremetech.bootstrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kg.extremetech.dtos.*;
import com.kg.extremetech.entitites.*;
import com.kg.extremetech.repositories.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Component
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private BrandRepository brandRepository;
  @Autowired
  private ProductRepository productRepository;

  @Override
  @Transactional
  public void onApplicationEvent(@NonNull ContextRefreshedEvent contextRefreshedEvent) {
    loadRoles();
    createSuperAdministrator();
    loadCategories();
    loadBrands();
    // loadProducts();
  }

  private void loadRoles() {
    RoleType[] roleTypes = new RoleType[] { RoleType.CLIENT, RoleType.ADMIN, RoleType.SUPER_ADMIN };
    Map<RoleType, String> roleDescriptionMap = Map.of(
        RoleType.CLIENT, "Default user client role",
        RoleType.ADMIN, "Administrator role",
        RoleType.SUPER_ADMIN, "Super Administrator role");

    Arrays.stream(roleTypes).forEach((roleType) -> {
      Optional<Role> optionalRole = roleRepository.findByType(roleType);
      optionalRole.ifPresentOrElse(System.out::println, () -> {
        Role roleToCreate = new Role();
        roleToCreate.setName(roleType.toString());
        roleToCreate.setType(roleType);
        roleToCreate.setDescription(roleDescriptionMap.get(roleType));
        roleRepository.save(roleToCreate);
      });
    });
  }

  private void createSuperAdministrator() {
    final var userDto = SignupRequestDTO.builder()
        .name("Super Admin")
        .lastname("Account")
        .email("super.admin@email.com")
        .password("123456")
        .build();

    Optional<Role> optionalRole = roleRepository.findByType(RoleType.SUPER_ADMIN);
    Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

    if (optionalRole.isEmpty() || optionalUser.isPresent()) {
      return;
    }
    var user = User.builder()
        .name(userDto.name)
        .lastname(userDto.lastname)
        .fullName(userDto.name + " " + userDto.lastname)
        .email(userDto.email)
        .password(passwordEncoder.encode(userDto.password))
        .role(optionalRole.get())
        .build();
    userRepository.save(user);
  }

  private void loadBrands() {
    List<Brand> defaultBrands = List.of(
        Brand.builder().name("Intel").build(),
        Brand.builder().name("AMD").build(),
        Brand.builder().name("Nvidia").build(),
        Brand.builder().name("Asus").build(),
        Brand.builder().name("Gigabyte").build(),
        Brand.builder().name("MSI").build(),
        Brand.builder().name("Corsair").build(),
        Brand.builder().name("Kingston").build(),
        Brand.builder().name("Samsung").build(),
        Brand.builder().name("Logitech").build(),
        Brand.builder().name("Razer").build(),
        Brand.builder().name("Acer").build(),
        Brand.builder().name("Dell").build(),
        Brand.builder().name("HP").build(),
        Brand.builder().name("Lenovo").build());

    defaultBrands.forEach((brand) -> {
      Optional<Brand> optionalBrand = brandRepository.findByName(brand.getName());
      optionalBrand.ifPresentOrElse(System.out::println, () -> {
        brandRepository.save(brand);
      });
    });

  }

  private void loadCategories() {
    // Si se desea obtener las categorias en el front, entonces se deberia agrupar
    // las categorías
    // en: Computers, Components, Peripherals.. etc
    List<Category> defaultCategories = List.of(
        Category.builder().code("laptop").name("Laptop")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("RAM").build(),
                    Attribute.builder().name("Processor").build(),
                    Attribute.builder().name("Graphic Card").build(),
                    Attribute.builder().name("Storage").build())))
            .build(),
        Category.builder().code("desktop").name("Desktop")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("RAM").build(),
                    Attribute.builder().name("Processor").build(),
                    Attribute.builder().name("Graphic Card").build(),
                    Attribute.builder().name("Storage").build())))
            .build(),
        Category.builder().code("cpu").name("Processor")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Socket").build(),
                    Attribute.builder().name("Processor").build())))
            .build(),
        Category.builder().code("gpu").name("Graphics Card")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Chipset").build(),
                    Attribute.builder().name("VRAM").build(),
                    Attribute.builder().name("GPU").build())))
            .build(),
        Category.builder().code("motherboard").name("Motherboard")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Socket").build(),
                    Attribute.builder().name("Chipset").build(),
                    Attribute.builder().name("Format").build())))
            .build(),
        Category.builder().code("ram").name("Memory")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Capacity").build(),
                    Attribute.builder().name("Type").build(),
                    Attribute.builder().name("Speed").build())))
            .build(),
        Category.builder().code("monitor").name("Monitor")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Size").build(),
                    Attribute.builder().name("Resolution").build(),
                    Attribute.builder().name("Panel Type").build(),
                    Attribute.builder().name("Refresh Rate").build(),
                    Attribute.builder().name("Response Time").build(),
                    Attribute.builder().name("Panel").build())))
            .build(),
        Category.builder().code("keyboard").name("Keyboard")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Type").build(),
                    Attribute.builder().name("Connection").build())))
            .build(),
        Category.builder().code("mouse").name("Mouse")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Connection").build())))
            .build(),
        Category.builder().code("headset").name("Headset")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Audio").build(),
                    Attribute.builder().name("Connection").build())))
            .build());

    defaultCategories.forEach((category) -> {
      Optional<Category> optionalCategory = categoryRepository.findByCode(category.getCode());
      optionalCategory.ifPresentOrElse(System.out::println, () -> {
        categoryRepository.save(category);
      });
    });
  }

  private void loadProducts() {
    final var categories = categoryRepository.findAll();
    final var brands = brandRepository.findAll();
    final List<Product> products = new ArrayList<>();
    System.out.println("Categories: " + categories.size());
    System.out.println("Brands: " + brands.size());
    categories.forEach((category) -> {
      brands.forEach(brand -> {
        for (var i = 1; i < 15; i++) {
          final var product = Product.builder()
              .name("Product " + category.getName() + " " + brand.getName() + " " + i)
              .description("Product description " + i)
              .price(1000.0 * i)
              .brand(Brand.builder().id(brand.getId()).build())
              .category(Category.builder().id(category.getId()).build())
              .offer(i == 14 ? Offer.builder().discount(30.0).build() : null)
              .images(List.of(
                  "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
              .stock(i * 10L)
              .isFeatured(new Random().nextBoolean())
              .build();
          products.add(product);
        }
      });
    });
    System.out.println("Products to save: " + products.size());
    productRepository.saveAll(products);
  }

}