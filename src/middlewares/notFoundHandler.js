const notFound = (_, res) => {
  res.error(404, 'Resource not found');
};

module.exports = notFound;
