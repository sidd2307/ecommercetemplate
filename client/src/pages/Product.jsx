import React, { useEffect, useState } from "react";
import styled from "styled-components";

// responsiveness
import { mobile } from "../Responsive";

// components
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

// axios component import
import { publicRequest } from "../requestMethods";

// Material ui components
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// packages import
import { useLocation } from "react-router-dom";

// redux imports
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

// styled components
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  cursor: pointer;
  ${mobile({ height: "50vh", objectFit: "cover", marginTop: "10px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px", textAlign: "center" })}
`;

const Title = styled.h1`
  /* font-weight: 200; */
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    width: 50px;
    height: 50px;
  }
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 20px;
  border-radius: 10px;
  font-weight: 500;

  &:hover {
    background-color: #28b8b8;
    color: white;
  }
`;

export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    // update our cart
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Announcement />
      <NavBar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs. {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <DeleteIcon
                onClick={() => handleQuantity("dec")}
                style={{ fontSize: 30, cursor: "pointer", marginRight: 7 }}
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                onClick={() => handleQuantity("inc")}
                style={{ fontSize: 30, cursor: "pointer", marginRight: 7 }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
}
