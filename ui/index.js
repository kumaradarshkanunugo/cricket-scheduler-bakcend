fetch("/schedules").then(async function(response){
    const schedules = await response.json();
    console.log(schedules);
})