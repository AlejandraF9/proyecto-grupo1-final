export async function sendPaymentRequest(userData, userId) {
  try {
    const payload = {
      title: "Payment completed",
      body: userData,
      userId: userId,
    };

    console.log("Enviando datos del pago:", payload);

    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Payment request failed", error);
    }

    const paymentData = await response.json();
    return paymentData;

  } catch (error) {
    console.error(error);
    throw error;
  }
}