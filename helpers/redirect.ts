export const LoggedOutRedirect = () => {
    return {
        redirect: {
            destination: "/api/auth/signin",
            permanent: false
        }

    }
}

export const LoggedInRedirect = (dest : string) => {
    return {
        redirect: {
            destination: dest,
            permanent: true
        }

    }
}