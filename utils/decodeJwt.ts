export default function (jwtToken: string) {
    try {
        const payload = jwtToken.split(".")[1];

        return {
            token: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).token,
            user: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).user,
            avatar: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).avatar
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}