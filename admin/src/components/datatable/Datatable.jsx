import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:4000/api/${path}`
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
