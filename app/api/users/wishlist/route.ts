import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {

try {

    const {userId} = await auth()

    if(!userId) return new NextResponse("Unauthorized", {status: 401})

    await connectToDB()

    const user = await User.findOne({clerkId : userId})

    if(!user) return new NextResponse("User not found", {status: 404})

    const {productId} = await req.json()

    if(!productId) return new NextResponse("Product ID is required", {status: 400})

    const isLiked = await user.wishlist.includes(productId)

    if(isLiked) {
        user.wishlist = await user.wishlist.filter((id:string) => id !== productId)
    }else {
       await user.wishlist.push(productId)
    }

    await user.save()

    return NextResponse.json(user, {status: 200})

    
} catch (error) {
    console.log("wishlist_POST", error);
    return new NextResponse("Internal error", { status: 500 });
}

}
    