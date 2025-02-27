const PostFunction = async (url: string, content: unknown) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add to db");
      }
  
      const data = await res.json();
      return { status: "success", data };
    } catch (error) {
      console.error("Update Error:", error);
      return { status: "error", error };
    }
  };
  
  export default PostFunction;
  