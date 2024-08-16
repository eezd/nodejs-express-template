// 获取第 N 页的数据
format_pagination_data = (rows, page_num, offset) => {
  return rows.filter((row) => {
    if (offset != 0) {
      offset = offset - 1;
    } else if (page_num != 0) {
      page_num = page_num - 1;
      return true;
    }
  });
};

module.exports = { format_pagination_data };
