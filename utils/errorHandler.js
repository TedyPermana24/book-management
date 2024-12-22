module.exports = {
    handleError: (res, error, defaultMessage = 'Internal server error.', statusCode = 500) => {
      console.error(error); 
      res.status(statusCode).json({ message: defaultMessage });
    },
  
  };
  