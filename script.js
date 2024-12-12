async function getData () {
    const response = await fetch("https://arbeitnow.com/api/job-board-api", {
        headers: {
            "Content-Type" : "application/json"
        }
    });
    console.log(response);
    const jobData = await response.json();
    console.log(jobData);
}