import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchCard from "./SearchCard";
import SearchLoading from "../Loading/SearchLoading";
import Pagination from "../Pagination/Pagination";
import { searchGlobal } from "../../services/home";
import EmptyNotice from "../EmptyNotice/EmptyNotice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 35,
  },
  ul: {
    listStyleType: "none",
    "& > li": {
      display: "inline-block",
      marginRight: 10,
    },
  },
  searchResult: {
    minHeight: "60vh",
  },
  buttonGrounp: {
    padding: "8px 0",
    "& button": {
      borderRadius: "20px",
      padding: "4px 8px",
      "&:not(:last-child)": {
        marginRight: "20px",
      },
    },
    "& button.action": {
      backgroundColor: "#007cff",
      color: "#fff",
    },
  },
}));

export default function Search({ input }) {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchSearchResult = ({ page = 1 }, callback = () => ({})) => {
    setLoading(true);
    searchGlobal({
      query_string: input,
      video_ids: [],
      max_size: 16,
      type,
      page,
    }).then((data) => {
      const sd = (d) => d.slice((page - 1) * 16, (page - 1) * 16 + 16);
      setResult(sd(data));
      setLoading(false);
      callback(sd(data));
    });
  };

  const handleTypeClick = (cate) => {
    setType(cate);
  };

  useEffect(() => {
    if (input) {
      fetchSearchResult({});
    }
  }, [input, type]);

  const iterateItems = (arr = []) => {
    // iterate there
    return arr.slice(0, 16).map((o, i) => <SearchCard card={o} key={i} />);
  };

  return (
    <div className={classes.root}>
      <div style={{ height: 40 }} />
      <Divider />
      <Box className={classes.buttonGrounp}>
        <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部
        </Button>
        <Button
          size="small"
          className={`${type === "video" && "action"}`}
          onClick={() => handleTypeClick("video")}
        >
          单个视频
        </Button>
        <Button
          size="small"
          className={`${type === "series" && "action"}`}
          onClick={() => handleTypeClick("series")}
        >
          系列视频
        </Button>
        <Button
          size="small"
          className={`${type === "user" && "action"}`}
          onClick={() => handleTypeClick("user")}
        >
          用户
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          课件
        </Button>
      </Box>
      <Divider />
      <br />
      <div className={classes.searchResult}>
        {iterateItems(result)}
        {!result.length && !loading && <EmptyNotice />}
      </div>
      <br />
      <Pagination fetch={fetchSearchResult} method="total" />
      <SearchLoading loading={loading} />
    </div>
  );
}
