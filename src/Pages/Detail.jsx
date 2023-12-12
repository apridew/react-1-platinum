import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as requestAPI from '../helpers/apis.js';

const Detail = () => {
  const [detail, setDetail] = useState({});
  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    handleGetMenusDetail();
  }, []);

  const handleGetMenusDetail = async () => {
    try {
      const res = await requestAPI.getDetailMenuAPI(param.id);
      setDetail(res.data.data);
      // console.log('API Detail', res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="menu-detail">
        <div className="container">
          <h2>Menu Detail</h2>
          <h3>{detail.name}</h3>
          <div className="frame">
            <img src={detail.imageUrl} alt={detail.name} />
          </div>
          <p>ID : {detail.id}</p>
          <p>Categories : {detail.type}</p>
          <p>Price: {detail.priceFormatted}</p>
          <p>Description: {detail.description}</p>
          <div className="button-wrapper">
            <Link to={`/edit/${detail.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
