import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Container from "../Container/KeContainer";
import "./Footer.sass";

const QrCodeImg = () => (
  <Grid container>
    <Grid item xs={4}>
      <div className="footer-qrcodes-box">
        <img src="/images/wx.jpg" alt="qrcode" />
        <Typography variant="inherit" component="p">
          微信
        </Typography>
      </div>
    </Grid>

    <Grid item xs={4}>
      <div className="footer-qrcodes-box">
        <img src="/images/gzh.png" alt="qrcode" />
        <Typography variant="inherit" component="p">
          微信公众号
        </Typography>
      </div>
    </Grid>
    <Grid item xs={4}>
      <div className="footer-qrcodes-box">
        <img src="/images/wb.png" alt="qrcode" />
        <Typography variant="inherit" component="p">
          官方微博
        </Typography>
      </div>
    </Grid>
  </Grid>
);

const ContractUs = () => {
  const menu = ["联系我们", "关于我们", "用户协议", "隐私政策"];
  return (
    <div className="contract-us">
      <ul>
        {menu.map((o) => (
          <li key={o}>
            <Link>
              <Typography noWrap variant="body2">
                {o}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

class Footer extends Component {
  render() {
    const {
      config: { copyright },
    } = this.props;

    return (
      <footer className="footer" id="page-footer">
        <CssBaseline />
        <div className="footer-above">
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={4}>
                <div className="footer-above-left">
                  <div className="footer-title">
                    <IconButton>
                      <img src="/logos/logo.svg" alt="logo" />
                    </IconButton>
                    <Typography>&#183; 开动遨游知识海洋的引擎</Typography>
                  </div>
                  <ContractUs />
                </div>
              </Grid>
              <Grid md={5} />
              <Grid item xs={12} sm={12} md={3}>
                <QrCodeImg />
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className="footer-bottom">
          <Container fixed>
            <Grid container>
              <Grid container item xs={12}>
                <Grid md={1} />
                <Grid item xs={12} md={5}>
                  粤ICP备19120979号-1 &nbsp;&nbsp;&nbsp;&nbsp; 粤公网安备
                  44030702002640号
                </Grid>
                <Grid item xs={12} md={5}>
                  版权所有@深圳前海黑顿科技有限公司 2020 保留一切权利
                </Grid>
                <Grid md={1} />
              </Grid>
              <Grid item xs={12} className="footer-address">
                深圳前海黑顿科技有限公司 &nbsp;&nbsp;&nbsp;&nbsp;
                广东省深圳市龙岗区龙翔大道7188号万科大厦3109
              </Grid>
            </Grid>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
