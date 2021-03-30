const config = require('../config');

const { pagination, sort } = config;

const paginationParseParams = ({
  limit = pagination.limit,
  skip = pagination.skip,
  page = pagination.page,
}) => ({
  limit: parseInt(limit, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit,
  page: parseInt(page, 10),
});

const sortParseParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields
) => {
  const safelist = {
    sortBy: [...Object.getOwnPropertyNames(fields), ...sort.sortBy.fields],
    direction: sort.direction.options,
  };
  return {
    sortBy: safelist.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: safelist.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

const sortCompactToStr = (sort, direction) => {
  const dir = direction === sort.direction.default ? '-' : '';
  return `${dir}${sortBy}`;
};

module.exports = {
  paginationParseParams,
  sortParseParams,
  sortCompactToStr,
};
