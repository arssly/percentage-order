const formatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  hourCycle: "h24",
});

export const formatDate = (date: number) => {
  return formatter.format(date);
};
