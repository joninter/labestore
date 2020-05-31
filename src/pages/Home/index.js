import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdShoppingBasket, MdSearch } from "react-icons/md";
import { formatPrice } from "../../util/format";
import { Container, Cart, ProductList, Search, Filters } from "./styles";

import logo from "../../assets/images/logo.png";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 0,
      title: "Tênis Olympikus Breed 2",
      price: 89.99,
      image:
        "https://static.netshoes.com.br/produtos/tenis-olympikus-breed-2/02/D22-3195-002/D22-3195-002_zoom1.jpg?ts=1571247200&ims=326x",
      amount: 0,
    },
    {
      id: 1,
      title: "Tênis Nike Revolution 5",
      price: 229.99,
      image:
        "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-masculino/26/HZM-1731-026/HZM-1731-026_zoom1.jpg?ts=1571078789&ims=326x",
      amount: 0,
    },
    {
      id: 3,
      title: "Tênis Nike Revolution 5",
      price: 229.99,
      image:
        "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-masculino/26/HZM-1731-026/HZM-1731-026_zoom1.jpg?ts=1571078789&ims=326x",
      amount: 0,
    },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [valueMin, setValueMin] = useState(1);
  const [valueMax, setValueMax] = useState(90000);
  const [order, setOrder] = useState(false);
  const storage = localStorage.getItem("carrinho");

  useEffect(() => {
    if (storage) {
      setProducts(...products, JSON.parse(storage));
    }
    const data = products.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    setProducts(data);
    console.log(products);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const SearchInsensitive = new RegExp(search, "gi");

  function handleAddProduct(id) {
    const productIndex = products.findIndex((p) => p.id === id);

    const findProduct = cartItems.findIndex((p) => p.id === id);

    if (findProduct !== -1) {
      cartItems[findProduct].amount += 1;
      setCartItems([...cartItems]);
      localStorage.setItem("carrinho", JSON.stringify(cartItems));
    } else {
      products[productIndex].amount += 1;
      setCartItems([...cartItems, products[productIndex]]);
      localStorage.setItem("carrinho", JSON.stringify(cartItems));
    }
  }

  function hadleSearchProducts(e) {
    setSearch(e.target.value);
  }

  function hadleValueMinimum(e) {
    setValueMin(Number(e.target.value));
  }

  function hadleValueMaximum(e) {
    setValueMax(Number(e.target.value));
  }

  function orderProducts() {
    if (order) {
      let order = [...products].sort((a, b) => a.price - b.price);
      setProducts(order);
      setOrder(false);
    } else {
      let order = [...products].sort((a, b) => b.price - a.price);
      setProducts(order);
      setOrder(true);
    }
  }
  return (
    <>
      {/* <Header items={cartItems} />; */}
      <Container>
        <Link to="/">
          <img src={logo} alt="LabeStore" />
        </Link>
        <input
          onChange={hadleSearchProducts}
          placeholder="Pesquise seu produto"
        />
        <Search>
          <MdSearch size={20} color="#13abe1" />
        </Search>

        <Cart to="/cart" items={cartItems}>
          <div>
            <strong>Meu carrinho</strong>

            <span>{cartItems.length} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </Container>

      <Filters>
        <label>Valor mínimo</label>
        <input onChange={hadleValueMinimum} type="number" min={0} />
        <label>Valor máximo</label>
        <input onChange={hadleValueMaximum} type="number" />
        <label>Ordenar Preço</label>
        <select onChange={orderProducts}>
          <option>Menor Valor</option>
          <option>Maior Valor</option>
        </select>
      </Filters>

      <ProductList>
        {products.map((product) => {
          if (
            product.title.match(SearchInsensitive) &&
            product.price > valueMin &&
            product.price < valueMax
          ) {
            return (
              <li key={product.id}>
                <img src={product.image} alt={product.title} />
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
                <button
                  type="button"
                  onClick={() => handleAddProduct(product.id)}
                >
                  <div>
                    <MdAddShoppingCart size={16} color="#fff" />
                    {product.amount}
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </li>
            );
          } else {
            return console.log();
          }
        })}
      </ProductList>
    </>
  );
}
