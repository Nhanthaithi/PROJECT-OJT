import React, { useEffect, useState } from 'react';
import { MallWarehouseType } from '../../types/mall-warehouse/MallWarehouse.type';

import { useNavigate, useParams } from 'react-router-dom';
import { deleteMallWarehouseApi, getMallWarehouseApi, updateMallWarehouseApi } from '../../apis/stock/mall-warehouse';
import MallWarehouseForm from '../../components/form/form-mall-warehouse/MallWarehouseForm';

const MallWareHouseEdit: React.FC = () => {
  const [hidden, setHidden] = useState(1);
  const [editForm, setEditForm] = useState(1);
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();
  const [dataRenderForm, setDataRenderForm] = useState<MallWarehouseType>({});

  const { id } = useParams<{ id: string }>();

  const handleGetData = () => {
    getMallWarehouseApi(Number(id))
      .then((mallWarehouseData) => {
        setDataRenderForm(mallWarehouseData);
      })
      .catch(() => {
        alert('Mall Warehouse does not exist');
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleSubmit = async (data: MallWarehouseType) => {
    try {
      await updateMallWarehouseApi(Number(id), data);
      alert('Updated Successfully!');
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMallWarehouseApi(Number(id));
      alert('Delete Successfully!');
      navigate('/mall-warehouses');
    } catch (error) {
      alert('Mall Warehouse is still valid');
    }
  };

  const updateHiddenValue = (newHidden: number, newEditForm: number, newIsEditing: boolean) => {
    setHidden(newHidden);
    setEditForm(newEditForm);
    setIsEditing(newIsEditing);
  };

  return (
    <div className="col-10">
      <MallWarehouseForm
        onSubmit={handleSubmit}
        onChange={updateHiddenValue}
        onDelete={handleDelete}
        id={id}
        hidden={hidden}
        editForm={editForm}
        isEditing={isEditing}
        data={dataRenderForm}
      />
    </div>
  );
};

export default MallWareHouseEdit;
