import React, { Component, Fragment } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";

import SimpleSelectInput from "../SimpleSelectInput";
import styles from "../../styles/table";
class CustomTable extends Component {
  state = {
    levelName: "",
    levelNames: [],
    planningYears: [],
  };

  componentDidMount = () => {
    const { PD, PS } = this.props;

    const levelNames = PD
      ? PD.map(({ levelName }) => levelName)
      : PS.map(({ levelName }) => levelName);

    const keys = PD
      ? PD.map((obj) => Object.keys(obj))
      : PS.map((obj) => Object.keys(obj));
    const planningYears = keys[0]
      .filter((rawKey) => rawKey.match(/FTE/g))
      .map((key) => key.split("_").join(" "));
    console.log("planningYears", planningYears);
    this.setState({
      levelName: levelNames[0],
      levelNames,
      planningYears,
    });
  };

  handleSelectChange = (event) => {
    this.setState({ levelName: event.target.value });
  };

  render() {
    const { levelName, levelNames, planningYears } = this.state;
    const { classes, PD, PS } = this.props;

    const pdLevelObj =
      levelName && PD && PD.find(({ levelName: LN }) => LN === levelName);
    const psLevelObj =
      levelName && PS && PS.find(({ levelName: LN }) => LN === levelName);

    const pdSet =
      pdLevelObj &&
      Object.values(pdLevelObj).filter((val) => Number.isInteger(val));
    const psSet =
      psLevelObj &&
      Object.values(psLevelObj).filter((val) => Number.isInteger(val));

    console.log("pdLevelObj", pdLevelObj);
    console.log("pdSet", pdSet);
    const setsDiff = [];
    if (psSet && pdSet) {
      for (let i = 0; i < Math.min(pdSet.length, psSet.length); i++) {
        setsDiff.push(pdSet[i] - psSet[i]);
      }
    }

    return (
      <Grid className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Planning Level</TableCell>
              {planningYears &&
                planningYears.map((year, index) => (
                  <TableCell key={index}>{year}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <Fragment>
              {pdSet && pdSet.length ? (
                <TableRow>
                  <TableCell className={classes.alignRight}>Demand</TableCell>
                  {pdSet.map((pld, i) => (
                    <TableCell key={`${pld}&${i}`}>{pld}</TableCell>
                  ))}
                </TableRow>
              ) : null}
              {psSet && psSet.length ? (
                <TableRow>
                  <TableCell className={classes.alignRight}>Supply</TableCell>
                  {psSet.map((pld, i) => (
                    <TableCell key={`${pld}&${i}`}>{pld}</TableCell>
                  ))}
                </TableRow>
              ) : null}
            </Fragment>
            <TableRow className={classes.highlight}>
              <TableCell className={classes.relative}>
                <SimpleSelectInput
                  handleChange={this.handleSelectChange}
                  name="table-select"
                  value={levelName}
                  data={levelNames}
                />
              </TableCell>
              {setsDiff.map((num, i) => (
                <TableCell key={`${num}&${i}`}>{num}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

export default withStyles(styles)(CustomTable);
