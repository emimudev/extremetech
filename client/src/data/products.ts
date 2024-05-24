import { IProduct } from '@/types'

const DATA: Record<string, Partial<IProduct>[]> = {
  laptops: [
    {
      name: 'ROG Zephyrus G16 (2024) GU605',
      description:
        'The ROG Zephyrus G16 (2024) GU605 is a powerful gaming laptop that offers exceptional performance for your favorite games. Equipped with an AMD Ryzen 9 6900HX processor, 32 GB of DDR4 3200 memory, and an NVIDIA GeForce RTX 4080 graphics card, this laptop is perfect for gaming and multitasking. With a 16-inch screen and a resolution of 2560 x 1600, you can enjoy sharp images and vibrant colors. Additionally, it comes preinstalled with Windows 10 Pro so you can start gaming right away.',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/A182DF3B-87D5-4534-AF9C-05DDE005E007/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8DBA2F72-7907-48F2-A974-B5C41A05FF8B/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/FD41F737-BF20-45BF-963B-D1A530A8F974/w1000/h732'
      ],
      price: 1000000,
      stock: 5,
      brand: 'ASUS',
      category: 'laptops',
      features: {
        Screen:
          '16 inches – 2560 x 1600 resolution - 165 Hz Refresh Rate - IPS',
        Processor: 'AMD Ryzen 9 5900HX',
        Memory: '32 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 3080',
        Storage: '1 TB PCIe NVMe SSD',
        OS: 'Windows 10 Pro',
        Connectivity: 'Wi-Fi 6 (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Zephyrus G14 (2023) GA402',
      description:
        'The ROG Zephyrus G14 (2023) GA402 is a powerful gaming laptop that offers exceptional performance for your favorite games. Equipped with an AMD Ryzen 7 5800HS processor, 16 GB of DDR4 3200 memory, and an NVIDIA GeForce RTX 3060 graphics card, this laptop is perfect for gaming and multitasking. With a 14-inch screen and a resolution of 2560 x 1440, you can enjoy sharp images and vibrant colors. Additionally, it comes preinstalled with Windows 10 Home so you can start gaming right away.',
      price: 700000,
      stock: 5,
      brand: 'ASUS',
      category: 'laptops',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/A6EE593A-5732-4132-8893-CFDC72438CA8/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8C54AE5B-0B0B-4392-B6E4-E5DE8AF51EAA/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E1ED583A-8785-470D-95F7-EE05C34E0F24/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/712009C6-67EA-4B72-983A-BA7009BE5253/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/C85D05D6-17A6-488B-903C-75D9FC25FD08/w1000/h732'
      ],
      features: {
        Screen:
          '14 inches – 2560 x 1440 resolution - 120 Hz Refresh Rate - IPS',
        Processor: 'AMD Ryzen 7 5800HS',
        Memory: '16 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 3060',
        Storage: '512 GB PCIe NVMe SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6 (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Zephyrus Duo 16 (2023) GX650',
      description:
        'Game or create on the cutting edge with up to an AMD Ryzen™ 9 7945HX processor and up to an NVIDIA®GeForce RTX™ 4090 Laptop GPU. The Ryzen™ 9 7945HX CPU offers incredible gaming and multitasking performance, letting you stream and render even the most intensive projects, while the powerful RTX™ 4090 Laptop GPU guarantees incredible in-game framerates and content creation acceleration. A 1080p IR webcam offers seamless video capture and security with Windows Hello support. With up to 4TB of blazing fast PCIe®4.0 SSD storage in RAID 0 and 64GB of 4800MHz DDR5 RAM, the 2023 Zephyrus Duo 16 is a multitasking monster and offers rapid load times for all your games and applications.',
      price: 1200000,
      stock: 10,
      brand: 'ASUS',
      category: 'laptops',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/7807824E-6860-4959-957C-20F0446D1E23/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/46FAAF9E-C641-4AB7-B0C8-795BD379C0CB/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8CF89A4E-2526-480F-9E1A-CB127EB7BCDD/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/C655BF17-2802-4875-9890-5CAD6E55C0B0/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/DF4D199B-2F45-44C2-A8C3-90A058212169/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E1249409-7CB2-4F7A-8ADC-E58FADEB54DE/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F8236ACA-F9A8-4AFD-AD71-43A695E9DC4C/w1000/h732'
      ],
      features: {
        Screen:
          '16 inches – 2560 x 1600 resolution - 165 Hz Refresh Rate - IPS',
        Processor: 'AMD Ryzen 9 7945HX',
        Memory: '64 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 4090',
        Storage: '4 TB PCIe 4.0 SSD',
        OS: 'Windows 10 Pro',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Zephyrus M16 (2022) GU603',
      description:
        'The ROG Zephyrus M16 (2022) GU603 is a powerful gaming laptop that offers exceptional performance for your favorite games. Equipped with an Intel Core i9-12900H processor, 32 GB of DDR5 4800 memory, and an NVIDIA GeForce RTX 4080 graphics card, this laptop is perfect for gaming and multitasking. With a 16-inch screen and a resolution of 2560 x 1600, you can enjoy sharp images and vibrant colors. Additionally, it comes preinstalled with Windows 10 Pro so you can start gaming right away.',
      price: 1100000,
      stock: 3,
      brand: 'ASUS',
      category: 'laptops',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/14C97F28-01B0-4F14-A533-DCA0050E444B/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8F7222CC-8AC1-4FEA-A91E-AC0019E785F9/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/155A3351-747D-4C06-955D-7F064EAED03B/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/737200F1-7B2B-476D-A800-8B26E2142D40/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/DCEAFDB2-67D2-40F6-98BC-2D46C0CF8C2C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/D71A2E67-58FA-4CC3-9636-3197E7EB1B16/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/4FC8E71B-C9DB-4F09-B316-D648A4FD56C4/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/5A0537B6-2E85-44E9-AA7B-7AAADB125854/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E5DFD687-44D4-48EA-A88B-7360FE8C9CEF/w1000/h732'
      ],
      features: {
        Screen:
          '16 inches – 2560 x 1600 resolution - 165 Hz Refresh Rate - IPS',
        Processor: 'Intel Core i9-12900H',
        Memory: '32 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 4080',
        Storage: '2 TB PCIe NVMe SSD',
        OS: 'Windows 10 Pro',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Zephyrus G15 (2022) GA503',
      description:
        "Blaze through games, content creation, and more with up to an AMD Ryzen™ 9 6900HS CPU and GeForce RTX™ 3080 Laptop GPU. Spend less time waiting and more time gaming with up to 4800MHz DDR5 RAM. Dual M.2 slots connect directly to the CPU for maximum performance, and they're loaded with up to 1TB of storage for your growing games library and creative portfolio.",
      price: 900000,
      stock: 7,
      brand: 'ASUS',
      category: 'laptops',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/C7BA90AC-D74F-4C16-8443-3739E7772D9C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/62C83C9D-F17B-4A37-9759-3D7B8D8315EE/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/9CF9E7BA-06D4-4854-894C-EA44CA65E07C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/053623F2-FC61-446C-B01D-62B32481DE7F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/31678C92-DF68-467A-8D12-E3C74C38E5A5/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/D4FD5834-F4EB-4E90-9D42-D65600924A7B/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/0CC4416D-A816-424D-83B4-874B7E2D92C6/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/4F343220-2F4D-4118-A5C7-AFB7BA6B83AF/w1000/h732'
      ],
      features: {
        Screen:
          '15 inches – 2560 x 1440 resolution - 165 Hz Refresh Rate - IPS',
        Processor: 'AMD Ryzen 9 6900HS',
        Memory: '32 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 3080',
        Storage: '1 TB PCIe 4.0 SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    }
  ],
  desktop: [
    {
      name: 'ROG STRIX G35CA',
      description:
        'Take your game to the next level with an exhilaratingly equipped gaming powerhouse. Fast-paced gameplay is smooth as silk with a GeForce RTX™ 3090 graphics card, giving you a competitive edge in any arena. A formidable 13th Gen Intel® Core i9-13900KF CPU slices through even your most intensive workloads and games. Supporting up to 128GB of next-gen DDR5-4800MHz RAM means even the most serious power users can multitask to their hearts content.',
      price: 1500000,
      offer: {
        discount: 60,
        expiresAt: '2024-05-27'
      },
      stock: 23,
      category: 'desktop',
      brand: 'ASUS',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/DC39AD12-74DD-4DA1-966E-F5A8315DC710/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8093D1E5-7B92-4C11-B7BA-BDB41383ADE6/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3D204694-18D6-4284-AC19-C64737518660/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/B2499962-1734-413D-A312-A988012AF7C2/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/D1CEC160-A0BD-4A78-8F06-AEEC06895EA8/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F4A5B07B-B820-4DF7-AC53-0433671B3E9C/w1000/h732'
      ],
      features: {
        Processor: 'Intel Core i9-13900KF',
        Memory: '128 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 3090',
        Storage: '2 TB PCIe 4.0 SSD',
        OS: 'Windows 10 Pro',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Strix G16CHR',
      description:
        'Dominate the battlefield with this high-powered Windows 11 Home gaming monster. Featuring up to an Intel® Core™ i7 processor 14700KF and up to an NVIDIA® GeForce RTX™ 4080 GPU, you can have the best of high resolution and high refresh rate gaming, even when all the graphics settings are pumped to the max. For the aspiring content creators or artists, up to 64GB of DDR5 RAM ensures that you can keep all of your applications running at once without a hiccup.',
      price: 2200000,
      stock: 10,
      category: 'desktop',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/FB384021-69AE-445F-8784-C4D2CA4DF9F3/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/AE2CE1D3-FA92-4F11-840B-AE4170A6DC96/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/48A51C6A-2C96-48AC-A543-594CA8BF3347/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F402AA2F-0F4C-4744-AD2E-D2506CA0A841/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/449F329A-493E-424A-8510-9A9E6D526410/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/5598323B-EA1F-4B8D-8956-4BDF7C694138/w1000/h732'
      ],
      features: {
        Processor: 'Intel Core i7-14700KF',
        Memory: '64 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 4080',
        Storage: '1 TB PCIe 4.0 SSD',
        OS: 'Windows 11 Home',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Strix G13CH',
      description:
        'Unlock the full Windows 11 Pro gaming experience with the ROG Strix G13CH. Powered by up to a 13th Gen Intel® Core™ i7-13700 processor and up to an NVIDIA® GeForce RTX™ 40 Series GPU, the Strix G13CH is truly ready for battle. It also boasts up to 64GB of 3200MHz DDR4 RAM and up to 2TB of PCIe Gen4 NVMe storage on two drives, with an additional 1TB HDD for larger game and music libraries. Game, stream, and leave all your tabs open without a worry thanks to the horsepower of the Strix G13CH.',
      price: 1800000,
      stock: 13,
      category: 'desktop',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/81475F62-0C10-42B4-B667-023C99A78BA5/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/07329593-0073-4039-B81D-A95C7D9F1CF6/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/4336ACA0-BE28-4EA4-B0AE-A1B65E818397/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/AFF1BE30-0C29-4859-8924-0227454767C1/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/B35FA183-A1C1-45FD-9315-3318180BA745/w1000/h732'
      ],
      features: {
        Processor: 'Intel Core i7-13700',
        Memory: '64 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 40 Series',
        Storage: '2 TB PCIe Gen4 NVMe SSD + 1 TB HDD',
        OS: 'Windows 11 Pro',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Strix GA15 G15',
      description:
        'Smooth, clear graphics are crucial in esports, where reaction times make or break plays. Up to an NVIDIA® GeForce RTX™ 3070 pumps out reliably high frame rates for fast and fluid play, while up to a potent AMD® Ryzen™ 7 5800X 8-core CPU gives you enough power to handle creative work like streaming and video editing too. Armed with up to 64GB DDR4-3200 memory, you can easily game, stream, browse, and chat without missing a beat.',
      price: 1200000,
      stock: 15,
      category: 'desktop',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/B25864CF-56AC-41C4-BDFE-9C8FA9195893/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/C0913D2E-F165-4E54-8EF9-5C43023A55D9/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/6EF88104-0F4C-4241-AAB4-3B649C9F75CA/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/23D9C1A4-1F17-4464-B97F-5E9B80DA96A3/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/2E5DE66F-2D2C-459A-AC2F-2542D4389ECC/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/40012BC4-365E-43F6-9A9C-13B3FBFCC642/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/FC17255F-10EB-49A4-B6A6-52287E05ECE5/w1000/h732'
      ],
      features: {
        Processor: 'AMD Ryzen 7 5800X',
        Memory: '64 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 3070',
        Storage: '1 TB PCIe Gen4 NVMe SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6 (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard',
        Cooling: 'Liquid Cooling'
      }
    },
    {
      name: 'ROG NUC',
      description:
        'Super charge modern gaming with NVIDIA® GeForce RTX™ 4070/4060. It’s built with the ultra-efficient NVIDIA Ada Lovelace architecture. Experience fast ray tracing, AI-accelerated performance with DLSS 3, new ways to create, and much more. Plus, every system offers up to 64GB dual-channel DDR5 memory, three M.2 PCIe slots and the latest in wireless connectivity with Intel® Killer™ Wi-Fi 6E and Bluetooth® 5.3. Gamers can also connect at will with one Thunderbolt™ 4, four USB 3.2 Gen2, two USB 2.0 ports.',
      price: 800000,
      stock: 20,
      category: 'desktop',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/4F5F2B6E-FCF5-463C-9B21-83797E235A4C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F1A8D478-11A4-47C1-912F-AFC53D0DAD6B/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/48FFBC46-9D27-44E1-BA37-C176FBFB234F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/07926798-0751-47F4-A478-62894257838E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/880A2E51-AFA4-4C8A-BC1F-40BA87BC03B1/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/AC7FC2E6-AE95-4356-9C11-FF48B1648E62/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/6275F290-C7E0-48C7-9AAF-2D0F715930BA/w1000/h732'
      ],
      features: {
        Processor: 'Intel Core i7-12700',
        Memory: '64 GB DDR5 4800',
        Graphics: 'NVIDIA GeForce RTX 4070/4060',
        Storage: '2 TB PCIe Gen4 NVMe SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6E (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    },
    {
      name: 'ROG Strix GA15 G15',
      description:
        'Smooth, clear graphics are crucial in esports, where reaction times make or break plays. Up to an NVIDIA® GeForce RTX™ 3070 pumps out reliably high frame rates for fast and fluid play, while up to a potent AMD® Ryzen™ 7 5800X 8-core CPU gives you enough power to handle creative work like streaming and video editing too. Armed with up to 64GB DDR4-3200 memory, you can easily game, stream, browse, and chat without missing a beat.',
      price: 1242000,
      stock: 8,
      category: 'desktop',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/B25864CF-56AC-41C4-BDFE-9C8FA9195893/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/C0913D2E-F165-4E54-8EF9-5C43023A55D9/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/6EF88104-0F4C-4241-AAB4-3B649C9F75CA/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/23D9C1A4-1F17-4464-B97F-5E9B80DA96A3/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/40012BC4-365E-43F6-9A9C-13B3FBFCC642/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/5BA039D7-C937-4A29-B785-F9E4F465F50E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/FC17255F-10EB-49A4-B6A6-52287E05ECE5/w1000/h732'
      ],
      features: {
        Processor: 'AMD Ryzen 7 5800X',
        Memory: '64 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 3070',
        Storage: '1 TB PCIe Gen4 NVMe SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6 (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard',
        Cooling: 'Liquid Cooling'
      }
    },
    {
      name: 'ROG Strix G10CE G10CE',
      description:
        'The Strix G10CE reaches another level of gaming realism with up to an 11th Gen Intel® Core™ i7-11700KF processor and new NVIDIA® GeForce RTX™ 3060 or up to an Intel® Arc™ A380 graphics card. Up to a 1TB M.2 PCIe SSD offers superfast game and app load times, and optional Intel Optane memory accelerates access to a hard drive ready for larger game libraries.',
      price: 460000,
      stock: 12,
      category: 'desktop',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/1CF4414D-AC8F-4D4C-A6A9-DB4C2F9878F7/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/7F0C623A-9DD4-4712-9A07-21AAA2251CCC/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3D92936C-81AA-411D-AF03-675D3D458FE0/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3506D847-A5F4-467F-A394-51E2E0FC4E0A/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8F88F2D4-7577-44F6-B0AB-C22CB5946E68/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/2EA16933-C184-45F8-8362-330A1270B173/w1000/h732'
      ],
      features: {
        Processor: 'Intel Core i7-11700KF',
        Memory: '32 GB DDR4 3200',
        Graphics: 'NVIDIA GeForce RTX 3060',
        Storage: '1 TB PCIe Gen4 NVMe SSD',
        OS: 'Windows 10 Home',
        Connectivity: 'Wi-Fi 6 (802.11ax) - Bluetooth 5.2',
        Keyboard: 'Backlit RGB Keyboard'
      }
    }
  ],
  keyboards: [
    {
      name: 'ROG Falchion RX Low Profile',
      description:
        'ROG Falchion RX Low Profile 65% compact wireless gaming keyboard with ROG RX low-profile optical switches, tri-mode connection with ROG SpeedNova wireless technology and Omni Receiver, protective cover, integrated silicone dampening foam, interactive touch panel, and MacOS support',
      price: 25000,
      stock: 10,
      offer: {
        discount: 20,
        expiresAt: '2024-05-27'
      },
      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/4C1FFDF8-B232-4974-847B-D3CB6757273F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/358CBEB5-3333-4C33-AFDA-F35880F28CD9/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/0B522307-78BF-4F10-AA9B-9D9D6BC00C76/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3777C3E5-8237-4EB6-939B-95CA3F2E00B7/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3AE003CE-0BBB-414C-99E0-089FC2C0D315/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/95E2F96D-178E-4432-928C-3B462BAF58F7/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/5C561C3B-F0FB-48B4-BB18-94EEBF80772F/w1000/h732'
      ],
      features: {
        Switches: 'ROG RX Low-Profile Optical',
        Connectivity:
          'Tri-mode connection with ROG SpeedNova wireless technology and Omni Receiver',
        Features:
          'Protective cover, integrated silicone dampening foam, interactive touch panel, MacOS support'
      }
    },
    {
      name: 'ROG Azoth',
      description:
        'ROG Azoth gaming custom keyboard with 75 keyboard form factor, gasket mount, three-layer dampening foam and metal top cover, highly customizable with hot-swappable pre-lubed ROG NX mechanical switches, ROG keyboard stabilizers, PBT doubleshot keycaps and lube kit, tri-mode connection with 2.4 GHz SpeedNova technology, OLED display, three-way control knob, three tilt angles, and Mac support',
      price: 30000,
      stock: 15,

      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/5D69843B-1D87-4926-B09A-49935A9E491C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/B35A9B08-F6BA-4B7C-9383-5D04444D2A1F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/45CA7C69-E384-4EA6-9E06-C2E06F7CF538/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/42C812CE-AAF9-44D8-854E-928E37B1A889/w1000/h732'
      ],
      features: {
        Switches: 'ROG NX Mechanical',
        Connectivity: 'Tri-mode connection with 2.4 GHz SpeedNova technology',
        Features:
          'OLED display, three-way control knob, three tilt angles, and Mac support'
      }
    },
    {
      name: 'ROG Strix Scope II RX',
      description:
        'ROG Strix Scope II RX gaming keyboard with pre-lubed ROG RX optical switches, IP57 waterproof protection, sound-dampening foam, PBT doubleshot keycaps or UV-coated ABS keycaps, streaming hotkeys, multi-function controls, three tilt angles, and wrist rest',
      price: 20000,
      stock: 20,

      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/289FCD57-7C08-4B63-B38A-314A009FA46F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/8E2D8455-BE85-46D7-8BE6-17E9A0E96F5C/w1000/h732'
      ],
      features: {
        Switches: 'ROG RX Optical',
        Protection: 'IP57 Waterproof',
        Features:
          'Sound-dampening foam, PBT doubleshot keycaps or UV-coated ABS keycaps, streaming hotkeys, multi-function controls, three tilt angles, and wrist rest'
      }
    },
    {
      name: 'ROG Strix Scope RX EVA Edition',
      description:
        'ROG Strix Scope RX EVA Edition optical RGB gaming keyboard for FPS gamers, with EVA-inspired design, ROG RX optical mechanical switches, all-round Aura Sync RGB illumination, IP57 waterproof and dust resistance, USB 2.0 passthrough, and alloy top plate',
      price: 18000,
      stock: 25,

      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/B6BCEA5A-2863-4904-AB78-B10416338664/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/FFE668D9-AF7E-4B6C-96F6-CFE96848DF00/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E97B8E74-E7B7-40B9-8611-205A12BEF93E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/58930081-19DD-448C-9E1E-0EB13D22C79E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/42EC162C-747B-4484-8297-71A6D560FCCA/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/16772DEF-4206-4630-9755-5C7EFB9174DF/w1000/h732'
      ],
      features: {
        Switches: 'ROG RX Optical',
        Design: 'EVA-inspired',
        Protection: 'IP57 Waterproof and Dust Resistance',
        Features: 'USB 2.0 Passthrough, Alloy Top Plate',
        Connection: 'Wired'
      }
    },
    {
      name: 'ROG Strix Scope NX TKL Moonlight White',
      description:
        'ROG Strix Scope NX TKL Moonlight White wired mechanical RGB gaming keyboard for FPS games, with ROG NX switches, aluminum frame, and Aura Sync lighting',
      price: 80000,
      stock: 30,

      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/D973617B-8AC5-4D70-9B6A-C5CAEBD3F1B7/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/AA156B88-2346-4523-9D4C-8E2B477BFE9C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/31988E4F-0A5A-4435-B5DB-3791EBA0BD9F/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/6B4413A8-E2F6-4EF2-B376-EB27CDD3145E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F71D3793-4955-4503-A177-E31854943272/w1000/h732'
      ],
      features: {
        Switches: 'ROG NX',
        Frame: 'Aluminum',
        Lighting: 'Aura Sync RGB',
        Connection: 'Wired'
      }
    },
    {
      name: 'ROG Strix Scope TKL',
      description:
        'ROG Strix Scope TKL wired mechanical RGB gaming keyboard for FPS games, with Cherry MX switches, aluminum frame, and Aura Sync lighting',
      price: 70000,
      stock: 35,

      category: 'keyboards',
      images: [
        'https://dlcdnwebimgs.asus.com/gain/9A843F86-E720-43D0-AC04-9BBFD83B1A1C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/CB8E6DAB-FD14-4EE8-9AA0-F24C5A71AEA0/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3FC51FBF-CA3F-4407-9CB2-A61019BB6B12/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/D1AEEBED-12E7-400C-9B73-771EEE12C19B/w1000/h732'
      ],
      features: {
        Switches: 'Cherry MX',
        Frame: 'Aluminum',
        Lighting: 'Aura Sync RGB',
        Connection: 'Wired'
      }
    }
  ],
  mice: [
    {
      name: 'ROG Keris II Ace',
      description:
        'The ROG Keris II Ace is an ultralight 54-gram ergonomic gaming mouse with a shape tested by pro FPS players. Equipped with 42,000-dpi ROG AimPoint Pro optical sensor, ROG Optical Micro Switches and the ROG SpeedNova wireless technology, the Keris II Ace is also able to enhance gaming performance even further with the ROG Polling Rate Booster, which supports polling rates up to 4,000 Hz in wireless mode and up to 8,000 Hz in wired mode.',
      price: 10000,
      stock: 10,
      category: 'mice',
      offer: {
        discount: 10,
        expiresAt: '2024-05-27'
      },
      images: [
        'https://dlcdnwebimgs.asus.com/gain/84A1865A-0ADB-454D-BF36-66A96E071F4D/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F23A7C16-5C3A-40F0-B35E-7E38850B6EB0/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/595E9075-C32E-48E2-BE01-C8765D8299F8/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E9A5CF8D-2795-45DB-ABA7-D515962D8826/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/2D1ABD5C-3367-4F0A-9346-2EE40AF385EA/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/11ECC6BD-908A-4A00-8B28-6B0757FEBCA8/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/296F8430-A056-4B83-BCCC-DEF4EC6BD950/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/BA4AF4F0-B972-4A2F-B5BC-CB5F5923498E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E3CE5380-9119-425D-A576-A19644CFB262/w1000/h732'
      ],
      features: {
        Sensor: 'ROG AimPoint Pro Optical',
        Switches: 'ROG Optical Micro',
        Connectivity: 'ROG SpeedNova Wireless',
        Polling: 'ROG Polling Rate Booster'
      }
    },
    {
      name: 'ROG Gladius III Wireless AimPoint',
      description:
        'The ROG Gladius III Wireless AimPoint is a lightweight 79-gram wireless RGB gaming mouse that features a 36,000-dpi ROG AimPoint optical sensor, tri-mode connectivity, ROG SpeedNova wireless technology, swappable mouse switches, ROG Micro Switches, pivoted button mechanism for 0 ms click latency, ergonomic design, ROG Paracord, 100% PTFE mouse feet, six programmable buttons, and mouse grip tape.',
      price: 8000,
      stock: 15,
      category: 'mice',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/293663B4-274A-413F-AE7F-3F343BCC4C51/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/4E2672B9-9E95-4216-A7A9-76F99D8D5AB2/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/183DC9A6-1AA4-47A1-8A6B-0A75D07B80C6/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/751E7672-D4BE-41E7-AAC1-C0E8B3A10DF5/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/FA24D92A-9CD7-4632-A3FE-B05A1CE5D795/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/DBEEB844-E5D6-4EAC-AF8E-98AD5F30CCCD/w1000/h732'
      ],
      features: {
        Sensor: 'ROG AimPoint Optical',
        Connectivity: 'Tri-mode',
        Switches: 'ROG Micro',
        Latency: '0 ms',
        Design: 'Ergonomic'
      }
    },
    {
      name: 'ROG Spatha X',
      description:
        'Wireless gaming mouse with dual-mode connectivity (wired / 2.4 GHz) with magnetic charging stand, 12 programmable buttons, specially tuned ROG 19,000 dpi sensor, Exclusive Push-Fit Switch Sockets, ROG Micro Switches, ROG Paracord and Aura Sync RGB lighting',
      price: 23000,
      stock: 40,
      category: 'mice',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/661C5213-8606-4A61-9D5F-877E76689F4E/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/14CA370D-A607-4B00-A665-ADC2232E885E/w1000/h732'
      ],
      features: {
        Connectivity: 'Dual-mode (wired / 2.4 GHz)',
        Buttons: '12',
        Sensor: 'ROG 19,000 dpi',
        Switches: 'ROG Micro',
        Lighting: 'Aura Sync RGB'
      }
    },
    {
      name: 'ROG Spatha X',
      description:
        'Wireless gaming mouse with dual-mode connectivity (wired / 2.4 GHz) with magnetic charging stand, 12 programmable buttons, specially tuned ROG 19,000 dpi sensor, Exclusive Push-Fit Switch Sockets, ROG Micro Switches, ROG Paracord and Aura Sync RGB lighting',
      price: 23000,
      stock: 40,
      category: 'mice',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/1D6EF918-6D35-4727-BD7A-1DA2908ABB58/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E1DBA69F-388C-4900-B261-C0365B2615BF/w1000/h732'
      ],
      features: {
        Connectivity: 'Dual-mode (wired / 2.4 GHz)',
        Buttons: '12',
        Sensor: 'ROG 19,000 dpi',
        Switches: 'ROG Micro',
        Lighting: 'Aura Sync RGB'
      }
    }
  ],
  headsets: [
    {
      name: 'ROG Delta S Wireless',
      description:
        'Lightweight wireless gaming headset with 2.4 GHz and Bluetooth connectivity, 50 mm ASUS Essence drivers, AI Beamforming Microphones with AI Noise Cancelation, compatible with PCs, Macs, PlayStation® 5, Nintendo Switch™',
      price: 70000,
      stock: 20,
      category: 'headsets',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/2C56D4CD-1E2F-42DB-B09F-43C4DBBA59B6/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F223AA9E-DC85-421B-990A-EA07C27D19E5/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/A7DF92CF-4599-46BD-881D-ED0AE958F3A8/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/711BC3D2-E4F2-4A94-9D8F-5C227FC26CDF/w1000/h732'
      ],
      features: {
        Connectivity: '2.4 GHz and Bluetooth',
        Drivers: '50 mm ASUS Essence',
        Microphones: 'AI Beamforming with AI Noise Cancelation',
        Compatibility: ['PCs', 'Macs', 'PlayStation® 5', 'Nintendo Switch™']
      }
    },
    {
      name: 'ROG Strix Go BT',
      description:
        'Bluetooth® wireless gaming headset with Qualcomm® aptX™ Adaptive audio technology, Active Noise cancelation (ANC) technology, ASUS AI Noise-Canceling Microphone, low-latency performance and compatibility with PCs, Nintendo Switch™, smart devices and PS5™',
      price: 40000,
      stock: 25,
      category: 'headsets',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/A5976CE6-C96E-4E27-BC16-428924F90C82/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/F82F8792-B3BE-4B58-B5EB-616ED8D52F39/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/785242B8-B657-4161-8EF8-DBCA62470D42/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E85D7309-CD77-49CC-BE81-BF3B0E8F9D05/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/C61D9820-6341-4B8A-B9FF-FEC3EE2E97C2/w1000/h732'
      ],
      features: {
        Connectivity: 'Bluetooth®',
        Technology: 'Qualcomm® aptX™ Adaptive',
        ANC: 'Active Noise Cancelation',
        Microphone: 'ASUS AI Noise-Canceling',
        Compatibility: ['PCs', 'Nintendo Switch™', 'Smart Devices', 'PS5™']
      }
    },
    {
      name: 'ROG Fusion II 300',
      description:
        'RGB gaming headset with high resolution ESS 9280 Quad DAC™, deep bass and immersive 7.1 surround sound, AI Beamforming Microphones with AI Noise Cancelation, compatible with PCs, PlayStation® 5, Nintendo Switch™.',
      price: 120000,
      stock: 30,
      category: 'headsets',

      images: [
        'https://dlcdnwebimgs.asus.com/gain/A2FA50FB-99ED-4CE0-9622-9529C30F3B11/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/2C8243D2-4EAB-4BEA-976C-743431E5CC4C/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/3CBAD838-FC65-44F8-BAD5-CDE33E69AAFF/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/E3619772-6550-49BD-B23A-C158F6E43881/w1000/h732',
        'https://dlcdnwebimgs.asus.com/gain/D40ED444-301A-44F3-8476-A0144A498EA3/w1000/h732'
      ],
      features: {
        DAC: 'ESS 9280 Quad DAC™',
        Sound: '7.1 Surround',
        Microphones: 'AI Beamforming with AI Noise Cancelation',
        Compatibility: ['PCs', 'PlayStation® 5', 'Nintendo Switch™']
      }
    }
  ]
}

let idGenerator = 0

export const AllProducts: IProduct[] = Object.entries(DATA)
  .map(([, value]) => {
    return value.map((product) => {
      idGenerator = idGenerator + 1
      return {
        ...product,
        id: idGenerator
      } as IProduct
    })
  })
  .flat()
