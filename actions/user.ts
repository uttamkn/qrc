"use server";

export const postUser = async (userId: string) => {
  try {
    const res = await fetch(process.env.BACKEND_URL + `/user/${userId}`, {
      method: "POST",
    });

    if (!res.ok) {
      console.error("Failed to create user in backend");
      throw new Error("Failed to create user in backend");
    }
  } catch (error) {
    console.error("An error occurred while creating user", error);
    throw error;
  }
};
