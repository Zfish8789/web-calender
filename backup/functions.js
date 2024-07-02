function open() {
  let out = document.getElementById("wrapper").innerHTML
  for (let i = 0; i < 31; i++) {
    out = out + '<button class="day" id="' + (i + 1) + '" ' + 'onclick="submit(' + (i + 1) + ')" >' + (i + 1) + '</button>'
  }
  for (let i = 1; i <= 7 - 31 % 7; i++) {
    out = out + '<button class="day nonday">' + (i) + "</button>"
  }
  out = out + '</div>'
  document.getElementById("wrapper").innerHTML = out
}

function submit(date) {
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
  let end = document.getElementById("enddate");
  let start = document.getElementById("startdate")
  /* if (startEnd == 1) { 
    end.min = start.value
    if (end.value < start.value) {
      end.value = start.value
    }
      }else if (startEnd == 2) { 
    start.max = end.value
    if (end.value < start.value) {
      start.value = end.value
    }
 } */
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

open()
