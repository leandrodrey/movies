export async function getUser( email: string, password: string) {
    const loginData = {
        email: email,
        password: password,
    };
console.log(loginData);
console.log(process.env.BASE_API_URL + '/auth/login');
    const res = await fetch(process.env.BASE_API_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
