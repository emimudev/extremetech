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
                    "https://dlcdnwebimgs.asus.com/gain/7807824E-6860-4959-957C-20F0446D1E23/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/46FAAF9E-C641-4AB7-B0C8-795BD379C0CB/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8CF89A4E-2526-480F-9E1A-CB127EB7BCDD/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/C655BF17-2802-4875-9890-5CAD6E55C0B0/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/DF4D199B-2F45-44C2-A8C3-90A058212169/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/E1249409-7CB2-4F7A-8ADC-E58FADEB54DE/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/F8236ACA-F9A8-4AFD-AD71-43A695E9DC4C/w1000/h732"))
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
                    "https://dlcdnwebimgs.asus.com/gain/14C97F28-01B0-4F14-A533-DCA0050E444B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/8F7222CC-8AC1-4FEA-A91E-AC0019E785F9/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/155A3351-747D-4C06-955D-7F064EAED03B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/737200F1-7B2B-476D-A800-8B26E2142D40/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/DCEAFDB2-67D2-40F6-98BC-2D46C0CF8C2C/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/D71A2E67-58FA-4CC3-9636-3197E7EB1B16/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/4FC8E71B-C9DB-4F09-B316-D648A4FD56C4/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/5A0537B6-2E85-44E9-AA7B-7AAADB125854/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/E5DFD687-44D4-48EA-A88B-7360FE8C9CEF/w1000/h732"))
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
                    "https://dlcdnwebimgs.asus.com/gain/C7BA90AC-D74F-4C16-8443-3739E7772D9C/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/62C83C9D-F17B-4A37-9759-3D7B8D8315EE/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/9CF9E7BA-06D4-4854-894C-EA44CA65E07C/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/053623F2-FC61-446C-B01D-62B32481DE7F/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/31678C92-DF68-467A-8D12-E3C74C38E5A5/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/D4FD5834-F4EB-4E90-9D42-D65600924A7B/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/0CC4416D-A816-424D-83B4-874B7E2D92C6/w1000/h732",
                    "https://dlcdnwebimgs.asus.com/gain/4F343220-2F4D-4118-A5C7-AFB7BA6B83AF/w1000/h732"))
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
                  "https://dlcdnwebimgs.asus.com/gain/DC39AD12-74DD-4DA1-966E-F5A8315DC710/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/8093D1E5-7B92-4C11-B7BA-BDB41383ADE6/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/3D204694-18D6-4284-AC19-C64737518660/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/B2499962-1734-413D-A312-A988012AF7C2/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/D1CEC160-A0BD-4A78-8F06-AEEC06895EA8/w1000/h732",
                  "https://dlcdnwebimgs.asus.com/gain/F4A5B07B-B820-4DF7-AC53-0433671B3E9C/w1000/h732"))
                .stock(6L)
                .isFeatured(true)
                .build()));
      }
      // "RAM").build(),
      // Attribute.builder().name("Processor").build(),
      // Attribute.builder().name("Graphic Card").build(),
      // Attribute.builder().name("Storage"
      if (category.getCode().equals("desktop")) {
        Product.builder()
            .name("ROG Strix G16CHR")
            .description(
                "The ROG Strix G16CHR is designed for high performance gameplay, and looking good doing it. With a mesh front panel, a double D-ring handle, headset holder, and subtle RGB lighting accents, the G16CHR is a perfect blend of form and function.")
            .price(1499.99)
            .brand(Brand.builder().id(5L).build())
            .category(Category.builder().id(2L).build())
            .offer(Offer.builder().discount(30.0).build())
            .attributes(
                List.of(
                    // createAttributeValue(getAttribute(category, "Brand"), "HP"),
                    createAttributeValue(getAttribute(category, "RAM"), "16GB DDR5"),
                    createAttributeValue(getAttribute(category, "Processor"), "Intel Core i7-14700KF"),
                    createAttributeValue(getAttribute(category, "Graphic Card"), "NVIDIA GeForce RTX4080 16GB"),
                    createAttributeValue(getAttribute(category, "Storage"), "1TB SSD")))
            .images(List.of(
                "https://dlcdnwebimgs.asus.com/gain/FB384021-69AE-445F-8784-C4D2CA4DF9F3/w1000/h732",
                "https://dlcdnwebimgs.asus.com/gain/AE2CE1D3-FA92-4F11-840B-AE4170A6DC96/w1000/h732",
                "https://dlcdnwebimgs.asus.com/gain/48A51C6A-2C96-48AC-A543-594CA8BF3347/w1000/h732",
                "https://dlcdnwebimgs.asus.com/gain/F402AA2F-0F4C-4744-AD2E-D2506CA0A841/w1000/h732",
                "https://dlcdnwebimgs.asus.com/gain/449F329A-493E-424A-8510-9A9E6D526410/w1000/h732",
                "https://dlcdnwebimgs.asus.com/gain/5598323B-EA1F-4B8D-8956-4BDF7C694138/w1000/h732"))
            .stock(6L)
            .isFeatured(true)
            .build();
      }

    });
    productRepository.saveAll(products);
  }

}