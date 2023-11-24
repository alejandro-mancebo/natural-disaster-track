
export const getFormatDate = (date: Date) => {
  const currentDate = new Date(date);
  const options: any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  console.log(currentDate.toLocaleDateString('en-us', options));
  return currentDate.toLocaleDateString('en-us', options);
}


