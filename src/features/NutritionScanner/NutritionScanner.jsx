import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

export default function NutritionScanner() {
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [nutrition, setNutrition] = useState(null);

  const extractNutrition = text => {
    const find = regex => {
      const match = text.match(regex);
      return match ? match[1].replace(",", ".") : null;
    };

    return {
      energia:
        find(/(?:energia|wartość energetyczna)[^\d]*(\d+[.,]?\d*)/i) ??
        find(/(\d+[.,]?\d*)\s*kcal/i),

      tluszcz: find(/tłuszcz[^\d]*(\d+[.,]?\d*)/i),

      weglowodany: find(/węglowodany[^\d]*(\d+[.,]?\d*)/i),

      bialko: find(/białko[^\d]*(\d+[.,]?\d*)/i),

      sol: find(/sól[^\d]*(\d+[.,]?\d*)/i),
    };
  };

  const scan = async () => {
    try {
      setLoading(true);

      const imageSrc = webcamRef.current.getScreenshot();

      const result = await Tesseract.recognize(imageSrc, "pol+eng", {
        logger: m => {
          if (m.status === "recognizing text") {
            console.log(`${Math.round(m.progress * 100)}%`);
          }
        },
      });

      const text = result.data.text;

      setRawText(text);
      setNutrition(extractNutrition(text));
    } catch (err) {
      console.error(err);
      alert("Nie udało się odczytać tekstu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: 20,
      }}
    >
      <h2>Skaner wartości odżywczych</h2>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
        style={{
          width: "100%",
          borderRadius: 12,
        }}
      />

      <button
        onClick={scan}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "12px 20px",
        }}
      >
        {loading ? "Odczytywanie..." : "Zeskanuj"}
      </button>

      {nutrition && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px solid #ddd",
          }}
        >
          <h3>Wykryte wartości</h3>

          <p>🔥 Energia: {nutrition.energia || "-"}</p>

          <p>🧈 Tłuszcz: {nutrition.tluszcz || "-"} g</p>

          <p>🍞 Węglowodany: {nutrition.weglowodany || "-"} g</p>

          <p>🥩 Białko: {nutrition.bialko || "-"} g</p>

          <p>🧂 Sól: {nutrition.sol || "-"} g</p>
        </div>
      )}

      {rawText && (
        <>
          <h3>Surowy OCR</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#eee",
              padding: 12,
            }}
          >
            {rawText}
          </pre>
        </>
      )}
    </div>
  );
}
