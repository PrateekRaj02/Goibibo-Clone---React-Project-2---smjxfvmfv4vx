import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Train_Card from "./Train_Card";
import { useSelector } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import GlobalLoader from "../loder/GlobalLoader";

const Train_Search_Page = () => {
  const [trains, setTrains] = useState([]);
  const from = useSelector((store) => store.train.from);
  const to = useSelector((store) => store.train.to);
  const day = useSelector((store) => store.train.day);
  const departureDate=useSelector((store)=>store.train.departureDate);
  const [availablityBoxId, setAvailablityBoxId] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(true);

  const getTrainData = async () => {
    const apiUrl =
      baseUrl +
      `train?search={"source":"${from}","destination":"${to}"}&day=${day}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if (response.ok) {
      setTrains(jsonData.data.trains);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainData();
  }, []);

  return loading ? <GlobalLoader/> : (
    <div>
      <div>
        {trains.slice(
                  10 * (page - 1),
                  Math.min(10 * page, trains.length)
                ).map((train) => {
          return (
            <Train_Card
              key={train._id}
              train={train}
              departureDate={departureDate}
              availablityBoxId={availablityBoxId}
              setAvailablityBoxId={setAvailablityBoxId}
            />
          );
        })}
      </div>

      <Pagination
        color="secondary"
        sx={{
          alignSelf: "center",
          m: 2,
          mx: "auto",
          width: "fit-content",
        }}
        page={page}
        onChange={(e, p) => setPage(p)}
        count={Math.ceil(trains.length / 10)}
        shape="rounded"
      />
    </div>
  );
};

export default Train_Search_Page;
