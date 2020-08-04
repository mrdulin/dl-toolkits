function resExtend(req, res, next) {
  function apiSuccess(data) {
    res.json({
      status: 'ok',
      result: data,
    });
  }

  function apiError(err) {
    res.json({
      status: 'error',
      errorCode: err.errorCode || 'UNKNOWN',
      errorMessage: err.errorMessage || err.toString(),
    });
  }

  res.apiSuccess = apiSuccess;
  res.apiError = apiError;

  next();
}

export { resExtend };
