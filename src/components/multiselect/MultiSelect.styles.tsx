import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 316,
      fontSize: 14,
    },
    button: {
      color: theme.palette.secondary.main,
      fontSize: 14,
      paddingRight: 10,
      fontWeight: 600,
    },
    baseContainer: {
      width: 316,
      textTransform: "capitalize",
      textAlign: "left",
      justifyContent: "flex-start",
      paddingRight: 4,
      height: 48,
    },
    arrowDrop: {
      color: "rgba(0, 0, 0, 0.54)",
    },
    flexBaseContainer: {
      display: "flex",
      width: "100%",
    },
    popper: {
      border: "1px solid rgba(27,31,35,.15)",
      boxShadow: "0 3px 12px rgba(27,31,35,.15)",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      width: 316,
      zIndex: 1,
      fontSize: 14,
      backgroundColor: theme.palette.common.white,
    },
    inputBase: {
      padding: 10,
      width: "100%",
      "& input": {
        borderRadius: 6,
        backgroundColor: theme.palette.common.white,
        padding: "8px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        border: "1px solid #ced4da",
        fontSize: 14,
        "&:focus": {
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    paper: {
      boxShadow: "none",
      margin: 0,
      color: "rgba(52,59,70,1)",
      fontSize: 14,
    },
    option: {
      minHeight: "auto",
      marginBottom: 0,
      padding: 0,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
      "& button": {
        visibility: "hidden",
        paddingRight: 2,
        fontFamily: 14,
        fontWeight: 600,
      },
      "&:hover": {
        color: theme.palette.secondary.main,
        "& button": {
          visibility: "visible",
        },
      },
    },
    popperDisablePortal: {
      position: "relative",
    },
    selectedLength: {
      color: "rgba(12,12,12,.5)",
      paddingLeft: theme.spacing(1),
    },
    onlyButton: {},
    text: {
      flexGrow: 1,
    },
    loading: {
      textAlign: "center",
    },
    selectedLabel: {
      color: theme.palette.secondary.main,
    },
  })
);
