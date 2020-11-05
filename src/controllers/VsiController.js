module.exports = {
  async getAll(req, res) {
    let data = res.locals.data;
    console.log(data.length);
    res.send({ data: data });
  },
};
