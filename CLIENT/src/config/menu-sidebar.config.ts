const menuSidebar = [
  {
    path: '/members',
    name: 'Members',
    icon: 'bi bi-person-badge',
    children: [
      {
        path: '/members',
        name: 'Members',
        icon: 'bi bi-person-badge',
        children: [],
      },
    ],
  },
  {
    path: '/stocks',
    name: 'Stocks',
    icon: 'bi bi-house-gear',
    children: [
      {
        path: '/mall-warehouses',
        name: 'Mall-Warehouse',
        icon: 'bi bi-bank2',
        children: [],
      },
      {
        path: '/shop-warehouses',
        name: 'Shop-Warehouse',
        icon: 'bi bi-backpack2-fill',
        children: [],
      },
    ],
  },
  {
    path: '/items',
    name: 'Items',
    icon: 'bi bi-stack',
    children: [
      {
        path: '/items',
        name: 'Items',
        icon: 'bi bi-stack',
        children: [],
      },
      {
        path: '/categories',
        name: 'Categories',
        icon: 'bi bi-map-fill',
        children: [],
      },
      {
        path: '/standards',
        name: 'Standard',
        icon: 'bi bi-award-fill',
        children: [],
      },
    ],
  },
];

export default menuSidebar;
