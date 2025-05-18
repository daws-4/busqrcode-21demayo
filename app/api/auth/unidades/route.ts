import { NextResponse } from "next/server";
import { Secret, sign } from "jsonwebtoken";
import { connectDB } from "@/libs/db";
import unidades from "@/models/unidades";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  connectDB();
  try {
    const {numero} = await request.json();
    console.log(numero);
    const chofer = await unidades.findOne({ numero: numero });
    console.log(chofer);
    if (
      chofer.length == 0
    ) {
        console.log('Invalid credentials');
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    } else {
      const response = chofer;
      console.log(response);
      return NextResponse.json(response);
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json((error as Error).message, {
      status: 400,
    });
  }
}

export async function GET(request: any) {
    connectDB();
    const fisc = await unidades.find();
   return NextResponse.json(fisc);
}
