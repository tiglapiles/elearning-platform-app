import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  TextField,
  RadioGroup,
  Snackbar,
  Radio,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Save,
  AccountCircle,
  CloseIcon,
  ArrowDropDown,
  ContactSupport,
  Add,
  Cancel,
} from "@material-ui/icons";
import "../../../assets/css/container.css";

import { NavTitle } from "../../Profile/ProfileChildens/components/ProfileNav";
import { get_data, get_alldata } from "../../../assets/js/request";
const userStyles = makeStyles((them) => ({
  toolbar: {
    padding: 0,
  },
  btn: {
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
    backgroundColor: "#007CFF",
    margin: "0 56px",
    "&:hover": {
      backgroundColor: "#007CFF",
    },
  },
  btn1: {
    backgroundColor: "#f2f2f5",
    color: "#878791",
    margin: 0,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  save: {
    width: 22,
    height: 22,
  },
  main: {
    padding: 40,
  },
  //   主体
  textDoc: {
    "& span:hover": {
      cursor: "pointer",
    },
  },
  snackbar: {
    top: "40%",
    transform: "translate(-50%,-50%)",
  },
  radiogroup: {
    flexDirection: "row",
  },
  root: {
    width: "100%",
    fontSize: "14px",
    "& span": {
      display: "inline-block",
    },
    "& button": {
      padding: 0,
    },
    "& b": {
      fontWeight: 400,
      display: "inline-block",
    },
    "& >div": {
      alignItems: "flex-start",
      "& .file": {
        width: "140px",
        height: "80px",
        position: "relative",
        border: "1px dashed #D5D5D5",
        overflow: "hidden",

        display: "inline-block",
        "& input": {
          width: "100%",
          height: "100%",
        },
        "& .delete": {
          position: "absolute",
          top: 0,
          right: 0,
          color: "green",
          "& :hover": {
            color: "#ccc",
          },
        },
        "& img": {
          width: "100%",
          height: "100%",
          display: "block",
        },
        "& label": {
          display: "block",
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor: "#ccc",
          color: "#fff",
          lineHeight: "80px",
          textAlign: "center",
          margin: 0,
        },
      },
    },

    "& p": {
      margin: 0,
    },

    "& .sign": {
      backgroundColor: "#F2F2F5",
      padding: "12px",
      "& .item": {
        "& label:not(.not)": {
          marginRight: 22,
          width: 70,
        },
      },
      "& label": {
        display: "inline-block",
        margin: "6px",
        minWidth: "auto",
        fontSize: "12px",
      },
    },
    "& label": {
      minWidth: "65px",
      transform: "translate(0, 1.5px) scale(1.1)",
    },
    "&  .item": {
      marginTop: 22,

      "& span": {
        position: "relative",

        "& span": {
          display: "none",
          position: "absolute",
          right: "-10px",
          bottom: 0,
          width: "397px",
          boxShadow: "0px 0px 2px 0px rgba(118,131,144,1)",
          color: "#666",
          transform: "translateY(100%)",
          zIndex: 1000,
          padding: "16px",
          backgroundColor: "#fff",
        },
      },
    },
    "& svg": {
      verticalAlign: "middle",
    },
    "& .MuiFormControlLabel-root ": {
      minWidth: "auto",
      "& .MuiRadio-root": {
        padding: 0,
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px 6px",
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "1px",
    },
    "& .MuiInputAdornment-root": {
      fontSize: "20px",
      color: "#D5D5D5",
    },
  },
}));

export default function VideoIndex(props) {
  const classes = userStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    type: "success",
    msg: "上传成功!",
  });
  const [videoTitle, setVideoTitle] = React.useState(""); //视频标题
  const [videodescription, setVideodescription] = React.useState(""); //视频描述
  const [videosign, setVideosign] = React.useState([]); //视频标签
  const [file, setFile] = React.useState(null); //文件
  const [fileSrc, setFileSrc] = React.useState(""); //图片文件的临时路径
  const [currency, setCurrency] = React.useState(""); //视频系列
  const [addseries, setAddseries] = React.useState(false); //新建系列
  const [newseries, setNewseries] = React.useState(""); //暂存新系列
  const [seriesdescription, setSeriesdescription] = React.useState(""); //系列描述
  const [signs, setSigns] = useState({}); //标签
  const [currencies, setCurrencies] = useState([]); //系列
  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };
  useEffect(() => {
    get_alldata("api/v1/gateway", [
      {
        model_name: "series",
        model_action: "get_series",
      },
      {
        model_name: "category",
        model_action: "get_category",
      },
    ]).then((res) => {
      console.log(res);
      setCurrencies(res[0].result_data);
      setSigns(res[1].result_data[0]);
    });
  }, []);

  return (
    <section style={{ height: "100vh" }} className="ma-container is-vertical">
      <header className="ma-heiader fn-size-16 fn-color-21">
        <section fixed className={classes.toolbar}>
          <Toolbar
            className={`box-between box-align-center ${classes.toolbar}`}
          >
            <Toolbar>
              <IconButton>
                <img src="../logos/Logo.png" />
              </IconButton>
              <Button className={classes.btn}>我的制作中心</Button>
              <div>使用教程</div>
            </Toolbar>
            <Toolbar>
              <Typography style={{ marginRight: 40 }}>
                <Save className={classes.save} />
              </Typography>
              <div>
                <Avatar className={classes.avatar} />
              </div>
            </Toolbar>
          </Toolbar>
        </section>
      </header>

      <main className={`ma-main bg-f9 ${classes.main}`}>
        <Container
          className={`bg-white ${classes.main} `}
          style={{ height: "100%" }}
        >
          <nav>
            <NavTitle list={["上传视频"]} props={this} />
          </nav>
          <main>
            <form id="updata_info" className={classes.root}>
              <div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span> 标题
                </label>
                <TextField
                  required
                  id="standard-required"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    console.log(event.target.value);
                    setVideoTitle(event.target.value);
                  }}
                />
                <span className="fn-color-F86B6B">
                  <ContactSupport />
                  <span>
                    一个引人注目的标题可以帮助您吸引观看者。在确定视频标
                    <br />
                    题时，最好加入观众在查找类似视频时可能会使用的关键
                    <br />
                    字。
                  </span>
                </span>
              </div>
              <div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span> 描述
                </label>
                <TextField
                  required
                  id="standard-required"
                  rows={5}
                  variant="outlined"
                  multiline
                  fullWidth
                  onChange={(event) => {
                    setVideodescription(event.target.value);
                  }}
                />
                <span className="fn-color-F86B6B">
                  <ContactSupport />
                  <span>
                    在说明中加入适当的关键字，可以帮助观看者通过搜索更轻
                    <br />
                    松地找到您的视频。您可以在说明中大致介绍视频的内容，
                    <br />
                    并将关键字放在说明的开头部
                  </span>
                </span>
              </div>

              <div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span>添加标签
                </label>
                <p className="sign">
                  {Object.keys(signs).map((value, inx) => (
                    <label key={value}>
                      <input
                        type="checkbox"
                        name="videoSign"
                        value={value}
                        onChange={(event) => {
                          if (event.target.checked) {
                            if (videosign.length > 2) {
                              event.target.checked = false;
                              setOpenSnackbar({
                                open: true,
                                type: "error",
                                msg: "最多只能选择3个标签哦!",
                              });
                              return;
                            }
                          }
                          let v_arr = [];

                          let obj_arr = document.querySelectorAll(
                            'input[name="videoSign"]'
                          );
                          for (let i = 0; i < obj_arr.length; i++) {
                            if (obj_arr[i].checked) {
                              v_arr.push(obj_arr[i].value);
                            }
                          }

                          if (v_arr.length > 0) {
                            setVideosign(v_arr);
                          } else {
                            setVideosign([]);
                          }
                        }}
                      />
                      <b>{signs[value]}</b>
                    </label>
                  ))}
                </p>
                <span className="fn-color-F86B6B">
                  <ContactSupport />
                  <span>
                    添加适当的标签，可以帮助观看者通过搜索更轻松地找到您的视频。
                  </span>
                </span>
              </div>
              <div className="box">
                <label>视频封面</label>
                <section>
                  <p>
                    选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
                  </p>
                  <div className="item">
                    <div className="file">
                      <input type="file" name="file" id="coverfile" />
                      <label
                        htmlFor="coverfile"
                        className="all-width all-height"
                      >
                        <Add />
                      </label>
                    </div>
                  </div>
                </section>
              </div>

              <div className="box">
                <label>系列视频</label>
                <section style={{ width: "100%" }}>
                  <p>
                    将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
                  </p>
                  <section className="item">
                    {!addseries ? (
                      <section className="sign">
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ margin: "0 0 12px 0" }}
                          onClick={() => {
                            setAddseries(true);
                            return false;
                          }}
                        >
                          <Add />
                          新建
                        </Button>
                        <div className="line"></div>
                        <section>
                          {currencies.map((option) => (
                            <label key={option.title}>
                              <input
                                type="radio"
                                name="gender1"
                                value={option.title}
                              />
                              {option.title}
                            </label>
                          ))}
                        </section>
                      </section>
                    ) : (
                      <section className="all-width sign">
                        <div className="box all-width item">
                          <label>
                            <span className="fn-color-F86B6B">*</span>系列标题
                          </label>
                          <div className="all-width">
                            <TextField
                              fullWidth
                              type="text"
                              variant="outlined"
                              value={newseries}
                              onChange={(e) => {
                                setNewseries(e.target.value);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Cancel
                                      onClick={() => {
                                        setNewseries("");
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="box all-width item">
                          <label>系列描述</label>
                          <div className="all-width">
                            <TextField
                              rows={2}
                              variant="outlined"
                              multiline
                              fullWidth
                              value={seriesdescription}
                              onChange={(event) => {
                                setSeriesdescription(event.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="box item">
                          <label>系列封面</label>
                          <div>
                            <p>
                              将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
                            </p>
                            <div className="file item">
                              <input type="file" name="file" id="e" />
                              <label
                                htmlFor="se"
                                className="all-width all-height not"
                              >
                                <Add />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="box box-end">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setAddseries(false);
                              return false;
                            }}
                          >
                            取消
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              let _data = currencies;
                              if (
                                _data.some(
                                  (option) => newseries == option.title
                                )
                              ) {
                                setOpenSnackbar({
                                  open: true,
                                  type: "error",
                                  msg: "新建系列失败，您所新建的系列已存在!",
                                });
                                return;
                              }
                              if (!seriesdescription) {
                                setOpenSnackbar({
                                  open: true,
                                  type: "error",
                                  msg:
                                    "亲，新建了系列，系列描述不要忘记填写哦!",
                                });
                                return;
                              }
                              if (_data[_data.length - 1].type) {
                                _data[_data.length - 1] = {
                                  title: newseries,
                                  label: newseries,
                                  type: "new",
                                };
                              } else {
                                _data.push({
                                  title: newseries,
                                  label: newseries,
                                  type: "new",
                                });
                              }

                              setCurrencies(_data);
                              setAddseries(false);
                              return false;
                            }}
                          >
                            确认
                          </Button>
                        </div>
                      </section>
                    )}
                  </section>
                </section>
              </div>
              <div className="box item">
                <label>上传附件：</label>
                <div>
                  <p>python和pytorch的常用命令.doc</p>
                  <div className={classes.textDoc}>
                    <span
                      className="fn-color-007CFF"
                      onClick={() => {
                        document.getElementById("text-doc").click();
                      }}
                    >
                      +点击上传课件
                    </span>
                    <input
                      type="file"
                      id="text-doc"
                      style={{ width: 0, height: 0 }}
                    />
                  </div>
                </div>
              </div>

              <div className="box-center">
                <Button className={`${classes.btn} ${classes.btn1}`}>
                  返回
                </Button>
                <Button className={classes.btn}>提交</Button>
                <Button className={`${classes.btn} ${classes.btn1}`}>
                  取消
                </Button>
              </div>
            </form>
          </main>
        </Container>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
      >
        <Alert onClose={snackbarClose} severity={openSnackbar.type}>
          {openSnackbar.msg}
        </Alert>
      </Snackbar>
    </section>
  );
}
