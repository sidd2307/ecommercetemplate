import React from "react";
import styled from "styled-components";

// responsiveness
import { mobile } from "../Responsive";

// data
import { categories } from "../data";

// components
import CategoryItem from "./CategoryItem";

// styled components
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column", paddingTop: 10 })}
`;

export default function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
}
