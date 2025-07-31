export const baseUrl = "https://api-bakery-production.up.railway.app";

export async function getAllUsers() {
  const url = `${baseUrl}/users`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error getting users", error);
    }

    const usersData = await response.json();
    return usersData;
  } catch (error) {
    console.error(error);
  }
}

export async function createNewUser({ name, email, password }) {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Error al crear el usuario");
  }
  return await response.json();
}
