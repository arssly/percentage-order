"use client";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { a11yProps } from ".";

export type SwipeableTabProps = {
  tabs: { title: string; element: React.ReactElement }[];
  ariaLabel?: string;
};

export function SwipeableTab({ tabs, ariaLabel }: SwipeableTabProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label={ariaLabel ?? "full width tabs"}>
        {tabs.map((tab, index) => (
          <Tab label={tab.title} key={`tab-title-${index}`} {...a11yProps(index)} />
        ))}
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((tab, index) => (
          <TabPanel value={value} key={`tab-panel-${index}`} index={index} dir={theme.direction}>
            {tab.element}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}
