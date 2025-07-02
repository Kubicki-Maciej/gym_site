import React from "react";
import SectionComponent from "../components/SectionComponent/SectionComponent";

import styled from "styled-components";
import { height } from "@mui/system";

const MainDivHomePage = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 30px;
  grid-auto-rows: min-content;
`;

export default function HomePage() {
  return (
    <MainDivHomePage>
      <SectionComponent
        gridObject={{ gridColumnStart: 1, gridColumnEnd: 4, height: "400px" }}
      />
      <SectionComponent />
      <SectionComponent />
      <SectionComponent />
    </MainDivHomePage>
  );
}
