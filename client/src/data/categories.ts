import { ICategory } from '@/types'
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
import groupBy from 'lodash.groupby'

export const AllCategories: Record<string, ICategory> = {
  computers: {
    name: 'Computers',
    id: 'computers',
    parent: null
  },
  // gaming: {
  //   name: 'Gaming',
  //   id: 'gaming',
  //   parent: 'computers'
  // },
  laptops: {
    name: 'Laptops',
    id: 'laptops',
    parent: 'computers'
  },
  desktop: {
    name: 'Desktops',
    id: 'desktop',
    parent: 'computers'
  },
  // homeoffice: {
  //   name: 'Home Office',
  //   id: 'homeoffice',
  //   parent: 'computers'
  // },
  components: {
    name: 'Components',
    id: 'components',
    parent: null
  },
  cpus: {
    name: 'CPUs',
    id: 'cpus',
    parent: 'components'
  },
  gpus: {
    name: 'GPUs',
    id: 'gpus',
    parent: 'components'
  },
  motherboards: {
    name: 'Motherboards',
    id: 'motherboards',
    parent: 'components'
  },
  memory: {
    name: 'Memory',
    id: 'memory',
    parent: 'components'
  },
  // storage: {
  //   name: 'Storage',
  //   id: 'storage',
  //   parent: 'components'
  // },
  // cooling: {
  //   name: 'Cooling',
  //   id: 'cooling',
  //   parent: 'components'
  // },
  peripherals: {
    name: 'Peripherals',
    id: 'peripherals',
    parent: null
  },
  keyboards: {
    name: 'Keyboards',
    id: 'keyboards',
    parent: 'peripherals'
  },
  mice: {
    name: 'Mice',
    id: 'mice',
    parent: 'peripherals'
  },
  monitors: {
    name: 'Monitors',
    id: 'monitors',
    parent: 'peripherals'
  },
  headsets: {
    name: 'Headsets',
    id: 'headsets',
    parent: 'peripherals'
  }
  // mousepad: {
  //   name: 'Mousepad',
  //   id: 'mousepad',
  //   parent: 'peripherals'
  // },
  // webcams: {
  //   name: 'Webcams',
  //   id: 'webcams',
  //   parent: 'peripherals'
  // }
}

export interface LocalCategory {
  name: string
  code: string
  Icon: React.FC
  groupedBy: string
  description: string
}

export const LocalCategories: LocalCategory[] = [
  {
    name: 'Laptops',
    code: 'laptop',
    Icon: LaptopIcon,
    groupedBy: 'Computers',
    description: 'Take the adventure everywhere'
  },
  {
    name: 'Desktops',
    code: 'desktop',
    Icon: PcCaseIcon,
    groupedBy: 'Computers',
    description: 'Powerful processors and dedicated graphics cards.'
  },
  {
    name: 'Processors',
    code: 'cpu',
    Icon: CpuIcon,
    groupedBy: 'Components',
    description:
      'Find the best CPUs that are designed to deliver the ultimate performance for your home or office.'
  },
  {
    name: 'Graphics Card',
    code: 'gpu',
    Icon: GpuIcon,
    groupedBy: 'Components',
    description:
      'Discover our range of GPUs that are engineered with powerful processors and dedicated graphics cards.'
  },
  {
    name: 'Motherboards',
    code: 'motherboard',
    Icon: MotherboardIcon,
    groupedBy: 'Components',
    description:
      'Explore our range of motherboards that are designed to deliver the ultimate performance for your home or office.'
  },
  {
    name: 'Memory',
    code: 'ram',
    Icon: MemoryStickIcon,
    groupedBy: 'Components',
    description:
      'Find the best memory that are engineered with powerful processors and dedicated graphics cards.'
  },
  {
    name: 'Monitors',
    code: 'monitor',
    Icon: MonitorIcon,
    groupedBy: 'Peripherals',
    description:
      'Explore our range of monitors that are designed to deliver the ultimate performance for your home or office.'
  },
  {
    name: 'Keyboards',
    code: 'keyboard',
    Icon: KeyboardIcon,
    groupedBy: 'Peripherals',
    description:
      'Discover our range of keyboards that are engineered with powerful processors and dedicated graphics cards.'
  },
  {
    name: 'Mouse',
    code: 'mouse',
    Icon: MouseIcon,
    groupedBy: 'Peripherals',
    description:
      'Find the best mice that are designed to deliver the ultimate performance for your home or office.'
  },
  {
    name: 'Headsets',
    code: 'headset',
    Icon: HeadsetIcon,
    groupedBy: 'Peripherals',
    description:
      'Explore our range of headsets that are engineered with powerful processors and dedicated graphics cards.'
  }
]

export const categoriesMenuItems = groupBy(LocalCategories, 'groupedBy')

export const findLocalCategoryByCode = (code: string | undefined | null) => {
  if (!code) return null
  return LocalCategories.find((category) => category.code === code)
}
