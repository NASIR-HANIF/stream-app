import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export const GET = (request) => {
  // const token = jwt.sign(
  //   {
  //     data: {
  //       name: "nasir hanif",
  //       role: "ADMIN",
  //     },
  //   },
  //   process.env.ADMIN_SECRET,
  //   { expiresIn: 600 }
  // );
  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200 }
  );
};
