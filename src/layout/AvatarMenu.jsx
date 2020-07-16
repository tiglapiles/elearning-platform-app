import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { isLoggedIn, logout, getUser } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    padding: 0,
  },
  popOver: {
    top: "50px !important",
    borderRadius: 12,
  },
  setIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  person: {
    "&>a": {
      display: "flex",
      flexDirection: "column",
      "&:not(:last-child)": {
        marginRight: 20,
      },
      "&>img": {
        marginBottom: 10,
      },
    },
  },
}));

const AvatarMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const isLogin = isLoggedIn();
  const { headshot, name } = getUser();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        className={classes.iconButton}
      >
        {isLogin ? (
          <Avatar src={headshot} alt={name} style={{ width: 30, height: 30 }} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        classes={{ paper: classes.popOver }}
      >
        {isLogin ? (
          <div style={{ position: "relative" }}>
            <Box p={2.5}>
              <Link href="/users/profile/" color="inherit" underline="none">
                <Box display="flex" alignItems="center" mb={2.5}>
                  <Avatar
                    src={headshot}
                    alt={name}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <Typography>{name}</Typography>
                </Box>
              </Link>
              <Divider />
              <Box display="flex" mt={2.5} className={classes.person}>
                <Link href="/users/profile/dynamic" color="inherit">
                  <img src="/images/collect.svg" alt="我的收藏" />
                  <Typography variant="caption">我的收藏</Typography>
                </Link>
                <Link href="/users/profile/workscenter" color="inherit">
                  <img src="/images/create.svg" alt="我的收藏" />
                  <Typography variant="caption">创作中心</Typography>
                </Link>
                <Link href="/users/profile" color="inherit">
                  <img src="/images/person.svg" alt="我的收藏" />
                  <Typography variant="caption">个人中心</Typography>
                </Link>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                logout(() => ({}));
                navigate(`/users/login`);
                handleMenuClose();
              }}
            >
              退出
            </Button>
            <IconButton
              className={classes.setIcon}
              size="small"
              onClick={() => navigate("/users/profile/setings")}
            >
              <SettingsIcon fontSize="inherit" />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/users/login`);
            }}
          >
            登录/注册
          </Button>
        )}
      </Popover>
    </div>
  );
};

export default AvatarMenu;
