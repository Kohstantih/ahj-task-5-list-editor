import ProductList from './ProductList';

const containerList = document.querySelector('.container-list');

const productList = new ProductList(containerList);
productList.activation();
