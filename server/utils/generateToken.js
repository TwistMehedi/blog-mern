import jwt from "jsonwebtoken";

export const generateToken = async (user, res, message) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message,
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Token generation error: ${error.message}`,
      success: false,
    });
  }
};
