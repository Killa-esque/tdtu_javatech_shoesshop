import React, { useState } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import CommonSection from '../../../components/Common Section/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { productsFake } from '../../../assets/data/products'
import ReactPaginate from 'react-paginate'
import ProductCard from '../../../components/ProductCard/ProductCard'
import "../../../assets/css/search.css";
import "../../../assets/css/pagination.css";
import { productService } from '../../../service/productService'
import { message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAction } from '../../../redux/reducer/productReducer'

const Products = () => {
  const { totalAmount, productCart } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(products);
  const [pageNumber, setPageNumber] = useState(0);
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const productPerPage = 10;

  const getAllProducts = () => {
    productService.getProductList()
      .then(res => {
        setProducts(res.data)
        setSearch(res.data)
        dispatch(getAllProductsAction(res.data))
        localStorage.setItem('productList', JSON.stringify(res.data))
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  }

  const getAllBrands = () => {
    productService.getBrandList()
      .then(res => {
        setBrands(res.data)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  }

  const getAllCategories = () => {
    productService.getCategoryList()
      .then(res => {
        setCategories(res.data)
        // console.log(brands)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  }

  // const getAllFilterOptions = () => {
  //   Promise.all([
  //     productService.getBrandList(),
  //     productService.getCategoryList(),
  //   ])
  //     .then(([brandList, categoryList]) => {
  //       setBrands(brandList.data);
  //       setCategories(categoryList.data);
  //     })
  //     .catch(err => {
  //       message.open("Get data failed !!!")
  //       console.log(err)
  //     })
  // }


  const handleGetProductByBrands = (id) => {
    productService.getProductByBrands(id)
      .then(res => {
        // console.log(res)
        setProducts(res.data)
        setSearch(res.data)

      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  };

  const handleGetProductByCategories = (id) => {
    productService.getProductByCategories(id)
      .then(res => {
        setProducts(res.data)
        setSearch(res.data)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (brands.some(brand => brand.id === parseInt(value))) {
      handleGetProductByBrands(value);
    } else if (categories.some(category => category.id === parseInt(value))) {
      handleGetProductByCategories(value);
    } else {
      getAllProducts();
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    // console.log(value)
    const searchedProducts = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearch(searchedProducts);
  };

  const vistedPage = pageNumber * productPerPage;
  const displayPage = search.slice(
    vistedPage,
    vistedPage + productPerPage
  );
  const pageCount = Math.ceil(search.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  useEffect(() => {
    getAllProducts()
    getAllBrands()
    getAllCategories()
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('productCart', JSON.stringify(productCart))
  //   localStorage.setItem('totalAmount', totalAmount)
  // }, [productCart, totalAmount])

  return (
    <Helmet title={'Shops'}>
      <CommonSection title={'All products'} />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="search__widget d-flex align-items-center justify-content-between w-50">
                <input
                  onChange={handleSearch}
                  type="text"
                  placeholder="I'm looking for...."
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" className="mb-5">
              <div className="sorting__widget text-end">
                <select onChange={handleSelectChange}>
                  <option value={'all'}>Default</option>
                  <option disabled>--Brands--</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                  <option disabled>--Categories--</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>


            {products.length !== 0 ? (
              <>
                {displayPage.map((product, index) => {
                  return (
                    <Col
                      key={index}
                      lg="3"
                      md="4"
                      sm="6"
                      xs="6"
                      className="mb-4"
                    >
                      <ProductCard product={product} idProd={product.id} />
                    </Col>
                  );
                })}
              </>
            ) : (
              <h5 className='p-5 text-center'>No product founded!!</h5>
            )}

            {products.length !== 0 ? (
              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel="Prev"
                  nextLabel="Next"
                  containerClassName="paginationBtns"
                />
              </div>
            ) : <div>
              <ReactPaginate
                className='d-none'
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel="Prev"
                nextLabel="Next"
                containerClassName="paginationBtns"
              />
            </div>}

          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Products
