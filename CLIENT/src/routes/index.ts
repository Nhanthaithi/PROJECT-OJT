import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Router } from '@remix-run/router';
import DefaultLayout from '../layouts/DefaultLayout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import PageCreate from '../pages/stock/PageCreate';
import MemberViewPage from '../pages/members/MemberViewPage';
import ShopWarehousePage from '../pages/stock/ShopWarehousePage';
import MallWareHouseCreate from '../pages/mall-warehouse/MallWareHouseCreate';
import PageNotFound from '../components/errors/PageNotFound';
import ResourceNotFound from '../components/errors/ResourceNotFound';
import MemberEditPage from '../pages/members/MemberEditPage';
import ItemListPage from '../pages/ItemListPage';
import MemberSuccessPage from '../pages/members/MemberSuccessPage';
import MallWareHouseEdit from '../pages/mall-warehouse/MallWareHouseEdit';
import ListMallPage from '../pages/mall-warehouse/ListMallWarehouse';
import EditPage from '../pages/stock/EditPageShoWarehouse';
import StandardCreate from '../pages/item/StandardCreate';
import Category from '../pages/CategoryPage/CategoryPage';
import StandardViewPage from '../pages/item/standardViewPage';

const routes: RouteObject[] = [
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    id: 'root',
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: '/members/:id/edit/',
        Component: MemberEditPage,
      },
      {
        path: '/members',
        Component: MemberViewPage,
      },
      {
        path: '/members/success',
        Component: MemberSuccessPage,
      },
      {
        path: '/items',
        Component: ItemListPage,
      },
      {
        path: '/mall-warehouses',
        Component: ListMallPage,
      },
      {
        path: '/mall-warehouses/create',
        Component: MallWareHouseCreate,
      },
      {
        path: '/mall-warehouses/:id/edit',
        Component: MallWareHouseEdit,
      },
      {
        path: '/resourceNotFound',
        Component: ResourceNotFound,
      },
      {
        path: '/shop-warehouses',
        Component: ShopWarehousePage,
      },
      {
        path: '/standards',
        Component: StandardViewPage,
      },
      {
        path: '/create-shop-warehouse',
        Component: PageCreate,
      },
      { path: 'shop-warehouses/:id', Component: EditPage },
      {
        path: '/categories',
        Component: Category,
      },
      {
        path: '/standards/created',
        Component: StandardCreate,
      },
    ],
  },
  {
    path: '*',
    Component: PageNotFound,
  },
];

const router: Router = createBrowserRouter(routes);

export default router;
