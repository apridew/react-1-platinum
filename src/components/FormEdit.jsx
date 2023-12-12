import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as requestAPI from '../helpers/apis.js';

const FormEdit = () => {
  const [detail, setDetail] = useState({
    name: '',
    description: '',
    type: '',
    imageUrl: '',
    price: '',
  });
  const [edited, setEdited] = useState('');
  const [error, setError] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetMenusDetail();
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setDetail({
      ...detail,
      [name]: value,
    });

    setEdited('');
    setIsBackgroundVisible(false);

    // console.log(name, value);
  };

  const handleSubmit = async () => {
    detail.price = Number(detail.price);

    const token = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await requestAPI.editMenuAPI(param.id, detail, config);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
      setEdited(true);
      setIsBackgroundVisible(true);
      // console.log(res);
    } catch (err) {
      console.log(err.response);
      setIsBackgroundVisible(true);
      setError(err.response.data.message);
    }
  };

  const handleGetMenusDetail = async () => {
    try {
      const res = await requestAPI.getDetailMenuAPI(param.id);
      setDetail({
        name: res.data.data.name,
        description: res.data.data.description,
        type: res.data.data.type,
        imageUrl: res.data.data.imageUrl,
        price: res.data.data.price,
      });
      // console.log('API Detail', res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Edit Menu</h1>

      <div className="form-create-menu">
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Name"
          value={detail.name}
        />
        <input
          name="description"
          onChange={handleChange}
          type="text"
          placeholder="Description"
          value={detail.description}
        />
        <input
          name="imageUrl"
          onChange={handleChange}
          type="text"
          placeholder="Image URL"
          value={detail.imageUrl}
        />
        <select name="type" onChange={handleChange} id="type" value={detail.type}>
          <option value="">Choose Type</option>
          <option value="beverage">Beverage</option>
          <option value="main-dish">Food</option>
        </select>
        <input
          name="price"
          onChange={handleChange}
          type="text"
          placeholder="Price"
          value={detail.price}
        />
        <div className="button-wrapper">
          <button
            disabled={
              !(detail.name && detail.description && detail.type && detail.imageUrl && detail.price)
            }
            onClick={() => handleSubmit(param.id)}
          >
            Submit
          </button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
      {edited ? (
        <p className={isBackgroundVisible ? 'success bg-visible' : 'success '}>
          Data Berhasil diupdate
        </p>
      ) : (
        <p className={isBackgroundVisible ? 'error bg-visible' : 'error '}>{error}</p>
      )}
    </>
  );
};

export default FormEdit;
