export default (theme) => ({
  formControl: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "8%",
      minWidth: 165,
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: "20%",
      minWidth: 225,
    },
  },
});
