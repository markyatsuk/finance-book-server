const queryString = require("query-string");
const axios = require("axios");

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { categories } = require("../../services");

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
    console.log("Google USER_DATA", userData.data);

    const { email, picture: avatarURL } = userData.data;
    const { id_token: token } = tokenData.data;

    const user = await User.findOne({ email });

    if (user) {
        await user.updateOne({ token });
    } else {
        // const newUser = await User.create({
        //     email,
        //     token,
        //     avatarURL,
        // });
        // await categories.defaultUserCategories(newUser._id);
    }
    return res.redirect(`${FRONTEND_URL}?token=${token}`);
    // return res.redirect(`${FRONTEND_URL}?email=${userData.data.email}`)
};

module.exports = googleRedirect;
