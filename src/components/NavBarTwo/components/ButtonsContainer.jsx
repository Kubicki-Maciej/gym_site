import React from "react";
import NavbarTwoButtons from "./NavbarTwoButtons";
import weight from "../../Icons/weight.png"
import ruler from "../../Icons/ruler.png"
import schedule from "../../Icons/schedule.png"

export default function ButtonsContainer() {
  return (
    <div
      className="buttonContainerNavbarTwo"
      // style={{
      //   position: "relative",
      //   marginLeft: "27%",
      //   marginRight: "27%",
      //   borderRadius:" 5px 5px 5px 5px",
      //   zIndex: "10",
      //   top: "-200px",
      //   backgroundColor: "white",
      //   height: "100px",
      //   display: "flex",
      //   flexDirection: "row",
      //   justifyContent: "space-around",
      //   boxShadow:" 13px 13px 42px -2px rgba(255, 0, 0, 1)"
      // }}
    >
      <NavbarTwoButtons name={"EXERCISE"} icon={weight} srcPath={'/exercise'}/>
      <NavbarTwoButtons name={"PROGRESS"} icon={ruler} />
      <NavbarTwoButtons name={"SCHEDULE"} icon={schedule} />
    </div>
  );
}
