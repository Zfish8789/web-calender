function open() {
  let out = document.getElementById("wrapper").innerHTML
  for (let i = 0; i < 31; i++) {
    out = out + '<div class="dayBox" id="' + (i + 1) + 'di" >' + '<button class="day" id="' + (i + 1) + '" onclick="submit(' + (i + 1) + ')" >' + (i + 1) + '</button>' + '</div>'
  }
  for (let i = 1; i <= 7 - 31 % 7; i++) {
    out = out + '<button class="day nonday">' + (i) + "</button>"
  }
  out = out + '</div>'
  document.getElementById("wrapper").innerHTML = out
}

function submit(date) {
  console.log("Pressedv2")
  document.getElementById("Display").classList.add("hidden")
  document.getElementById("request").classList.remove("hidden")
  document.getElementById("startdate").value = date
  document.getElementById("enddate").value = date
  colourBall()
}

function clear() {
  let marked = document.getElementsByClassName("day")
  for (let l = 0; l < marked.length; l++) {
    //console.log(marked[l].classList + " " + marked[l].id)
    marked[l].classList.remove("marked")
  }
}

function button(startEnd) {
  colourBall()
}

function colourBall() {
  clear()
	let start = parseInt(document.getElementById("startdate").value)
	let end = parseInt(document.getElementById("enddate").value)
	console.log(start)
	console.log(end)
  for (let i = start; i <= end; i++) {
    let doc = document.getElementById(i)
    console.log(doc.id)
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
    let start = new Date(json[i].StartDate)
    start = start.getDate()
    let end = new Date(json[i].EndDate)
    end = end.getDate()

    if (json[i].Name == name && start <= number && end >= number ){
      document.getElementById("Name").innerHTML = json[i].Name
      document.getElementById("Start-Date").innerHTML = json[i].StartDate.substr(0,10)
      document.getElementById("End-Date").innerHTML = json[i].EndDate.substr(0,10)
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
    start = start.getDate()
    let end = new Date(json[i].EndDate)
    end = end.getDate()

    console.log(start + " " + end)
    for(let l = start; l <= end; l++){
      let bar;
      if (wc_hex_is_light(json[i].Colour)){
        bar = "<button style=\" background-color: " + json[i].Colour + "; color: #000 \"  onclick=\"info('" + json[i].Name + "', " + l + ")\" > "
        
      }else{
        bar = "<button style=\" background-color: " + json[i].Colour + "; color: #ddd \"  onclick=\"info('" + json[i].Name + "', " + l + ")\" > "
      }
      document.getElementById(l + "di").innerHTML =
        ( bar + json[i].Name + "</button>" + document.getElementById(l + "di").innerHTML)
    }
  }
} 

open()
update()