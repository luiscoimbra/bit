import React, { PropsWithChildren, SyntheticEvent, useEffect } from "react";
import {
  Popper,
  ButtonBase,
  InputBase,
  Checkbox,
  Box,
  Typography,
  Button,
  CircularProgress,
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
  noResultsLabel?: string;
  options: OptionType[];
  selectedOptions?: OptionType[];
  onChange: (selectedValues: OptionType[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
};

export const MultiSelect = ({
  options,
  selectedOptions = [],
  noResultsLabel = "No values",
  selectedLabel = "Selected Item",
  selectedLabelPlural = "Selected Items",
  emptyLabel = "Select items",
  disabled,
  isLoading,
  onChange,
  error,
}: PropsWithChildren<Props>) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pendingValue, setPendingValue] = React.useState<OptionType[]>([]);

  useEffect(() => {
    setPendingValue(selectedOptions);
  }, [selectedOptions]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(pendingValue);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === "toggleInput") {
      return;
    }
    onChange(pendingValue);
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
  const isSelected = Boolean(pendingValue.length);
  console.log(pendingValue);
  const containerText = isSelected
    ? pendingValue.length > 1
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
              <Typography className={isSelected ? classes.selectedLabel : ""}>
                {isSelected && `${pendingValue.length} `}
                {containerText}
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
            !disabled && setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText={noResultsLabel}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox disabled={disabled} checked={selected} />
              <Typography className={classes.text}>{option.label}</Typography>
              {!disabled && (
                <ButtonBase
                  disableRipple
                  className={classes.onlyButton}
                  onClick={(event): void => handleSelectOnly(event, option)}
                >
                  Only
                </ButtonBase>
              )}
            </React.Fragment>
          )}
          options={[...new Set([...selectedOptions, ...options])]}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <React.Fragment>
              {isLoading && (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              )}
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
                  {!disabled && (
                    <ButtonBase
                      className={classes.button}
                      onClick={handleSelectAll}
                      disableRipple
                    >
                      <Typography>Select All</Typography>
                    </ButtonBase>
                  )}
                </Box>
              </Box>
            </React.Fragment>
          )}
        />
      </Popper>
    </React.Fragment>
  );
};
