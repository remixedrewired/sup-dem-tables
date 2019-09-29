import React, { Component, Fragment } from "react";
import {
  Grid,
  Typography,
  withStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import theme from "./theme";

import Loader from "./components/Loader";
import SelectInput from "./components/SelectInput";
import CustomTable from "./components/Table";
import SimpleButton from "./components/SimpleButton";
import Snackbar from "./components/SimpleSnackbar";

import { selectNames, fetchAllPlannings, deletePlanning } from "./helpers";
import styles from "./styles/app";

class App extends Component {
  state = {
    loading: true,
    plannings: [],
    plan: "",
    demand: "",
    supply: "",
    planningYears: [],
    errorMessage: "",
    snackBarActive: false,
  };

  handleChange = (name) => (event) => {
    const { value } = event.target;
    if (this.state[name] === value) return;

    if (name === "plan")
      return this.setState({ [name]: value, demand: "", supply: "" });

    this.setState({ [name]: value });
  };
  handleModalOpen = () => {};

  handleCloseSnackBar = () =>
    this.setState({ snackBarActive: false, errorMessage: "" });

  _deletePlanning = (id) => {
    this.setState({ loading: true, plan: "", demand: "", supply: "" });
    deletePlanning(id)
      .then((res) => {
        const { status } = res;
        if (status === 204) this._fetchAllPlannings();
      })
      .catch((err) =>
        this.setState({
          errorMessage: err.message || "Error on deleting planning",
          snackBarActive: true,
          loading: false,
        }),
      );
  };

  _fetchAllPlannings = () =>
    fetchAllPlannings()
      .then((res) => {
        const { data } = res;
        if (data.length === 0) return this.setState({ loading: false });

        this.setState({
          plannings: data,
          loading: false,
          planningsYears: data.map(({ planningName }) =>
            planningName.match(/\d+/g).map(Number),
          ),
        });
        this.handleChange(selectNames.plan.objName)({
          target: { value: data[0]._id },
        });
      })
      .catch((err) =>
        this.setState({
          errorMessage: err.message || "Error on fetching tables data",
          snackBarActive: true,
          loading: false,
        }),
      );

  componentDidMount = () => this._fetchAllPlannings();

  render() {
    const {
      loading,
      plan,
      plannings,
      demand,
      supply,
      errorMessage,
      snackBarActive,
    } = this.state;
    const { classes } = this.props;

    const plans = plannings.map(({ _id, planningName }) => ({
      id: _id,
      name: planningName,
    }));

    const { planningName, planningDemand: demands, planningSupply: supplies } =
      plan && plannings.find(({ _id }) => _id === plan);

    const { planningLevels: PD } =
      demand &&
      demands &&
      demands.find(({ tableName }) => tableName === demand);
    const { planningLevels: PS } =
      supply &&
      supplies &&
      supplies.find(({ tableName }) => tableName === supply);

    return (
      <MuiThemeProvider theme={theme}>
        <Grid className={`${classes.layout}`}>
          {loading ? (
            <Loader loading={loading}></Loader>
          ) : (
            <Grid>
              <Grid className={`${classes.row} ${classes.spaceBetween}`}>
                <SelectInput
                  inputName={selectNames.plan.showName}
                  field={selectNames.plan.objName}
                  handleChange={this.handleChange}
                  labelWidth={105}
                  value={plan}
                  data={plans || [{ name: "No data..." }]}
                ></SelectInput>
                {plan ? (
                  <Grid>
                    <SimpleButton
                      name="Create"
                      className={classes.button}
                      onClick={() => this.handleModalOpen()}
                    />
                    <SimpleButton
                      name="Delete"
                      className={classes.button}
                      onClick={() => this._deletePlanning(plan)}
                    />
                  </Grid>
                ) : (
                  <SimpleButton
                    name="Create"
                    onClick={() => this.handleModalOpen()}
                  />
                )}
              </Grid>
              <Grid className={classes.row}>
                <SelectInput
                  inputName={selectNames.demand.showName}
                  field={selectNames.demand.objName}
                  handleChange={this.handleChange}
                  labelWidth={127}
                  value={demand}
                  data={demands || [{ tableName: "No data..." }]}
                />
                <SelectInput
                  inputName={selectNames.supply.showName}
                  field={selectNames.supply.objName}
                  handleChange={this.handleChange}
                  labelWidth={115}
                  value={supply}
                  data={supplies || [{ tableName: "No data..." }]}
                />
              </Grid>
              {!plan && !errorMessage ? (
                <Typography variant="h5" className={classes.notifier}>
                  Please, choose a table
                </Typography>
              ) : (
                <Fragment>
                  {plan && (PD || PS) ? (
                    <CustomTable
                      planningName={planningName}
                      PD={PD}
                      PS={PS}
                    ></CustomTable>
                  ) : (
                    <Typography variant="h5" className={classes.notifier}>
                      For start planning, please select demand and supply
                      scenarios
                    </Typography>
                  )}
                </Fragment>
              )}
              <Grid className={classes.row}></Grid>
            </Grid>
          )}
          <Snackbar
            variant={"error"}
            handleClose={this.handleCloseSnackBar}
            message={errorMessage}
            open={snackBarActive}
          ></Snackbar>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
