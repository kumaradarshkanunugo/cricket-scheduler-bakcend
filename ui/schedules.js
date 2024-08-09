const getSchedules = async () => {
    const response = await fetch("/schedules");
    const schedules = await response.json();
    return schedules;
}

const onLoad = async () => {
    const schedules = await getSchedules();
    const sortedSchedules = schedules.sort((a,b) => {
        return a.timeStamp - b.timeStamp
    });

    sortedSchedules.forEach(element => {
        const table = document.getElementById("scheduleTable");
        const tableRow = table.insertRow();

        const dateCell = tableRow.insertCell();
        dateCell.innerHTML = new Date(element.timeStamp).toLocaleDateString();
        
        const timeCell = tableRow.insertCell();
        timeCell.innerHTML = tConvert(new Date(element.timeStamp).toLocaleTimeString());
        
        const teamCell = tableRow.insertCell();
        teamCell.innerHTML = element.team;
        
        const opponentCell = tableRow.insertCell();
        opponentCell.innerHTML = element.opponent;
        
        const oversCell = tableRow.insertCell();
        oversCell.innerHTML = element.overs;
        
        const groundCell = tableRow.insertCell();
        groundCell.innerHTML = `<a href="${element.groundLocation}" target="_blank">${element.groundName}</a>`

    });
}

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
      time[0] = time[0] < 10 ? `0${time[0]}` : time[0];
      delete time[3];
    }
    return time.join (''); // return adjusted time or original string
  }

onLoad();