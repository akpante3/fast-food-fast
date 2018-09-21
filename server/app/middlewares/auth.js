
const auth = (req, res, next) => {
  const username = req.body.username.trim();

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  if (!req.body.email || !req.body.password || !req.body.username || !req.body.address) {
    return res.status(400).send({
      status: 'failure',
      message: 'please input a valid password, username, email, address',
    });
  }
  if (!validateEmail(req.body.email) || !(/^[a-zA-Z]+$/.test(username))) {
    return res.status(400).send({
      status: 'failure',
      message: 'invalid email or username,please input a valid email',
    });
  }

  next();
};

export default auth;

