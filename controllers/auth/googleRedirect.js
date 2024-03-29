const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } =
  process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const { code } = urlParams;
  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email } = userData.data;

  const user = await User.findOne({ email });

  let token = "";
  let balance = 0;

  const addToken = async (id) => {
    token = await jwt.sign({ _id: id }, process.env.SECRET_KEY);
    await User.findOneAndUpdate({ email }, { token });
  };

  if (!user) {
    await User.create({
      email: userData.data.email,
    });
    const user = await User.findOne({ email });
    await addToken(user._id);
  } else {
    await addToken(user._id);

    balance = user.balance;
  }
  return res.redirect(
    `${FRONTEND_URL}?token=${token}&email=${email}&balance=${balance}`
  );
};

module.exports = googleRedirect;
