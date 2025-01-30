"use server";

export const postUser = async (userId: string) => {
  try {
    const res = await fetch(process.env.BACKEND_URL + `/user/${userId}`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Failed to create user in backend");
    }
  } catch (error) {
    throw error;
  }
};
