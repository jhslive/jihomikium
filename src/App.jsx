import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("카나리아바이오");
  const [askPrice, setaskPrice] = useState("1000"); 
  const [bidPrice, setbidPrice] = useState("1100");
  const [maxPrice, setmaxPrice] = useState("100000");
  const [isLong, setIsLong] = useState(true); //eslint-disable-line no-unused-vars
  const [leverage, setLeverage] = useState(1); //eslint-disable-line no-unused-vars
  const [result, setResult] = useState(
      (((((((maxPrice/askPrice)-(maxPrice/askPrice)*0.0005)*bidPrice) -(maxPrice/askPrice)*bidPrice*0.0005) / askPrice) - 1) * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  useEffect(() => {
    const calculated = (
      (bidPrice / askPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [askPrice, bidPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      askPrice +
      "-" +
      bidPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <br />
      <br />
      <span>
        총자산 &nbsp;
        <input
          value={maxPrice}
          onChange={(e) => setmaxPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={bidPrice}
          onChange={(e) => setbidPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매수금액 &nbsp;
        <input
          value={askPrice}
          onChange={(e) => setaskPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "292px",
          width: "1080px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "186px",
              fontSize:"40px",
              color: "rgb(51,51,51)",
              fontFamily: "Pretendard",
              fontWeight: "600",

            }}
          >
            {coin}
          </div>
          <div
            style={{
              position: "absolute",
              right: "318px",
              top: "194px",
              fontSize: "40px",
              color: "rgb(205,53,110)",
              fontFamily: "NanumBarunGothic",
              fontWeight: "500",

            }}
          >
            +{(Number((bidPrice*(maxPrice/askPrice))-((askPrice*0.015)+(bidPrice*0.015)+((bidPrice * (maxPrice/askPrice))*0.003))-maxPrice).toFixed(0)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                right: "26px",
                top: "194px",
                fontSize: "40px",
                color: "rgb(205,53,110)",
                fontFamily: "NanumBarunGothic",
                fontWeight: "500",

              }}
            >
              +{result}%

            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
