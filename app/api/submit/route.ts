import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt'
require('dotenv').config()

const salt = "lmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolmaolma";
const FLAG = process.env.FLAG

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  if (username == 'admin') {
    console.log(bcrypt.hashSync(username+salt+password, 12))
    return NextResponse.json({
      message: "LOGIN AS ADMIN NOT ALLOWED"
    })
  }

  if (await bcrypt.compare(username+salt+password, '$2b$12$Ga1UIWfKFSjYKB0kmJK88eEj8V/rbDHlGCIGfIq3S3uZdYoqkchFe')) {
    // That hash is bcrypt.hashSync("admin"+salt+"<redacted password>")
    return NextResponse.json({
      message: `the flag is ${FLAG}`
    })
  }
  
  return NextResponse.json({
    message: `hello newb`
  })
}
