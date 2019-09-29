import React, { Component } from "react";

import { IconButton, Snackbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { amber, green, red, teal } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red,
  },
  info: {
    backgroundColor: teal,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 30,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

class SimpleSnackbar extends Component {
  render() {
    const { open, handleClose, message, variant, classes } = this.props;
    const Icon = variantIcon[variant];

    return (
      <Snackbar
        className={classes[variant]}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={
          <span id="message-id">
            <Icon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default withStyles(styles)(SimpleSnackbar);
