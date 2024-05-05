export const MONTHS = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [
    {
      label: (currentYear - 1).toString(),
      value: (currentYear - 1).toString(),
    }, // Previous year
    { label: currentYear.toString(), value: currentYear.toString() }, // Current year
    {
      label: (currentYear + 1).toString(),
      value: (currentYear + 1).toString(),
    }, // Next year
  ];
  return years;
};
