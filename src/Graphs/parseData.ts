export const parseData = (input) => {
    const dates: any = Object.keys(input);
    const values: any = Object.values(input);

    const stats = dates.map((item, idx) => ({
      x: item,
      y: values[idx] / 1000000,
    //   y: values[idx],
    }));

    return stats;
  };