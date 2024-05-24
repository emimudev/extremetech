import type { ReactNode } from 'react'
import { GpuIcon, MotherboardIcon } from '@/components/icons'
import {
  CpuIcon,
  HeadsetIcon,
  KeyboardIcon,
  LaptopIcon,
  MemoryStickIcon,
  MonitorIcon,
  MouseIcon,
  PcCaseIcon
} from 'lucide-react'

export interface MenuItem {
  title: string
  href: string
  description?: string
  icon?: ReactNode
}

export const productsMenuItems: [string, MenuItem[]][] = [
  [
    'Computers',
    [
      {
        title: 'Laptops',
        // href: '/products/laptops',
        href: '/products?categories=laptops',
        icon: <LaptopIcon />,
        description: 'Take the adventure everywhere'
      },
      {
        title: 'Desktops',
        icon: <PcCaseIcon />,
        href: '/products/desktop',
        description: 'Powerful processors and dedicated graphics cards.'
      }
    ]
  ],
  [
    'Components',
    [
      {
        title: 'CPUs',
        icon: <CpuIcon />,
        // href: '/products/cpus',
        href: '/products?categories=cpus',
        description:
          'Find the best CPUs that are designed to deliver the ultimate performance for your home or office.'
      },
      {
        title: 'GPUs',
        icon: <GpuIcon />,
        // href: '/products/gpus',
        href: '/products?categories=gpus',
        description:
          'Discover our range of GPUs that are engineered with powerful processors and dedicated graphics cards.'
      },
      {
        title: 'Motherboards',
        icon: <MotherboardIcon />,
        // href: '/products/motherboards',
        href: '/products?categories=motherboards',
        description:
          'Explore our range of motherboards that are designed to deliver the ultimate performance for your home or office.'
      },
      {
        title: 'Memory',
        icon: <MemoryStickIcon />,
        // href: '/products/memory',
        href: '/products?categories=memory',
        description:
          'Find the best memory that are engineered with powerful processors and dedicated graphics cards.'
      }
    ]
  ],
  [
    'Peripherals',
    [
      {
        title: 'Monitors',
        // href: '/products/monitors',
        href: '/products?categories=monitors',
        icon: <MonitorIcon />,
        description:
          'Explore our range of monitors that are designed to deliver the ultimate performance for your home or office.'
      },
      {
        title: 'Keyboards',
        // href: '/products/keyboards',
        href: '/products?categories=keyboards',
        icon: <KeyboardIcon />,
        description:
          'Discover our range of keyboards that are engineered with powerful processors and dedicated graphics cards.'
      },
      {
        title: 'Mice',
        // href: '/products/mice',
        href: '/products?categories=mice',
        icon: <MouseIcon />,
        description:
          'Find the best mice that are designed to deliver the ultimate performance for your home or office.'
      },
      {
        title: 'Headsets',
        icon: <HeadsetIcon />,
        // href: '/products/headsets',
        href: '/products?categories=headsets',
        description:
          'Explore our range of headsets that are engineered with powerful processors and dedicated graphics cards.'
      }
    ]
  ]
]
