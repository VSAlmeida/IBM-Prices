module.exports = {
  async getAll(req, res) {
    let data = res.locals.data;
    console.log(data.length)
    //data.sort((a,b) => (a.instanceFamily > b.instanceFamily) ? 1 : ((b.instanceFamily > a.instanceFamily) ? -1 : 0));
    res.send({ data: data });
  },
};
