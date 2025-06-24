

export async function fetchServer(pageURL: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${pageURL}`,
      );
  
      if (!res.ok) {
        console.error(
          `fetchServer: Failed with status ${res.status} for ${pageURL}`,
        );
        throw new Error("Failed to fetch Props");
      }
  
      const json = await res.json();
      return { data: json.data };
    } catch (error) {
      console.error("fetchServer error:", error);
      return { data: null };
    }
  }