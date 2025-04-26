import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  TextField,
  Slider,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  income: number;
  setIncome: (income: number) => void;
  rateRange: [number, number];
  setRateRange: (rateRange: [number, number]) => void;
};

export const TopNav = ({
  income,
  setIncome,
  rateRange,
  setRateRange,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleRateChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setRateRange(newValue as [number, number]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Tax Heaven IL
          </Typography>
          <IconButton onClick={handleClick}>
            <SettingsIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              <TextField
                label="Monthly Income"
                variant="outlined"
                type="number"
                value={income}
                onChange={handleIncomeChange}
                fullWidth
              />
              <Box>
                <Typography gutterBottom>
                  Rate Range: {rateRange[0]}% - {rateRange[1]}%
                </Typography>
                <Slider
                  value={rateRange}
                  onChange={handleRateChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={20}
                />
              </Box>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
