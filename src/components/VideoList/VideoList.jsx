import React, { useState, useEffect, Fragment } from "react";
import { navigate } from "gatsby";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { getRelativeVideos, getRecommendVideos } from "../../services/video";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 300,
    marginTop: "20px",
    backgroundColor: theme.palette.background.paper
  },
  fixedList: {
    backgroundColor: "#f2f2f5",
    borderRadius: "12px",
    width: "100%",
    maxWidth: 360,
    overflow: "auto",
    maxHeight: 500
  },
  fixedListVert: {
    backgroundColor: "#fff"
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    width: "100%"
  },
  listHead: {
    display: "flex",
    alignItems: "center",
    padding: "6px 0"
  },
  listHead1: {
    flexGrow: 1,
    color: "#2C2C3B"
  },
  listHeadImg: {
    height: "68px",
    width: "100px",
    borderRadius: "4px",
    marginRight: "10px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%"
    }
  },
  listItem2: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  listTitle: {
    display: "flex",
    color: "#878791",
    fontSize: "12px",
    alignItems: "center",
    marginTop: "6px"
  }
}));

function RenderRow({ item, order }) {
  const classes = useStyles();

  const handleListClick = id =>
    navigate(`/watch/?vid=${id}`, { state: { vid: id } });

  const imagePath = path => `http://api.haetek.com:9191/${path}`;

  return order ? (
    <ListItem divider button onClick={() => handleListClick(item.video_id)}>
      <div className={classes.listItem2}>
        <div className={classes.listHeadImg}>
          <img src={imagePath(item.image_path)} alt={item.video_title} />
        </div>
        <div>
          <Typography>{item.video_title}</Typography>
          <div className={classes.listTitle}>
            <PlayCircleOutlineIcon
              style={{ fontSize: "14px", marginRight: 2 }}
            />
            <span>{`${item.view_counts} 观看`}</span>
          </div>
        </div>
      </div>
    </ListItem>
  ) : (
    <ListItem button>
      <div
        className={classes.listItem}
        onClick={() => handleListClick(item.video_id)}
      >
        <PlayCircleOutlineIcon fontSize="small" style={{ margin: "0 6px" }} />
        {`${item.video_title}`}
      </div>
    </ListItem>
  );
}

export default function VideoList({ vid, type }) {
  const classes = useStyles();
  const listName = { series: "系列视频", recommend: "推荐视频" };
  const [series, setSeries] = useState([]);
  const [verticle, setVerticle] = useState(true);

  const fetchData = ({ page = 1 }) => {
    const param = {
      video_id: vid,
      related_type: type,
      max_size: 10,
      page
    };
    switch (type) {
      case "series":
        getRelativeVideos(param).then(data => setSeries(data));
        break;
      case "recommend":
        getRecommendVideos(param).then(data => setSeries(data));
        break;
      default:
        console.log("no type");
    }
  };

  useEffect(() => {
    fetchData({});
  }, [vid]);

  return series.length === 0 ? null : (
    <div className={classes.root}>
      <div className={classes.listHead}>
        <Typography className={classes.listHead1}>
          {listName[type]}{" "}
          {/* <span
                style={{ color: "#878791", fontSize: "12px" }}
                >{`1/${series.length}`}</span> */}
        </Typography>
        <IconButton size="small" onClick={() => setVerticle(false)}>
          <ListIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="small" onClick={() => setVerticle(true)}>
          <AppsIcon fontSize="inherit" />
        </IconButton>
      </div>
      <List
        className={clsx(classes.fixedList, verticle && classes.fixedListVert)}
      >
        {series.map(o => (
          <RenderRow item={o} order={verticle} key={o.video_id} />
        ))}
      </List>
      {type === "series" && (
        <div>
          <br />
          <Divider />
        </div>
      )}
    </div>
  );
}
