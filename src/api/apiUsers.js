/*const apiUsers_URL: "https://mockapi.io/projects/6874d617dd06792b9c95731f"*/

export async function createNewUser({ name, password }) {
    const apiUrl = 'https://6874d617dd06792b9c95731e.mockapi.io/users';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',            
        }, 
        body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return await response.json();
}