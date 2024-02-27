import React from 'react';

import Categorie from './Categorie';

const Categories = () => {
  return (
    <section className='p-8' id='categories'>
      <div className='grid gap-2 md:grid-cols-3 mb-2'>
        <Categorie
          name='Clothes'
          image='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        />
        <Categorie
          name='Electronics'
          image='https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
        />
      </div>
      <div className='grid gap-2 md:grid-cols-2'>
        <Categorie
          name='Others'
          image='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        />
      </div>
    </section>
  );
};

export default Categories;
