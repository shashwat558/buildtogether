import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {username: string}}){
    const {username} = params;
}