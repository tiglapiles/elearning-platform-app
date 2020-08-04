import React from "react";

import Helmet from "react-helmet";
import ProgressBar from "../components/Loading/ProgressBar";
import LoadData from "../components/Profile/components/LoadData";
import { SearchOutlined, Close } from "@material-ui/icons";
import { SnackbarProvider } from "notistack";
import { get_data } from "../assets/js/request";
import {switch_time} from '../assets/js/totls';
import style from "../components/phone/component/style.module.css";
import Avatar from "@material-ui/core/Avatar";
import Gongneng from "../components/phoneplay/Gongneng";
import { NewNav } from "../components/phone/component/Nav";
import { Grid, Button } from "@material-ui/core";
import Item from "../components/phone/component/Item";
import Nofile from "../components/phone/component/Notfile";
import SearchInput from "../components/phoneplay/SearchInput";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import VideoWindow from "../components/VideoPlayer/VideoWindow";

import videojs from "video.js";
// import Nofile from '../component/Notfile';
class PhonePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_id: "",
      is_show: false,
      is_update: true,
      video_info: null,
      new_info: null,
      jinjie_data: null,
      open_search: false,
      search_result: null,
      font_size: 10,
    };
    this.videoWindowRef = React.createRef();
    this.videoNode = React.createRef();
    this.get_jinjie = this.get_jinjie.bind(this);
    this.get_video_info = this.get_video_info.bind(this);
  }
  componentDidMount() {
    let _vid = this.props.location.search.split("=")[1];
    this.setState({
      is_show: true,
      video_id: _vid,
    });
    this.get_video_info(_vid);
    this.get_jinjie(_vid);
    this.setState({
      font_size: (10 / 414) * window.screen.width,
    });
  }
  componentWillReceiveProps(newprox) {
    let _vid = newprox.location.search.split("=")[1];
    if (this.state.video_id != _vid) {
      this.get_video_info(_vid);
    }
  }
  get_video_info = (vid) => {
    get_data({
      extra_data: { video_id: vid },
      model_action: "video_play",
      model_name: "video",
      model_type: "",
    }).then((res) => {
      if (res.err == 0 && res.errmsg == "OK") {
        this.setState({
          video_info: res.result_data[0],
          new_info: this.extraVideoInfo(res.result_data[0]),
        });
        // this.player = videojs(
        //   document.getElementById("xttblog"),
        //   {
        //     tracks: res.result_data[0].vtt_path,
        //     sources: res.result_data[0].video_path,
        //   },
        //   function() {}
        // );
      }
      this.setState({
        is_show: false,
      });
    });
  };
  extraVideoInfo = (data = {}) => ({
    videoPath: data.video_path,
    vttPath: data.vtt_path,
    assPath: data.ass_path,
    title: data.title,
    authName: data.user_name,
    imagePath: data.image_path,
    category: data.category,
    videoId: data.video_id,
    isLoged: data.is_login,
    data,
  });
  get_jinjie(vid) {
    get_data({
      extra_data: { max_size: 4, page: 1, video_id: vid },
      model_action: "view_advanced",
      model_name: "document",
      model_type: "",
    }).then((res) => {
      if (res.err == 0) {
        this.setState({
          jinjie_data: res.result_data,
        });
      }
    });
  }
  render() {
    const {
      video_id,
      is_show,
      is_update,
      video_info,
      new_info,
      jinjie_data,
      search_result,
    } = this.state;

    return (
      <SnackbarProvider>
        <section>
          <ProgressBar loading={is_show} />
          {!is_update && <LoadData />}
          <Helmet>
        
          <meta http-equiv="Expires" content="0" />
          <meta http-equiv="Cache-Control" content="no-cache" />
          <meta http-equiv="Pragma" content="no-cache" />

          <title>知擎</title>
          <line
            type="text/css"
            rel="stylesheet"
            href="../../assets/css/tootls.css"
          />
        </Helmet>
          <div style={{ lineHeight: 1.5, fontSize: 25 }}>
            <div style={{ padding: "0 1.67em" }}>
              <header>
                <Head is_show={true} />
              </header>
            </div>
            <div>
              <div className="all-width">
                <div className="all-width">
                  <div
                    className="text-right"
                    style={{
                      backgroundColor: "#000",
                      height: "3em",
                      paddingTop: 1,
                    }}
                  >
                    {this.state.open_search ? (
                      <div className="all-width">
                        <SearchInput
                     
                          onEvent={(data) => {
                            if (data.config) {
                              get_data({
                                extra_data: {
                                  query_string: data.conter,
                                  video_id: [video_info.video_id],
                                },
                                model_action: "local_search",
                                model_name: "video",
                                model_type: "",
                              }).then((res) => {
                                if (res.err === 0) {
                                  let _data = res.result_data[0].match_frame;
                                  _data.forEach((op) => {
                                    let _new_str = {};
                                    let _str = "";
                                    let prv_str, nex_str;
                                    op.subtitle_dist.forEach((ot) => {
                                      _str += ot[0];
                                    });
                                    _new_str.prv_str = op.whole_str.substring(
                                      0,
                                      op.whole_str.indexOf(_str)
                                    );
                                    _new_str.now_str = _str;
                                    _new_str.nex_str = op.whole_str.substring(
                                      op.whole_str.indexOf(_str) + _str.length
                                    );
                                    op.new_str = _new_str;
                                  });

                                  this.setState({
                                    search_result: _data,
                                  });
                                }
                              });
                            }

                            if (data.concel) {
                              this.setState({
                                open_search: false,
                              });
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className={`${style.btn} `}
                        style={{ padding: "0.35em 1.25em" }}
                        onClick={() => {
                          this.setState({
                            open_search: true,
                          });
                        }}
                      >
                        <SearchOutlined style={{width:'2em',height:'2em'}} /> 知识搜索
                      </div>
                    )}
                  </div>
                  <div className={`all-width ${style.video}`}>
                 {video_info && (
                      <VideoWindow
                        info={new_info}
                        timer={0}
                        loading={false}
                        ref={this.videoWindowRef}
                      />
                    )}  

                  </div>
               
                </div>
  
                {search_result && (
                  <div
                    className="all-width fn-color-9E9EA6"
                    style={{
                      background: "rgba(44, 44, 59, 1)",
                      padding: "0 2em",
                    
                    }}
                  >
                    <p
                      className={`fn-color-9E9EA6 all-width box box-between ${style.fn14}`}
                      style={{ paddingTop: "1em" }}
                    >
                      <span>共为您找到 {search_result.length} 个结果</span>
                      <span
                        onClick={() => {
                          this.setState({
                            search_result: null,
                          });
                        }}
                      >
                        <Close />
                      </span>
                    </p>

                    <ul className={`${style.search}`}>
                      {search_result.map((op) => (
                        <li key={op.whole_str} className="all-height" style={{position:'relative',height:'8em'}}>
                          <p
                            className="textview-overflow four all-height"
                            style={{ fontSize: "0.8em",flex:1 }}
                          >
                            {op.new_str.prv_str}
                            <span className={style.color}>
                              {op.new_str.now_str}
                            </span>
                            {op.new_str.new_str}
                          </p>
                          <span style={{
                            position:'absolute',
                            borderRadius:4,
                            display:'inline-block',
                            padding:'2px 5px',
                            backgroundColor:'#9E9EA6',
                            right:1,
                            bottom:1,
                            color:'white'
                          }}>{switch_time(op.start_time,':')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div style={{ padding: "1em 2em",marginTop:'1em' }}>
                <div className={`textview-overflow two ${style.fn14}`}>
                  {video_info && video_info.title}
                </div>
                <div
                  className="box box-align-center"
                  style={{ marginTop: "0.8em" }}
                >
                  <Avatar
                    src={video_info && video_info.headshot}
                    style={{
                      width: "5em",
                      height: "5em",
                      marginRight: "0.6em",
                    }}
                  />
                  <div className={style.fn16}>
                    <div>{video_info && video_info.user_name}</div>
                    <div>
                      {(video_info && video_info.view_counts) || 0}个视频&nbsp;{" "}
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: 2,
                          backgroundColor: "#eee",
                          borderRadius: "50%",
                          verticalAlign: "middle",
                        }}
                      ></span>
                      &nbsp;{(video_info && video_info.like_counts) || 0} 订阅
                    </div>
                  </div>
                </div>
                <Gongneng info={video_info} />
                <div className="line"></div>
                <div
                  className=" fn-color-878791"
                  style={{ marginBottom: "0.8em" }}
                >
                  <NewNav
                    list={["进阶内容", "系列视频", "推荐视频"]}
                    onEvent={(num) => {
                      let _data;
                      if (num == 1) {
                        this.get_jinjie(video_info.video_id);
                        return;
                      } else if (num == 2) {
                        _data = {
                          extra_data: {
                            video_id: video_info.video_id,
                            related_type: "series",
                            max_size: 10,
                            page: 1,
                          },
                          model_action: "get_related_video",
                          model_name: "video",
                          model_type: "",
                        };
                      } else if (num == 3) {
                        _data = {
                          extra_data: {
                            video_id: video_info.video_id,
                            related_type: "recommend",
                            max_size: 10,
                            page: 1,
                          },
                          model_action: "get_related_video",
                          model_name: "video",
                          model_type: "",
                        };
                      }
                      get_data(_data).then((res) => {
                        //   if(res.err==0){
                        this.setState({
                          jinjie_data: res.result_data,
                        });
                        //   }
                      });
                    }}
                  />
                </div>
                <p className={`fn-color-878791 &{style.fn12}`}>
                  阶梯式系统化学习，有章有序，助您小步快跑
                </p>

                <Grid container spacing={3}>
                  {jinjie_data && jinjie_data.length > 0 ? (
                    jinjie_data.map((opt) => (
                      <Grid item xs={6} key={opt._id}>
                        <Item info={opt} />
                      </Grid>
                    ))
                  ) : (
                    <Nofile />
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </section>
      </SnackbarProvider>
    );
  }
}
export default PhonePlay;
