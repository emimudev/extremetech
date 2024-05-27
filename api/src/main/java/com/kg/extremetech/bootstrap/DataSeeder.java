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
import com.kg.extremetech.services.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

  @Autowired
  private UserService userService;

  @Override
  @Transactional
  public void onApplicationEvent(@NonNull ContextRefreshedEvent contextRefreshedEvent) {
    loadRoles();
    loadDefaultUsers();
    createSuperAdministrator();
    loadCategories();
    loadBrands();
    loadProducts();
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
    userService.createUser(user);
  }

  private void loadDefaultUsers() {
    final var optionalUser = userRepository.findByEmail("emilianomurillo@gmail.com");
    if (optionalUser.isPresent()) {
      return;
    }
    final var user = User.builder()
        .name("Emiliano")
        .lastname("Murillo")
        .fullName("Emiliano Murillo")
        .email("emilianomurillo@gmail.com")
        .password(passwordEncoder.encode("123456"))
        .role(roleRepository.findByType(RoleType.CLIENT).get())
        .build();
    userService.createUser(user);
  }

  private void loadBrands() {
    List<Brand> defaultBrands = List.of(
        Brand.builder().id(1L).name("Intel").build(),
        Brand.builder().id(2L).name("AMD").build(),
        Brand.builder().id(3L).name("Nvidia").build(),
        Brand.builder().id(5L).name("Asus").build(),
        Brand.builder().id(6L).name("Gigabyte").build(),
        Brand.builder().id(7L).name("MSI").build(),
        Brand.builder().id(8L).name("Corsair").build(),
        Brand.builder().id(9L).name("Kingston").build(),
        Brand.builder().id(10L).name("Samsung").build(),
        Brand.builder().id(11L).name("Logitech").build(),
        Brand.builder().id(12L).name("Razer").build(),
        Brand.builder().id(13L).name("Acer").build(),
        Brand.builder().id(14L).name("Dell").build(),
        Brand.builder().id(15L).name("HP").build(),
        Brand.builder().id(16L).name("Lenovo").build());

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
        Category.builder().id(1L).code("laptop").name("Laptop")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("RAM").build(),
                    Attribute.builder().name("Processor").build(),
                    Attribute.builder().name("Graphic Card").build(),
                    Attribute.builder().name("Storage").build())))
            .build(),
        Category.builder().id(2L).code("desktop").name("Desktop")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("RAM").build(),
                    Attribute.builder().name("Processor").build(),
                    Attribute.builder().name("Graphic Card").build(),
                    Attribute.builder().name("Storage").build())))
            .build(),
        Category.builder().id(3L).code("cpu").name("Processor")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Brand").build(),
                    Attribute.builder().name("Socket").build(),
                    Attribute.builder().name("Processor").build())))
            .build(),
        Category.builder().id(4L).code("gpu").name("Graphics Card")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Chipset").build(),
                    Attribute.builder().name("VRAM").build(),
                    Attribute.builder().name("GPU").build())))
            .build(),
        Category.builder().id(5L).code("motherboard").name("Motherboard")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Socket").build(),
                    Attribute.builder().name("Chipset").build(),
                    Attribute.builder().name("Format").build())))
            .build(),
        Category.builder().id(6L).code("ram").name("Memory")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Capacity").build(),
                    Attribute.builder().name("Type").build(),
                    Attribute.builder().name("Speed").build())))
            .build(),
        Category.builder().id(7L).code("monitor").name("Monitor")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Size").build(),
                    Attribute.builder().name("Resolution").build(),
                    Attribute.builder().name("Panel Type").build(),
                    Attribute.builder().name("Refresh Rate").build(),
                    Attribute.builder().name("Response Time").build(),
                    Attribute.builder().name("Panel").build())))
            .build(),
        Category.builder().id(8L).code("keyboard").name("Keyboard")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Type").build(),
                    Attribute.builder().name("Connection").build())))
            .build(),
        Category.builder().id(9L).code("mouse").name("Mouse")
            .attributes(new HashSet<>(
                List.of(
                    Attribute.builder().name("Connection").build())))
            .build(),
        Category.builder().id(10L).code("headset").name("Headset")
            .attributes(new HashSet<>(
                List.of(
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

  private Attribute getAttribute(Category category, String attributeName) {
    return category.getAttributes().stream().filter(c -> c.getName().equals(attributeName)).findFirst().orElse(null);
  }

  private AttributeValue createAttributeValue(Attribute attribute, String value) {
    return AttributeValue.builder().attribute(attribute).value(value).build();
  }

  // private Brand getBrand(List<Brand> gr)

  private void loadProducts() {
    final var categories = categoryRepository.findAll();
    final var brands = brandRepository.findAll();
    final var productsSaved = productRepository.findAll();
    if (!productsSaved.isEmpty()) {
      return;
    }
    final List<Product> products = new ArrayList<>();
    System.out.println("Categories: " + categories.size());
    System.out.println("Brands: " + brands.size());
    categories.forEach((category) -> {
      if (category.getCode().equals("laptop")) { // 1
        products.addAll(List.of(
            Product.builder()
                .name("Laptop Asus ROG Strix G15")
                .description("Laptop Asus ROG Strix G15 G512LV-HN222T")
                .price(2000.0)
                .brand(Brand.builder().id(5L).build())
                .category(Category.builder().id(1L).build())
                .offer(Offer.builder().discount(10.0).build())
                .attributes(
                    List.of(
                        // createAttributeValue(getAttribute(category, "Brand"), "Asus"),
                        createAttributeValue(getAttribute(category, "RAM"), "4GB DDR4"),
                        createAttributeValue(getAttribute(category, "Processor"), "Intel Core i5-10300H"),
                        createAttributeValue(getAttribute(category, "Graphic Card"), "Nvidia GTX 1650 Ti"),
                        createAttributeValue(getAttribute(category, "Storage"), "512GB SSD")))
                .images(List.of(
                    "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
                .stock(10L)
                .isFeatured(true)
                .build(),
            Product.builder()
                .name("Laptop Asus ROG Zephyrus G14")
                .description("Laptop Asus ROG Zephyrus G14 GA401IV-HE247T")
                .price(2500.0)
                .brand(Brand.builder().id(5L).build())
                .category(Category.builder().id(1L).build())
                .offer(Offer.builder().discount(15.0).build())
                .attributes(
                    List.of(
                        // createAttributeValue(getAttribute(category, "Brand"), "Asus"),
                        createAttributeValue(getAttribute(category, "RAM"), "16GB DDR4"),
                        createAttributeValue(getAttribute(category, "Processor"), "AMD Ryzen 9 4900HS"),
                        createAttributeValue(getAttribute(category, "Graphic Card"), "Nvidia RTX 2060 Max-Q"),
                        createAttributeValue(getAttribute(category, "Storage"), "1TB SSD")))
                .images(List.of(
                    "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
                .stock(5L)
                .isFeatured(true)
                .build(),
            Product.builder()
                .name("Laptop MSI GF63 Thin")
                .description("Laptop MSI GF63 Thin 9SCSR-1069XES")
                .price(1500.0)
                .brand(Brand.builder().id(7L).build())
                .category(Category.builder().id(1L).build())
                .offer(Offer.builder().discount(5.0).build())
                .attributes(
                    List.of(
                        // createAttributeValue(getAttribute(category, "Brand"), "MSI"),
                        createAttributeValue(getAttribute(category, "RAM"), "8GB DDR4"),
                        createAttributeValue(getAttribute(category, "Processor"), "Intel Core i7-9750H"),
                        createAttributeValue(getAttribute(category, "Graphic Card"), "Nvidia GTX 1650 Max-Q"),
                        createAttributeValue(getAttribute(category, "Storage"), "512GB SSD")))
                .images(List.of(
                    "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
                .stock(7L)
                .isFeatured(true)
                .build(),
            Product.builder()
                .name("Laptop Dell G3 15")
                .description("Laptop Dell G3 15 3500-D30P")
                .price(1800.0)
                .brand(Brand.builder().id(14L).build())
                .category(Category.builder().id(1L).build())
                .offer(Offer.builder().discount(7.0).build())
                .attributes(
                    List.of(
                        // createAttributeValue(getAttribute(category, "Brand"), "Dell"),
                        createAttributeValue(getAttribute(category, "RAM"), "16GB DDR4"),
                        createAttributeValue(getAttribute(category, "Processor"), "Intel Core i7-10750H"),
                        createAttributeValue(getAttribute(category, "Graphic Card"), "Nvidia GTX 1650 Ti"),
                        createAttributeValue(getAttribute(category, "Storage"), "512GB SSD")))
                .images(List.of(
                    "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
                .stock(3L)
                .isFeatured(true)
                .build(),
            Product.builder()
                .name("Laptop HP Pavilion Gaming")
                .description("Laptop HP Pavilion Gaming 15-ec1001ns")
                .price(1600.0)
                .brand(Brand.builder().id(15L).build())
                .category(Category.builder().id(1L).build())
                .offer(Offer.builder().discount(8.0).build())
                .attributes(
                    List.of(
                        // createAttributeValue(getAttribute(category, "Brand"), "HP"),
                        createAttributeValue(getAttribute(category, "RAM"), "8GB DDR4"),
                        createAttributeValue(getAttribute(category, "Processor"), "AMD Ryzen 5 4600H"),
                        createAttributeValue(getAttribute(category, "Graphic Card"), "Nvidia GTX 1650 Ti"),
                        createAttributeValue(getAttribute(category, "Storage"), "512GB SSD")))
                .images(List.of(
                    "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732"))
                .stock(6L)
                .isFeatured(true)
                .build()));
      }
    });
    productRepository.saveAll(products);
  }

}