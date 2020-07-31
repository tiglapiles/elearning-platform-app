import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Slider from "react-slick";
import useSEO from "../SEO/useSEO";
import { getCategoryList } from "../../services/home";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./ChannelBar.sass";

const ChannelBar = ({ id = "hots" }) => {
  const [cates, setCates] = useState([]);
  const [loading, setLoading] = useState(true);
  const setSEO = useSEO();
  const slickSetting = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 12,
    slidesToScroll: 4,
    className: "channel-slider",
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    customPaging: function (i) {
      return <div className="custom-dot" />;
    },
  };

  const fetchBarIcons = () => {
    setLoading(true);
    getCategoryList({}).then((data = []) => {
      setCates(data);
      setLoading(false);
      setSEO({ title: data.filter((o) => o.id === id).name });
    });
  };

  useEffect(() => {
    fetchBarIcons();
  }, []);

  const handleChannel = (name) => {
    setSEO({ title: name });
  };

  return !loading && cates.length ? (
    <Box className="channel-bar-paper" id="channel-bar-paper-to-back">
      <Box className="bar-container">
        <div className="bar-content">
          <Slider {...slickSetting}>
            {cates.map((o) => {
              const cn = id && id === o.id ? "slice-action" : "";
              const href = o.id === "hots" ? "/" : `/channel/?ch=${o.id}`;
              return (
                <Link
                  key={o.id}
                  href={href}
                  state={{ id: o.id }}
                  underline="none"
                  color="textPrimary"
                  onClick={() => handleChannel(o.name)}
                >
                  <Box className={`item ${cn}`}>
                    <div>
                      <img
                        src={`${o.web_icon}`}
                        alt={o.name}
                        width="48"
                        height="48"
                      />
                    </div>
                    <div>
                      <img
                        src={`${o.web_click_icon}`}
                        alt={o.name}
                        width="48"
                        height="48"
                      />
                    </div>
                    <div style={{ height: 10 }} />
                    <Typography noWrap align="center" variant="body2">
                      {o.name}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </Slider>
        </div>
      </Box>
      <Divider />
    </Box>
  ) : (
    <div>
      <Box
        height={80}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {Array.from({ length: 12 }).map((o, i) => (
          <Skeleton key={i} variant="rect" width={48} height={48} />
        ))}
      </Box>
      <Divider />
    </div>
  );
};

export default ChannelBar;
