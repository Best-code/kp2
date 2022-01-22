import { Session } from 'next-auth';

export const IsAdmin = async (session: Session | null) => {
    let isAdmin = false
    if (session && session.user) {
        const adminRes = await fetch(`http://localhost:3000/api/admin?email=${session.user.email}`)
        isAdmin = await adminRes.json()
    } else {
        isAdmin = false
    }

    return isAdmin
}

export default IsAdmin;
