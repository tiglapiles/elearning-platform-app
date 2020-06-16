import React, { Component } from "react";
import styles from "./Header.module.css";
import { navigate } from "@reach/router";

import {
  Button,
  Avatar,
  Snackbar,

} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
import { get_data } from "../../../assets/js/request";
import { getUser } from "../../../services/auth";

import Modal from "../../../assets/js/modal";
import Home from "../../../assets/img/Home.svg";
import Code from "../../../assets/img/Code.svg";
// import Logo from '../../../assets/img/Logo.png';
// import { Home, Subtitles } from "@material-ui/icons";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const NewBtn = withStyles({
  root: {
    backgroundColor: "#2E2E30",
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
  },
})(Button);

const NewBtn2 = withStyles({
  root: {
    backgroundColor: "#007CFF",
  },
})(NewBtn);

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_updata: false,
      open: false,
      files: props.parent.state.video_data,
    };
    this.btn_user = this.btn_user.bind(this);
  }
  componentWillMount() {
    if (getUser().name) {
      this.setState({
        user_info: getUser(),
      });
    } else {
      navigate("/users/login");
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     JSON.stringify(nextProps.parent.state.video_data) !=
  //     JSON.stringify(nextState.files)
  //   ) {
  //     return true;
  //   }
  // }

  btn_user = function(info) {
    if (!getUser().name) {
      sessionStorage.setItem("no_login_page", window.location.href);

      navigate(`/users/login`);
    } else {
      sessionStorage.removeItem("now_page");
      navigate(`/users/profile`);
    }
  };

  render() {
    let _this = this;

    const handleClose = () => {
      this.setState({ open: false });
    };

    const btn_save = function(el) {
      // "Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,  0,100,100, 0, 0,1,1,0,2,10,10,10,0";
      //Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding

      let _video_data = _this.props.parent.state.video_data;
      // if (JSON.stringify(_video_data) === "{}") {
      //   return;
      // }

      // let _styles = _this.props.parent.state.style;
      // if (JSON.stringify(_styles) == "{}") {
      //   return;
      // }
      // let bold = _styles.bold,
      //   i = _styles._i,
      //   u = _styles._u,
      //   fontName = _styles.family,
      //   color = _styles.color ? "&H" + _styles.color.substring(1) : "",
      //   size = parseInt(_styles.size),
      //   spacing = _styles.spacing,
      //   name = "MD",
      //   line = _styles.line,
      //   alignment = _styles.align > 3 ? 0 : _styles.align;
      // console.log(_styles);
      // let style = 'Style:Default,Arial,'+_styles.fontSize+',&H'+_styles.color.substring(1)+',&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0\n'
      // let style =
      //   "Style:" +
      //   name +
      //   "," +
      //   fontName +
      //   "," +
      //   size +
      //   "," +
      //   color +
      //   ",&Hffffff,&H0,&H0," +
      //   bold +
      //   "," +
      //   i +
      //   "," +
      //   u +
      //   ",0,100,100," +
      //   spacing +
      //   ",0,1,1,0," +
      //   alignment +
      //   ",10,10,10,0";
      let r_data = {
        model_name: "video",
        model_action: "update_subtitle",
        extra_data: {
          subtitling: _video_data.sub_josn,
          task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
          // style: style,//暂时屏蔽
          lang: "en",
        },
        model_type: "",
      };
      get_data("api/v1/gateway", r_data, "post").then((res) => {
        console.log(res);
        if(res.err==0&&res.errmsg=='OK'){
          _this.setState({ open: true });
          setTimeout(()=>{ navigate("/video/uppage");},3000)
        }
      });
    };
    // console.log(this.props);
    return (
      <header className={`box box-align-center ${styles.header}`}>
        <div className={`box box-align-center ${styles.nav}`}>
          <div className={styles.logo}>
            <img src="../logos/Logo.png" />
          </div>
          <div
            className="fn-size-16 "
            onClick={() => {
              navigate(`/`);
            }}
          >
            <span className="box box-align-center">
              <img src={Home} />{" "}
              <span style={{ marginLeft: 12 }}>返回知擎首页</span>
            </span>
          </div>
          <div className={`fn-size-16  ${styles.shortcut}`}>
            <span className="box box-align-center">
              <img src={Code} />{" "}
              <span style={{ marginLeft: 12 }}>显示快捷键</span>
            </span>

            <div className={`fn-size-14 ${styles.shortcutCode}`}>
              <div className="box box-align-center box-between">
                <div>预览/暂停</div>
                <div>Space/空格键</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>回退/ 前进</div>
                <div>Home</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>跳转到结束</div>
                <div>End</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>撤回操作</div>
                <div>Ctrl+Z</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>重做操作</div>
                <div>Ctrl+Shift+Z</div>
              </div>
              <div className="box box-align-center box-between ">
                <div>删除</div>
                <div>Delete/Backspace</div>
              </div>
            </div>
          </div>
        </div>
        <div className="box box-align-center">
          <div>
            <NewBtn2
              onClick={() => {
                if (
                  JSON.stringify(this.props.parent.state.video_data) === "{}"
                ) {
                  new Modal().alert("亲！还没有添加文件呢！", "error");
                  return;
                }
                if (!getUser().name) {
                  new Modal().alert(
                    "亲！还没有登录呢，正在为你跳转登录页...",
                    "error"
                  );
                  setTimeout(() => {
                    navigate("/users/login");
                  }, 5000);
                }
                if (this.props.parent.state.video_data.sub_josn) {
                  console.log(123)
                  btn_save();
                } else {
                  sessionStorage.setItem(
                    "file_data",
                    JSON.stringify(this.props.parent.state.video_data)
                  );
                  navigate("/video/uppage");
                }
              }}
            >
              {this.props.parent.state.video_data.sub_josn
                ? "保存并发布视频"
                : "发布视频"}
            </NewBtn2>
          </div>
          {/*<div title="点击可保存你编辑文本样式">
            <Save className={styles.save} onClick={btn_save} />
            </div>*/}

          <div onClick={this.btn_user}>
            {this.state.user_info ? (
              <div>
                <Avatar
                  src={
                    this.state.user_info && this.state.user_info.headshot
                      ? this.state.user_info.headshot
                      : ""
                  }
                />
                {/**<span>{this.state.user_info.name}</span>
                <ArrowDropDown /> */}
              </div>
            ) : (
              <Avatar />
            )}
          </div>
        </div>

       <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message=""
        >
        <Alert onClose={handleClose} severity="success">
        保存成功
      </Alert>
      </Snackbar>
      </header>
    );
  }
}
