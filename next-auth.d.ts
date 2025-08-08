import 'next-auth'

declare module 'next-auth' {
    interface User {
        _id: ?string
        username?: string
        email?:string
        isActive?: boolean,
        isVerified?: boolean,
        isAdmin?: boolean
    }
    interface Session {
        user: {
            _id: ?string,
            username?: string,
            isActive?: boolean,
            isVerified?: boolean,
            isAdmin?: boolean,
            email?:string
        }
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        _id: ?string,
        username?: string,
        email?:string
        isActive?: boolean,
        isVerified?: boolean,
        isAdmin?: boolean,
    }
}