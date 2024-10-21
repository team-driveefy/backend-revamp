export const successResponseFormatMiddleware = (req, res, next) => {
  const originalSend = res.json;

  res.json = function (body) {
    const modifiedResponse = {
      isError: false,
      statusCode: res.statusCode,
      data: body,
    };

    originalSend.call(this, modifiedResponse);
  };

  next();
};
