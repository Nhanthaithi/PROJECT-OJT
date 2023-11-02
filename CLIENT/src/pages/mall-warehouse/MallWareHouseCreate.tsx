import React from 'react';
import MallWarehouseForm from '../../components/form/form-mall-warehouse/MallWarehouseForm';
import { MallWarehouseType } from '../../types/mall-warehouse/MallWarehouse.type';
import { createMallWarehouseApi } from '../../apis/stock/mall-warehouse';

const MallWareHouseCreate: React.FC = () => {
  const handleDataCreate = async (data: MallWarehouseType) => {
    try {
      await createMallWarehouseApi(data);
      alert('Created Successfully');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="col-10">
      <MallWarehouseForm onSubmit={handleDataCreate} />
    </div>
  );
};

export default MallWareHouseCreate;
