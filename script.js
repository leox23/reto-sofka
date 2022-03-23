function ask(answer = 0){
	if (answer){
		for (var i = 0; i < radios.length; i++) {
		    if ( radios[i].checked) {
		        radios[i].checked = false
		        checkPosition = i
		        break
		    }
		}
		if (checkPosition === undefined){
			alert("⚠️Es necesario seleccionar una de las respuestas!⚠️")
			return
		} else {
			//lo que sucede cuando si esta seleccionada una
			selected = radios[i].id.substr(-1)
			if (selected == correctAnsIndex){
				/*
					estos seran los puntajes:
					muy facil  = 2
					facil      = 4
					intermedio = 6
					dificil    = 8
					muy dificil= 10
				*/
				points += pointsPerRound[round]
				round++
			} else {
				alert("❌❌❌❌❌❌❌Respuesta incorrecta❌❌❌❌❌❌❌\n                      💢Acabas de perder todo tu puntaje💢")
				round = 0; level = "";checkPosition = 0; points = 0;
				window.location.href = "index.html"
			}
		}
		if (round == 5){
			document.getElementById("points").innerHTML = points + " pts ⭐"
			namePlayer = prompt("Has respondido la ultima pregunta! Tu puntaje fue de " + points + " pts!\nDanos tu nombre y te registraremos en los puntaje maximos!")
			writeDB(namePlayer,points)
		}
	}
		//redondear abajo, numero random del 1 al 5
	question = Math.floor(Math.random() * 4)
    correctAnswer = allContentQA[round][question][1]
    allAnswers = [
    			  allContentQA[round][question][1],
			      allContentQA[round][question][2],
			      allContentQA[round][question][3],
			      allContentQA[round][question][4]
    			 ]
    //sort answers
    allAnswers.sort(function() { return Math.random() - 0.5 });
    correctAnsIndex = allAnswers.indexOf(correctAnswer)
    writeGameInterface()
}

function retreat(){
	if (points == 0)
	{
		ok = confirm("Aun no tienes puntos y ¡esta pregunta esta facil!, ¿quieres intentar responder?")
		if( ok == false )
		{
			window.location.href = "index.html"
		}
		return
	}
	namePlayer = prompt("Ok! te retiras, obtuviste " + points + "⭐ pts!\nDanos tu nombre y te registraremos en los puntaje maximos!")

	writeDB(namePlayer,points)

}

/*
######################################################################
			game.html to highScores.html
######################################################################
*/
function goToHighScores(){
	ok = confirm("Hey " + namePlayer +"! ¿Quieres ver los puntajes maximos?")

	if( ok == true )
	{
		window.location.href = "highScores.html"
	}
	else
	{
		window.location.href = "index.html"
	}
}

/*
######################################################################
						Writing game.html
######################################################################
*/
function writeGameInterface(){
	//Points
	document.getElementById("points").innerHTML = points + " pts ⭐"
	//Question
	document.getElementById("question").innerHTML = allContentQA[round][question][0]
	//Round and value of points
	switch(round){
		case 0:
			level = "Muy facil"
			break
		case 1:
			level = "Facil"
			break
		case 2:
			level = "Intermedio"
			break
		case 3:
			level = "Dificil"
			break
		case 4:
			level = "Muy dificil"
			break
	}
	document.getElementById("round").innerHTML = "📑 Nivel actual: <b>" + level + "</b>.   |   Ganaras <b>" + pointsPerRound[round] + " pts</b> ⭐ en este round <b>(" + (round + 1) + ")</b>."
	//Checking selected answers
	var radioAnswers = document.querySelectorAll(".form-check-label")
	for (var i = 0; i < radioAnswers.length; i++) {
		radioAnswers[i].innerHTML = allAnswers[i]
	}
}

/*
######################################################################
						Adding data to Database
######################################################################
*/
function writeDB(namePlayer,points){
db.open();
db.highScores.add({namePlayer: namePlayer, points: points})
//para poder darle tiempo de escritura
//porque genera el confirm muy rapido y no se guarda la info
sleep(1000).then(() => {
    goToHighScores()
});
}

/*
######################################################################
		 Writing table highScores.html
######################################################################
*/
function showHighScores(){
db.open();
db.highScores
  .where('points').above(0).reverse()
  .toArray(function (temps){
    for (var i = 0;i < temps.length; i++){
    	//escribiendo fila a fila la tabla
		document.getElementById("contentScores").innerHTML += `
		<tr ${(temps[i].id == temps.length) ? 'style="background-color: rgb(170, 249, 168);"' : 'style="background-color: white;"'}>
		      <th scope="row">${(i < 3) ? (i + 1) + " 🎖" : i + 1}</th>
		      <td>${temps[i].namePlayer}</td>
		      <td>${temps[i].points} ⭐</td>
		      <td>${temps[i].id}</td>
		</tr>`
    }
  });
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
