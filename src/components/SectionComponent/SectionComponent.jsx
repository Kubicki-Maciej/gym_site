import React from "react";
import styled from "styled-components";

const MainDivCom = styled.div`
  display: flex;
  background-color: #e3faff;
  border-radius: 15px;
  height: 300px;
`;

const ShadowDiv = styled.div`
  position: relative;
  height: 80px;
  width: 80px;
  top: 0;
  left: 0;
  background-color: #282828;
  border-radius: 40px;
  clip-path: polygon(99% 33%, 64% 32%, 62% 0%, 0% 1%, 0% 98%, 100% 100%);
`;

export default function SectionComponent({ gridObject }) {
  return (
    <MainDivCom style={gridObject}>
      {/* <ShadowDiv /> */}
      ectionComponent
    </MainDivCom>
  );
}
