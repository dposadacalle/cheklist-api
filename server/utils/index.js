const config = require('../config');

const { pagination } = config;

const paginationParseParams = ({
  limit = pagination.limit,
  skip = pagination.skip,
  page = pagination.page,
}) => ({
  limit: parseInt(limit, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit,
  page: parseInt(page, 10),
});

module.exports = {
  paginationParseParams,
};
