export default (theme) => ({
  layout: {
    minHeight: "calc(100vh - 60px)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
    background: "linear-gradient(10deg, #2e2e2e, #ffffff)",
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "35px",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  notifier: {
    textAlign: "center",
    marginTop: "15%",
    color: "#424242",
  },
  button: {
    margin: "5px 10px 5px 0",
  },
});
