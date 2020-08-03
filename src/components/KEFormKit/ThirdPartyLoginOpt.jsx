import React, { useState, useEffect } from "react";
import { globalHistory, navigate } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import urlParse from "url-parse";
import AccountForm from "./AccountForm";
import UserProtocol from "./UserProtocol";
import useStyles from "./ThirdPartyLoginOptStyle";
import prevHref from "../../services/prevHref";
import {
  generateThirdPartyUrl,
  handleThirdLogin,
  bindingMobile,
} from "../../services/auth";

const ThirdPartyLoginOpt = () => {
  const classes = useStyles();
  const locationHref = globalHistory.location.href;
  const [binding, setBinding] = useState(false);
  const [acToken, setAcToken] = useState("");
  const [returnUrl, setReturnUrl] = useState("/");

  const handleNavigate = (href = "") => {
    navigate(href || returnUrl);
  };

  // 第一步：获取跳转链接
  const handleLoginClick = (method) => {
    const backUrl = `${prevHref.get()}`;
    generateThirdPartyUrl({ type: method, back_url: backUrl }).then((res) => {
      if (res) {
        window.location.href = `${res}`;
      }
    });
  };

  const loginMethod = (value) => value || "weibo";
  const track = (msg) => (data) => console.log(`${msg}: `, data);
  // 第二步：拿到code进行登录操作
  const handleLogin = ({ code = "", state = "", type = "weibo" }) => {
    const param = { code, type };
    track("href")(locationHref);
    handleThirdLogin(param).then((response) => {
      const { accessToken } = response;
      if (accessToken) {
        /* 执行绑定手机号操作 */
        setBinding(true);
        setAcToken(accessToken);
        track("bind")(accessToken);
        return;
      }
      if (response && !accessToken) {
        handleNavigate(state);
        track("login")(response);
        return;
      }
      track("else")(response);
    });
  };

  // 第三步：绑定手机号
  const handleBindMobile = ({ mobile, smscode }) => {
    const param = { mobile, code: smscode, access_token: acToken };
    bindingMobile(param).then((response) => {
      if (response) {
        setBinding(false);
        handleNavigate();
      }
    });
  };

  const getThirdParams = (href) => urlParse(href, true).query || {};

  useEffect(() => {
    const { code, state, type } = getThirdParams(locationHref);
    if (code) {
      setReturnUrl(state);
      handleLogin({
        code,
        state: urlParse(state, true).href,
        type: loginMethod(type),
      });
    }
  }, [locationHref]);

  const Logo = ({ url, method }) => (
    <div className={classes.logo} onClick={() => handleLoginClick(method)}>
      <img src={url} alt="thirdpartylogin" width="32" />
    </div>
  );

  const BindingForm = () =>
    binding ? (
      <div className={classes.bindingMobile}>
        <div>
          <Typography variant="h5" gutterBottom className={classes.title}>
            第一次登录需要绑定手机号码
          </Typography>
          <AccountForm
            handleButton={handleBindMobile}
            buttonText="绑定并登录"
          />
        </div>
        <UserProtocol />
      </div>
    ) : null;

  return (
    <div className={classes.root}>
      <div>社交帐号登录</div>
      <div className={classes.logos}>
        <Logo url="/images/wechat-icon.png" method="wechat" />
        <Logo url="/images/qq-icon.png" method="qq" />

        <div className={classes.logo}>
          <Tooltip title="尚未搞定">
            <img
              src="/images/weibo-icon.png"
              alt="thirdpartylogin"
              width="32"
            />
          </Tooltip>
        </div>
      </div>
      <BindingForm />
    </div>
  );
};

export default ThirdPartyLoginOpt;
