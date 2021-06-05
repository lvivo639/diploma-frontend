const errorToString = (error: any) => {
  return error?.response?.data?.message || error.toString();
};

export default errorToString;
