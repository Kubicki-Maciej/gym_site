import React from "react";

function ImgArticle({ imageUrl }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        // minHeight:"400px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={imageUrl}
        alt="Article Image"
        style={{ maxWidth: "100%" }}
      ></img>
    </div>
  );
}

export default ImgArticle;
