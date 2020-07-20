import React from "react";
import Typography from "@material-ui/core/Typography";
import SearchCard from "../Search/SearchCard";
import ProgressBar from "../Loading/ProgressBar";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import HeadCard from "./HeadCard";
import Pagination from "./SePagination";
import SeriesBar from "./SeriesBar";
import withSeries from "./withSeries";
import { getSeriesInfo } from "../../services/home";

const AllSeries = ({
  seriesInfo,
  type,
  handleSearchClick,
  handleTypeClick,
  handleInput,
  series,
  loading,
  seriesLength,
  handlePage,
}) => {
  return (
    <div className="series-component">
      <br />
      <br />
      <Typography>
        <span style={{ color: "#007cff" }}>{seriesInfo.title}</span>
        {` 系列课的详细信息`}
      </Typography>
      <br />

      <HeadCard info={seriesInfo} />
      <br />
      <br />

      <SeriesBar
        type={type}
        handleSearchClick={handleSearchClick}
        handleTypeClick={handleTypeClick}
        handleInput={handleInput}
      />

      <br />
      <div style={{ minHeight: "60vh" }}>
        {series.map((o, i) => {
          return <SearchCard card={o} key={i} />;
        })}
        <EmptyNotice empty={!series.length && !loading} />
      </div>

      <Pagination num={seriesLength} handlePage={handlePage} />
      <br />

      <ProgressBar loading={loading} />
    </div>
  );
};

export default withSeries(AllSeries, ({ sid }) =>
  getSeriesInfo({ series_id: sid })
);
