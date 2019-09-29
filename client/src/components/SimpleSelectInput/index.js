import React, { Component } from "react";
import { FormControl, MenuItem, Select, withStyles } from "@material-ui/core";
import styles from "../../styles/simpleSelectInput";

class SimpleSelectInput extends Component {
  render() {
    const { data = [], name, value, handleChange, classes } = this.props;

    return (
      <FormControl className={classes.select}>
        <Select
          value={value}
          onChange={handleChange}
          className={classes.fontSize}
          inputProps={{
            name: name,
            id: `simple-${name}`,
          }}
        >
          {data.map((title, index) => {
            return (
              <MenuItem key={`${title}&${index}`} value={title}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(SimpleSelectInput);
