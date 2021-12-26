function ask(answer = 0){
	if (answer){
		for (var i = 0; i < radios.length; i++) {
		    if ( radios[i].checked) {
		        // get checkPosition, set checked flag or do whatever you need to
		        radios[i].checked = false
		        checkPosition = i
		        break
		    }
		}

		if (checkPosition === undefined){
			//lo que sucede si no seleccionas ninguna opcion
			alert("es necesario seleccionar una de las respuestas")
			return
		} else {
			//lo que sucede cuando si esta seleccionada una
			selected = radios[i].id.substr(-1)
			//alert("la respuesta correcta es: " + correctAnsIndex + " y la respuesta seleccionada es " + selected)
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
				alert("la respuesta es correcta")

			} else {
				alert("❌❌❌❌❌❌❌Respuesta incorrecta❌❌❌❌❌❌❌\n                        Acabas de perder todo tu puntaje")
				round = 0; level = "";checkPosition = 0; points = 0;
				window.location.href = "main.html"
			}
		}
		if (round == 5){
			document.getElementById("points").innerHTML = points + " pts ⭐"

			namePlayer = prompt("Has respondido la ultima pregunta! Tu puntaje fue de " + points + "!\nDanos tu nombre y te registraremos en los puntaje maximos!")
			ok = confirm("Hey " + namePlayer +"! ¿Quieres ver los puntajes maximos?")


			//todo lo relacionado a las bases de datos que tenia antes
			//empieza trabajo de base de datos
			writeDB()
			//Agregar el objeto nuevo
			//addObject()
			//colocando intentando ler id
			//howToShowData()
			//
			//showData(e)

			/*
			if( ok == true )
			{
				window.location.href = "highScores.html"
			}
			else
			{
				window.location.href = "main.html"
			}
			*/
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

    //sort
    allAnswers.sort(function() { return Math.random() - 0.5 });
    correctAnsIndex = allAnswers.indexOf(correctAnswer)
    //alert(correctAnsIndex)

    writeInterface()

}

/*
######################################################################
						writing html
######################################################################
*/
function writeInterface(){
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

	//Answers
	var radioAnswers = document.querySelectorAll(".form-check-label")
	for (var i = 0; i < radioAnswers.length; i++) {
		radioAnswers[i].innerHTML = allAnswers[i]
    	//alert(radioAnswers[i].innerHTML)
	}
}





/*
######################################################################
						Database
######################################################################
*/

function writeDB(){
db.open();

//
// Manipulate and Query Database
//
/* para probar otras cosas
db.highScores.bulkPut([
      { namePlayer: "Josephine", points: 21, id: 1 },
      { namePlayer: "Per", points: 75, id: 2 },
      { namePlayer: "Simon", points: 5, id: 3 },
      { namePlayer: "Sara", points: 50, id: 4 }
    ])
*/
console.log("nombre: " + namePlayer + " Puntos: " + points)
db.highScores.add({namePlayer: namePlayer, points: points})

db.highScores
  .where('points').above(0).reverse()
  .toArray(function (temps) {

     //alert("por consola te imprimi tus resultados")
    //console.log(temps.map(temp => temp.JSON.stringify).join('\n'));

    // en esta veo el ejemplo de leerlo y pasarlo a un ubjeto de nuevo
    for (var i = 0;i < temps.length; i++){
      readScores.push(new readingDB(temps[i].id, temps[i].namePlayer, temps[i].points))
      paperHighScores += "#" + (i + 1) +" | " + temps[i].namePlayer + " con " + temps[i].points + " pts (id: " + temps[i].id + " )\n"
      console.log(readScores[i])

    }
    alert(paperHighScores)

    /*ejemplo de como estaba antes
    for (var i = 0;i < temps.length; i++){
      leo = temps[i].namePlayer
      console.log(leo)

    }
    */

    //este es la forma en la que estaba
    //obj = temps.map(JSON.stringify).join('\n');
    //console.log(obj)
  });
}


//funcion constructora
function readingDB(id,namePlayer,points){
  this.id = id
  this.namePlayer = namePlayer
  this.points = points
}
