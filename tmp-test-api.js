const testApi = async () => {
    try {
        console.log("POSTING.");
        const postRes = await fetch("http://localhost:8080/api/complaints", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title: "Test", description: "H2 DB", category: "tech"})
        });
        console.log("POST STATUS:", postRes.status);
        console.log("POST RES:", await postRes.json());
        
        console.log("GETTING..");
        const getRes = await fetch("http://localhost:8080/api/complaints");
        console.log("GET STATUS:", getRes.status);
        console.log("GET RES:", await getRes.json());
    } catch(e) {
        console.error("Error", e);
    }
}
testApi();
