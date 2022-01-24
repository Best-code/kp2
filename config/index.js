const dev = process.env.NODE_ENV !== "production"
export const serverRoute = dev ? 'http://localhost:3000' : 'https://kilpatty.vercel.app'