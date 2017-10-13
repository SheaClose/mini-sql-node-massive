module.exports = {
  getPlanes(req, res) {
    req.app
      .get('db')
      .get_planes(30)
      .then(planes => res.json(planes));
  }
};
