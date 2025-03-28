const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAllChores() {
  try {
    const res = await fetch(`${BASE_URL}/v1/chores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Could not fetch all chores!");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function addNewChore(newChore) {
  try {
    const res = await fetch(`${BASE_URL}/v1/chores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChore),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create new chores.");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteChore(id) {
  try {
    const res = await fetch(`${BASE_URL}/v1/chores/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unable to delete chore.");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function editChore(chore, id) {
  try {
    const res = await fetch(`${BASE_URL}/v1/chores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chore),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to edit chore.");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function completeChore(id) {
  try {
    const bodyDetail = { completedAt: new Date(), status: "completed" };
    const res = await fetch(`${BASE_URL}/v1/chores/${id}/completed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyDetail),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not complete this chore.");

    return;
  } catch (err) {
    console.log(err.message);
  }
}
