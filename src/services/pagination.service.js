const { MAX_PAGE_SIZE } = require('@/config/constants');

class PaginationService {
  apply(service) {
    if (!service.model) {
      throw Error('Model is required for pagination');
    }

    service.pagination = async (page, limit, filters) => {
      if (limit > MAX_PAGE_SIZE) {
        limit = 500;
      }

      const offset = (page - 1) * limit;
      const rows = await service.model.findAll(limit, offset, filters);
      const count = await service.model.count();
      const pagination = {
        total: count,
        current_page: page,
        per_page: limit
      };
      if (rows.length) {
        pagination.from = offset + 1;
        pagination.to = offset + rows.length;
      }
      return {
        rows,
        pagination
      };
    };
  }
}

module.exports = new PaginationService();
