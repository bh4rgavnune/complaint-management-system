const testUsers = async () => {
    try {
        console.log("Registering admin...");
        const regRes = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "password123", role: "ADMIN" })
        });
        const regData = await regRes.json();
        console.log("Registered:", regData.username);

        console.log("Logging in with same credentials...");
        const loginRes = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "password123" })
        });
        
        if (loginRes.status === 200) {
            const loginData = await loginRes.json();
            console.log("Login SUCCESS, mapped to user:", loginData.username);
        } else {
            console.error("Login FAILED:", loginRes.status, await loginRes.text());
        }
    } catch(e) {
        console.error(e);
    }
};
testUsers();
