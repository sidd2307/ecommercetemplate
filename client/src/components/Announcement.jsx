import React from "react";
import styled from "styled-components";

// styled components
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  position: fixed;
  width: 100%;
  z-index: 3;
`;

export default function Announcement() {
  return <Container><marquee direction="left">Super Deal! Free Shipping on Orders over $50</marquee></Container>;
}
