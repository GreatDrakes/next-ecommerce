// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authoptions";

// Create the NextAuth handler with your options
const handler = NextAuth(authOptions);

// Only export HTTP methods (App Router requirement)
export { handler as GET, handler as POST };
