import React, { useEffect } from "react";
import MultiSelect from ".";

export default {
  title: "MultiSelect",
  component: MultiSelect,
};

const labels = [
  {
    label: "good first issue",
    value: "#7057ff",
  },
  {
    label: "help wanted long text to check how it is going to render there",
    value: "#008672",
  },
  {
    label: "priority: critical",
    value: "#b60205",
  },
  {
    label: "priority: high",
    value: "#d93f0b",
  },
  {
    label: "priority: low",
    value: "#0e8a16",
  },
  {
    label: "priority: medium",
    value: "#fbca04",
  },
  {
    label: "status: can't reproduce",
    value: "#fec1c1",
  },
  {
    label: "status: confirmed",
    value: "#215cea",
  },
  {
    label: "status: duplicate",
    value: "#cfd3d7",
  },
  {
    label: "status: needs information",
    value: "#fef2c0",
  },
  {
    label: "status: wont do/fix",
    value: "#eeeeee",
  },
  {
    label: "type: bug",
    value: "#d73a4a",
  },
  {
    label: "type: discussion",
    value: "#d4c5f9",
  },
  {
    label: "type: documentation",
    value: "#006b75",
  },
  {
    label: "type: enhancement",
    value: "#84b6eb",
  },
  {
    label: "type: epic",
    value: "#3e4b9e",
  },
  {
    label: "type: feature request",
    value: "#fbca04",
  },
  {
    label: "type: question",
    value: "#d876e3",
  },
];

export const Default = () => {
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState(labels);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <MultiSelect
      isLoading={loading}
      options={labels}
      disabled
      error
      selectedOptions={state}
      onChange={setState}
    />
  );
};
