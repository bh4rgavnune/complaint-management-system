const testEndpoints = async () => {
    console.log("POSTing a new complaint...");
    const postRes = await fetch("http://localhost:8080/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Network Issue", description: "Wifi is dropping constantly", category: "Technical" })
    });
    const postData = await postRes.json();
    console.log(`Created Complaint with ID: ${postData.id}`);

    console.log(`\nGETting /api/complaints/${postData.id}...`);
    const getRes = await fetch(`http://localhost:8080/api/complaints/${postData.id}`);
    const getData = await getRes.json();
    console.log("GET Response:", getData);
};
testEndpoints().catch(console.error);
