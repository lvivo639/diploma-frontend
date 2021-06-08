const errorToString = (error: any) => {
  return (
    error?.response?.data?.message || error?.response?.data || error.toString()
  );
};

export default errorToString;
