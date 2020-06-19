import React from "react";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  Delete,
} from "@material-ui/icons";
import img3 from "../../../../assets/img/img3.png";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
// import MenuItem from '@material-ui/core/MenuItem';
import { get_date } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import { ModalDialog } from "./Modal";
import Modal from "../../../../assets/js/modal";
// 系列横向item
console.log(Modal);
const stop_run = (prevValue, nextValue) => {
  // return prevValue.series===nextValue.series
};

const SeriesItem = (props) => {
  // inx,onEvent,info,parent,series
  // console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modalMsg, setModalMsg] = React.useState({
    open: false,
    type: 1,
    msg: "",
    title: "",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="box all-height box-between box-align-center profile-top">
      <div className="box all-height fn-size-12" style={{ maxWidth: "832px" }}>
        <div
          style={{
            width: 257,
            height: 164,
            marginRight: 20,
            position: "relative",
          }}
        >
          <img
            src={props.info ? props.info.image_path : ""}
            className="all-height all-width"
          />

          <p className="profile-time fn-color-white fn-size-12">
            {!props.series && props.info
              ? props.info.video_time
              : props.info && props.info.video_data
              ? "共" + props.info.video_data.length + "集"
              : ""}
          </p>
        </div>
        <div>
          <p className="fn-color-2C2C3B fn-size-16 zero-edges">
            {props.info ? props.info.title || props.info.series_title : "标题"}
          </p>
          <p className="fn-color-878791 ">
            {props.info ? get_date(props.info.update_time, ".", 1) : ""}
          </p>
          {props.series ? (
            <div>
              <p>{props.info ? props.info.description : ""}</p>
              <div className="fn-color-565663 profile-point">
                <span>
                  <Details />
                  &nbsp;&nbsp;
                  {props.info ? props.info.view_counts : 0}
                </span>
                <span>
                  <FavoriteBorder />
                  &nbsp;&nbsp;
                  {(props.info && props.info.like_counts) || 0}
                </span>
                <span>
                  <ChatBubbleOutlineOutlined />
                  &nbsp;&nbsp;
                  {(props.info && props.info.comment_counts) || 0}
                </span>
              </div>
            </div>
          ) : (
            <div>
              {props.info && props.info.state == -1 ? (
                <div>
                  <p></p>
                  <p className="fn-color-878791 ">未通过</p>
                </div>
              ) : (
                <div>
                  {props.info && props.info.state == 1 ? (
                    <div>
                      <p></p>
                      <p className="fn-color-007CFF">审核中</p>
                    </div>
                  ) : (
                    <div>
                      {props.info && props.info.state >= 2 ? (
                        <div>
                          <p className="fn-color-878791">已通过</p>
                          <div className="fn-color-565663 profile-point">
                            <span>
                              <Details />
                              &nbsp;&nbsp;
                              {props.info ? props.info.view_counts : 0}
                            </span>
                            <span>
                              <FavoriteBorder />
                              &nbsp;&nbsp;
                              {(props.info && props.info.like_counts) || 0}
                            </span>
                            <span>
                              <ChatBubbleOutlineOutlined />
                              &nbsp;&nbsp;
                              {(props.info && props.info.comment_counts) || 0}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {props.series ? (
          <div>
            <IconButton
              aria-label="more"
              aria-controls="series-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizOutlined />
            </IconButton>

            <Menu
              open={open}
              anchorEl={anchorEl}
              keepMounted
              id="series-menu"
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>编辑系列</MenuItem>
              <MenuItem onClick={handleClose}>移动系列</MenuItem>
              <MenuItem onClick={handleClose}>分享</MenuItem>
              <MenuItem
                onClick={() => {
                  setModalMsg({
                    title: "温馨提示",
                    type: "del",
                    msg: "确定要删除么，删除后无法恢复哦",
                    open: true,
                  });
                  handleClose();
                }}
              >
                删除
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <span>
            {props.info && props.info.state != 1 ? (
              <Delete
                onClick={() => {
                  let _data = {
                    model_name: "video",
                    model_action: "delete_video",
                    extra_data: {
                      video_id: [props.info.video_id],
                    },
                  };

                  // get_data('/api/v1/gateway',_data).then({//请求
                  let _works = JSON.parse(
                    JSON.stringify(props.parent.state.userWorks)
                  );
                  let _newWorks = [];
                  _works.forEach((o, inx) => {
                    if (props.inx != inx) {
                      _newWorks.push(o);
                    }
                  });
                  props.parent.setState({
                    userWorks: _newWorks,
                  });
                  // })
                }}
              />
            ) : (
              ""
            )}
          </span>
        )}
      </div>
      <ModalDialog
        info={modalMsg}
        parent={props}
        onEvent={(msg) => {
          if (msg.cancel) {
            setModalMsg({ open: false });
          }
          if (msg.confirm) {
            get_data("api/v1/gateway", {
              model_name: "video",
              model_action: "delete_video",
              extra_data: {
                video_id: [props.info.video_id],
              },
            }).then((res) => {
              if (res.err === 0) {
                new Modal().aleat("删除成功", "success", 5000);
              }
            });
          }
        }}
      ></ModalDialog>
    </div>
  );
};
export default React.memo(SeriesItem, stop_run);
