import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as requestAPI from '../helpers/apis.js';

const Menu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);

  const [paging, setPaging] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 2,
  });

  useEffect(() => {
    setIsLoading(true);
    handleGetMenus();
  }, [name, type, paging.currentPage]);

  const handleGetMenus = async () => {
    try {
      const res = await requestAPI.getAllMenusAPI(paging.currentPage, name, type);

      setMenus(res.data.data.Data);
      setPaging({
        currentPage: res.data.data.currentPage,
        previousPage: res.data.data.previousPage,
        nextPage: res.data.data.nextPage,
      });
      setDeleteSuccess(false);
      setIsBackgroundVisible(false);
      setIsLoading(false);
      // console.log('API Menu', res);
    } catch (err) {
      // console.log(err.response);
      setIsLoading(false);
    }
  };
  const handleDeleteMenu = async (id) => {
    const token = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await requestAPI.deleteMenuAPI(id, config);
      console.log(res);
      setIsBackgroundVisible(true);
      setDeleteSuccess(true);
      setTimeout(() => {
        handleGetMenus();
        navigate('/');
      }, 2000);
    } catch (err) {
      setIsBackgroundVisible(true);
      setDeleteError(err.response.data.message);
      setTimeout(() => {
        handleGetMenus();
      }, 2000);
      console.log(err.response.data.message);
    }
  };

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const handleType = (e) => {
    // console.log(e.target.value);
    setType(e.target.value);
  };

  const handleReset = () => {
    setName('');
    setType('');
  };

  const handleNext = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage + 1,
    });
  };

  const handleBack = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  return (
    <>
      <h1>{`Page ${paging.currentPage}`}</h1>

      <div className="pagination">
        <button disabled={paging.previousPage <= 0 ? true : false} onClick={handleBack}>
          Back
        </button>
        <button disabled={paging.nextPage <= 0 ? true : false} onClick={handleNext}>
          Next
        </button>
      </div>
      <h2>Menu List</h2>
      <div className="filter-bar">
        <input
          id="search"
          onChange={handleSearch}
          type="text"
          placeholder="Search menu..."
          value={name}
        />
        <select onChange={handleType} name="type" id="type" value={type}>
          <option value=""> Choose here </option>
          <option value="beverage">Beverage</option>
          <option value="main-dish">Food</option>
        </select>
        <button onClick={handleReset}>Reset</button>
        <Link to={'/create-menu'}>
          <button>Create Menu</button>
        </Link>
      </div>
      {deleteSuccess ? (
        <p className={isBackgroundVisible ? 'success bg-visible' : 'success '}>
          Menu Berhasil dihapus
        </p>
      ) : (
        <p className={isBackgroundVisible ? 'error bg-visible' : 'error '}>{deleteError}</p>
      )}
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="contaier-menu">
          {menus.length ? (
            menus.map((menu, id) => (
              <div key={id} className="menu-item">
                <h3>{menu.name}</h3>
                <img src={menu.imageUrl} alt={menu.name} />
                <p>Harga : {menu.priceFormatted}</p>
                <div className="cta-button">
                  <Link to={`/detail/${menu.id}`}>
                    <button>Detail</button>
                  </Link>
                  <button onClick={() => handleDeleteMenu(menu.id)}>Delete</button>
                  <Link to={`/edit/${menu.id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1>Menu Belum Tersedia</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
