var NovDays = 30, DecDays = 31, JanDays = 31;

function open() {
  clearDay()
  let month = document.getElementById("currentMonth").innerHTML
  let out = document.getElementById("wrapper").innerHTML
  let predays, endpredays, days, year
  switch(month){
    case ("11"): predays = 28, endpredays = 31, days = 30, year = 2024; document.getElementById("Month").innerHTML = "11: November"; break;
    case ("12"): predays = 25, endpredays = 30, days = 31, year = 2024; document.getElementById("Month").innerHTML = "12: December"; break;
    case ("1"): predays = 30, endpredays = 31, days = 31, year = 2025; document.getElementById("Month").innerHTML = "1: January"; break;
  }
  for (let i = predays; i <= endpredays; i++) {
    out = out + '<button class="day nonday">' + (i) + "</button>"
  }
  for (let i = 1; i <= days; i++) {
    out = out + '<div class="dayBox" id="' + (i) + 'di" >' + '<button class="day" id="' + (i) + '" onclick="submit(' + (i) + "-" + month + "-" + year + ')" >' + (i) + '</button>' + '</div>'
  }
  for (let i = 1; i < (7 - (endpredays-predays + days) % 7) ; i++) {
    out = out + '<button class="day nonday">' + (i) + "</button>"
  }
  out = out + '</div>'
  document.getElementById("wrapper").innerHTML = out
}

function changeMonth(upDown){
  let month = document.getElementById("currentMonth").innerHTML
  const months = ["11", "12","1"]
  if (upDown == "down" && months.indexOf(month) != 0){
    document.getElementById("currentMonth").innerHTML = months[months.indexOf(month) - 1]
  } else if (upDown == "up" && months.indexOf(month) != months.length -1) {
    document.getElementById("currentMonth").innerHTML = months[months.indexOf(month) + 1]
  }
  reload()
}

function submit(date) {
  console.log("Pressedv2")
  document.getElementById("Display").classList.add("hidden")
  document.getElementById("request").classList.remove("hidden")
  document.getElementById("startdate").value = date
  document.getElementById("enddate").value = date
  colourBall()
}

function clearMark() {
  let marked = document.getElementsByClassName("day")
  for (let l = 0; l < marked.length; l++) {
    marked[l].classList.remove("marked")
  }
}

function clearDay() {
  let out = document.getElementById("wrapper").innerHTML = '<div class="header">Monday</div>' + '<div class="header">Tuesday</div>' + '<div class="header">Wednesday</div>' + '<div class="header">Thursday</div>' + '<div class="header">Friday</div>' + '<div class="header">Saturday</div>' + '<div class="header">Sunday</div>'
}

function colourBall() {
  clearMark()
  let cmoth = document.getElementById("currentMonth").innerHTML
  let currentMonth = parseInt(cmoth)+1
  let start = new Date(document.getElementById("startdate").value)

  startDay = start.getDate()
  startMonth = start.getMonth()+1
  let end = new Date(document.getElementById("enddate").value)
  endDay = end.getDate()
  endMonth = end.getMonth()+1

  if (currentMonth >= startMonth && currentMonth == endMonth) {
    startDay = 1
  } else if (currentMonth == startMonth && currentMonth <= endMonth) {
    endDay = 31
  } else if (currentMonth >= startMonth && currentMonth <= endMonth) {
    startDay = 1
    endDay = 31
  } else if (currentMonth >= startMonth && currentMonth >= endMonth) {
    return
  } else if (currentMonth <= startMonth && currentMonth <= endMonth) {
    return
  }

  for (let i = startDay; i <= endDay; i++) {
    let doc = document.getElementById(i)
    // console.log(doc.id + " " + startMonth + " " + cmoth + " " + currentMonth + " "+ endMonth)
    doc.className = doc.className + " marked"
  }
}

function wc_hex_is_light(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

async function info(name, number){
  const gone = await fetch("/api/gone")
  const json = await gone.json()

  console.log(name + " " + number)
  for (let i = 0; i < json.length; i++) {
    let currentMonth = parseInt(document.getElementById("currentMonth").value)
    let start = new Date(json[i].StartDate)
    startDay = start.getDate()
    startMonth = start.getMonth()
    let end = new Date(json[i].EndDate)
    endDay = end.getDate()

    if (json[i].Name == name && startDay <= number && endDay >= number ){
      document.getElementById("Name").innerHTML = json[i].Name
      document.getElementById("Start-Date").innerHTML = json[i].StartDate
      document.getElementById("End-Date").innerHTML = json[i].EndDate
      document.getElementById("Reason").innerHTML = json[i].Reason
      document.getElementById("Display").classList.remove("hidden")
      document.getElementById("request").classList.add("hidden")
    }
  }
}

async function update(){
  const gone = await fetch("/api/gone")
  const json = await gone.json()
  console.log(json)
  for (let i = 0; i < json.length; i++) {
    let start = new Date(json[i].StartDate)
    let end = new Date(json[i].EndDate)

    let month = parseInt(document.getElementById("currentMonth").innerHTML)

    let startDay = start.getDate, endDay = end.getDate;

    console.log(start + " " + end)
 
    if (month >= start.getMonth() && month == end.getMonth()) {
      startDay = 1
    }else if (month == start.getMonth() && month <= end.getMonth()) {
      endDay = 31
    } else if (month >= start.getMonth() && month <= end.getMonth()) {
      startDay = 1
      endDay = 31
    } else if (month >= start.getMonth() && month >= end.getMonth()) {
      break
    } else if (month <= start.getMonth() && month <= end.getMonth()) {
      break
    }
    
    for (let l = startDay; l <= endDay; l++){
      let bar;
      console.log(l)
      if (wc_hex_is_light(json[i].Colour)){
        bar = "<button style=\" background-color: " + json[i].Colour + "; color: #000 \"  onclick=\"info('" + json[i].Name + "', " + l + ")\" >"
      }else{
        bar = "<button style=\" background-color: " + json[i].Colour + "; color: #ddd \"  onclick=\"info('" + json[i].Name + "', " + l + ")\" >"
      }
      document.getElementById(l + "di").innerHTML = (bar + json[i].Name + "</button>" + document.getElementById(l + "di").innerHTML)
    }
  }
}

function reload(){
  open()
  update()
}

reload()