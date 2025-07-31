export async function uploadImageToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Dummie");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dyltst7s0/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      `Cloudinary upload failed: ${res.status} - ${JSON.stringify(result)}`
    );
  }

  return result.secure_url;
}
