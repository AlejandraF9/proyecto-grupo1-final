const baseUrl = "https://api-bakery-production.up.railway.app";

//function para traer todos los usuarios de la newsletter

export async function getAllNewsletterEmails() {
  try {
    const response = await fetch(`${baseUrl}/newsletters`);

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error(error);
    throw error;
  }
}

//function para crear el nuevo usuario de la newsletter



export async function createUserFromNewsletter(parametro) {
    const url =`${baseUrl}/newsletters`;
    try{
        const response= await fetch(url, {
            method:"POST",
            headers: {"Content-Type":"application/json",},
            body:JSON.stringify({
                nombre:parametro.nombre,
                email:parametro.email
            })
        })
        if (!response.ok){
            throw new Error (`Error${response.status}`)
        }
        const data= await response.json();
        return data;
    }catch (error){
        console.error(error)
        throw error;
    }   
}

