import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as requestAPI from '../helpers/apis.js';

const FormCreateMenu = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    imageUrl: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    setError('');
    setIsBackgroundVisible(false);
    // console.log(name, value);
  };

  // console.log(form.name, form.description, form.type, form.imageUrl, form.price);

  const handleSubmit = async () => {
    // rubah format jadi angka
    form.price = Number(form.price);

    // ambil token
    const token = localStorage.getItem('accessToken');

    // buat config untuk Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await requestAPI.createMenuAPI(form, config);
      setIsBackgroundVisible(true);
      setError(res.data.message);
      setCreated(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      // console.log(res);
    } catch (err) {
      setError(err.response.data.message);
      setIsBackgroundVisible(true);
      setCreated(false);
      // console.log(err.response.data.message);
    }
  };

  return (
    <>
      <h1>Create Menu</h1>

      <div className="form-create-menu">
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Name"
          value={form.name}
        />
        <input
          name="description"
          onChange={handleChange}
          type="text"
          placeholder="Description"
          value={form.description}
        />
        <input
          name="imageUrl"
          onChange={handleChange}
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
        />
        <select name="type" onChange={handleChange} id="type" value={form.type}>
          <option value="">Choose Type</option>
          <option value="beverage">Beverage</option>
          <option value="main-dish">Food</option>
        </select>
        <input
          name="price"
          onChange={handleChange}
          type="text"
          placeholder="Price"
          value={form.price}
          inputMode="numeric"
        />
        <button
          disabled={!(form.name && form.description && form.type && form.imageUrl && form.price)}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {created ? (
          <p className={isBackgroundVisible ? 'success bg-visible' : 'success '}>{error}</p>
        ) : (
          <p className={isBackgroundVisible ? 'error bg-visible' : 'error '}>{error}</p>
        )}
      </div>
    </>
  );
};

export default FormCreateMenu;
