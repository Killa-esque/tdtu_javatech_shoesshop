// library
import React, { useRef, useEffect, memo } from "react";
import { Container } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// image
import logo from "../../assets/img/logo.png";

// css
import "../../assets/css/header.css";

// redux
import { toggleUI } from "../../redux/reducer/cardUIReducer";
import { getStore, getStoreJson } from "../../utils/config";
import { isLoggedIn, logout } from "../../auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin, userToken } = useSelector((state) => state.userReducer);
  const { totalQuantity } = useSelector((state) => state.products);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const handleToggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const handleToggleCart = () => {
    dispatch(toggleUI());
  };

  const nav__links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "All-Shoes",
      path: "/products",
    },
    {
      display: "Cart",
      path: "/cart",
    },
  ];

  useEffect(() => {
    function handleScroll() {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    localStorage.setItem('totalQuantity', totalQuantity)
  }, [totalQuantity])

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to={'/'}>
                <img src={logo} alt="logo" />
              </Link>
              <h5>Shoes Store</h5>
            </div>

            {/* ============= menu ============= */}
            <div
              className="navigation"
              ref={menuRef}
              onClick={handleToggleMenu}
            >
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((link, index) => {
                  if (link.path === '/cart' && !isLoggedIn()) {
                    return (
                      <NavLink
                        key={index}
                        to={'/login'}
                        className={(navClass) =>
                          navClass.isActive ? "active__menu" : ""
                        }
                      >
                        {link.display}
                      </NavLink>
                    )
                  }
                  return (
                    <NavLink
                      key={index}
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {link.display}
                    </NavLink>
                  )
                })}
              </div>
            </div>

            {/* ========== nav right icon ===========  */}
            <div className="nav__right d-flex align-items-center gap-4">
              <span className="cart__icon" onClick={handleToggleCart}>
                <i className="ri-shopping-basket-line"></i>
                <span className="cart__badge">{totalQuantity}</span>
              </span>
              <span className="user gap-2 d-flex align-items-center justify-content-center">
                {userLogin === null && userToken === null ? (
                  <Link to="login">
                    <h5>Login</h5>
                  </Link>
                ) : (
                  <>
                    <span style={{ cursor: 'pointer' }} className="text-white" onClick={() => { logout(); navigate('/login') }}>
                      <i className="fa fa-sign-out-alt"></i>
                    </span>
                    <span style={{ fontSize: '1rem' }}>
                      <Link to='/profile' className="text-black">
                          <h5 className="fs-6">{userLogin?.substring(0, 10) + '...'}</h5>
                      </Link>
                    </span>
                  </>
                )}
              </span>
              <span className="mobile__menu" onClick={handleToggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default memo(Header);
