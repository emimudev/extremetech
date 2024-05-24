import { ICategory } from '@/types'

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
