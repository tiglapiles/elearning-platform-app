import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { isLoggedIn, logout, getUser } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    backgroundColor: "#fff",
  },
  iconButton: {
    padding: 0,
  },
  popOver: {
    top: '50px !important',
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
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        classes={{ list: classes.list }}
        PopoverClasses={{ paper: classes.popOver }}
      >
        {isLogin ? (
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              navigate(`/users/profile/`);
              handleMenuClose();
            }}
          >
            个人中心
          </MenuItem>
        ) : null}
        {isLogin ? (
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              logout(() => ({}));
              navigate(`/users/login`);
              handleMenuClose();
            }}
          >
            登出
          </MenuItem>
        ) : (
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              navigate(`/users/login`);
            }}
          >
            登录
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default AvatarMenu;
