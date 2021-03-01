import React, { PropsWithChildren, SyntheticEvent } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Popper,
  ButtonBase,
  InputBase,
  Checkbox,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, Settings } from "@material-ui/icons";
import Autocomplete, {
  AutocompleteCloseReason,
} from "@material-ui/lab/Autocomplete";
import { useStyles } from "./MultiSelect.styles";

type OptionType = {
  label: string;
  value: string;
};

type Props = {
  selectedLabel?: string;
  selectedLabelPlural?: string;
  emptyLabel?: string;
  emptySearch?: string;
  options: OptionType[];
  selectedOptions?: OptionType[];
};

// type OLDPROPS = {
//   dataSource: string[];
//   dataSelected: string[];
//   fieldName?: string;
//   onChange: (values: string[]) => void;
//   isPreview?: boolean;
//   error?: boolean;
//   isLoading?: boolean;
// };

export const MultiSelect = ({
  options,
  selectedOptions = [],
  emptySearch = "No values",
  selectedLabel = "Selected Item",
  selectedLabelPlural = "Selected Items",
  emptyLabel = "Select items",
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<OptionType[]>(selectedOptions);
  const [pendingValue, setPendingValue] = React.useState<OptionType[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === "toggleInput") {
      return;
    }
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleSelectOnly = (event: SyntheticEvent, value: OptionType): void => {
    setPendingValue([value]);
    event.stopPropagation();
  };

  const handleSelectAll = (): void => setPendingValue(options);

  const open = Boolean(anchorEl);
  const id = open ? "multiselect" : undefined;
  const isSelected = Boolean(value.length);
  const containerText = () =>
    isSelected
      ? value.length > 1
        ? selectedLabelPlural
        : selectedLabel
      : emptyLabel;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          aria-describedby={id}
          variant="outlined"
          className={classes.baseContainer}
          disableRipple
          onClick={handleClick}
        >
          <Box className={classes.flexBaseContainer}>
            <Box flexGrow={1}>
              <Typography>
                {isSelected && `${value.length} `}
                {containerText()}
              </Typography>
            </Box>
            <Box>
              {open ? (
                <ArrowDropUp className={classes.arrowDrop} />
              ) : (
                <ArrowDropDown className={classes.arrowDrop} />
              )}
            </Box>
          </Box>
        </Button>
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <Autocomplete
          open
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText={emptySearch}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox checked={selected} />
              <Typography className={classes.text}>{option.label}</Typography>
              <ButtonBase
                disableRipple
                className={classes.onlyButton}
                onClick={(event): void => handleSelectOnly(event, option)}
              >
                Only
              </ButtonBase>
            </React.Fragment>
          )}
          options={[...new Set([...value, ...options])]}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <React.Fragment>
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
                placeholder="Search"
              />
              <Box display="flex" width="100%">
                <Box flexGrow={1} pl={0.5}>
                  <Typography className={classes.selectedLength}>
                    {pendingValue.length}/{options.length} Selected
                  </Typography>
                </Box>
                <Box>
                  <ButtonBase
                    className={classes.button}
                    onClick={handleSelectAll}
                    disableRipple
                  >
                    <Typography>Select All</Typography>
                  </ButtonBase>
                </Box>
              </Box>
            </React.Fragment>
          )}
        />
      </Popper>
    </React.Fragment>
  );
};
