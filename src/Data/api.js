import React, { useEffect } from "react";
import config from "../Data/config";

const Api = ({ resultStore, setResultReceived, resultReceived }) => {
  const url = config.url;

  console.log(url);

  const dataSend = [
    {
      result: resultStore,
    },
  ];

  useEffect(() => {
    fetch(
      "https://sheet.best/api/sheets/24c59569-1bfe-406f-a8a3-5366e56fba37",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      }
    )
      .then((r) => r.json())
      .then((dataSend) => {
        // The response comes here
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });
  }, [resultStore]);

  

  fetch("https://sheet.best/api/sheets/24c59569-1bfe-406f-a8a3-5366e56fba37")
    .then((response) => response.json())
    .then((data) => {
      setResultReceived(data);
      console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });

    console.log(resultReceived)

  return (
    <>
    
    </>
  );
};

export default Api;
