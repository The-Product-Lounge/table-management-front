export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/event-settings/:path*"],
};
