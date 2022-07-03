const getDate = () => {
  const date = new Date();

  const month =
    (date.getMonth() + 1).toString.length === 1
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;

  const day =
    date.getDate().toString.length === 1
      ? `0${date.getDate()}`
      : date.getDate();

  const year = date.getFullYear().toString();

  const time = date.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
    { timeZone: "UTC", timeZoneName: "short" }
  );

  return `${month}/${day}/${year} ${time}`;
};

export default getDate;
