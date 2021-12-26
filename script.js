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

			//empieza trabajo de base de datos
			initializeDB()
			//Agregar el objeto nuevo
			addObject()
			//colocando intentando ler id
			howToShowData()
			//
			showData(e)

			if( ok == true )
			{
				window.location.href = "highScores.html"
			}
			else
			{
				window.location.href = "main.html"
			}
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




//video 1 de indexedDB - - - - - - - - - - - - - - - - - - -
function initializeDB(){
	//colocar a variable para referenciar desde javascript, en highScore.html
	//debe haber una etiqueta html con el ID zonadatos
	//lo comento porque ese elemento no lo tengo y da error
	//zonadatos = docuement.getElementById("zonadatos")
	//conexion a la base de datos
	var solicitud = indexedDB.open("highScoresDB")
	//en caso de que la creacion de la base de datos haya tenido exito
	//							esta funcion es una funcion anonima
	solicitud.onsuccess = function(e){
		bd = e.target.result
	}

	//ahora a crear almacen de objeto, aparentemente hay que hacerlo por cada
	//objeto que se vaya agregando
	solicitud.onupgradeneeded = function(e){
		//por motivos locos esto va aca
		bd = e.target.result
		//.createObjectStore() metodo que crea un almacen de datos dentro de la base de datos
		// con dos parametros: (nombre de almacen de objetos, y campo clave)
		bd.createObjectStore("allScores", {keyPath: "id"})
		// el ejemplo era
	  //bd.createObjectStore("gente", {keyPath: "clave"})
	}
}

//video 2 de indexedDB - - - - - - - - - - - - - - - - - - -
//funcion para agregar objeto en la base de datos
function addObject(){
	//cuando se gane o cuando se retire el jugador, se pide el nombre por prompt para registrarlo - Se obtuvo el nombre del jugador en la variable [namePlayer]
	//namePlayer
	 //!!!!tengo un rollo con esto tiene como sintaxis y como variable transaction asi que tengo que estar pendiente
	var trans = bd.transaction(["allScores"], "readwrite")
	var store = trans.objectStore("allScores")

	//aqui en lo siguiente se hace la escritura
	//########## me falta poder tener a disposicion la variable [id] para eso tengo que leer la variable de la base de datos, ver cual es el indice mayor de ID para crear el siguiente, y si no existe, se debe crear el numero 1, esto para evitar inconsistencias, es lo primero que tengo que hacer:
	//1) leer ID, ver que tipo de variable devuelve si no ha sido creada, y aprender a leer el que mayor valor tiene de todas, igual que el high score
	var addInfo = store.add({id: id, namePlayerDB: namePlayer, pointsDB : points})


	//#############
	//en caso de tener exito agregando la info, entonces lanzar funcion
	addinfo.addEventListener("success", howToShowData, false)

}


//demo de funcion de como mostrar objeto
function howToShowData(){
	//declarar para referenciar
	//   bd ya estaba declarada globalmente en funcion anterior
	var trans = bd.transaction(["allScores"], "readonly")
	var store = trans.objectStore("allScores")

	//este es el cursor con el que indizaras
	var cursor = store.openCursor()
	alert("entre a howtoshowdata")
	cursor.addEventListener("success", showData, false)
}

function showData(e){
	var cursor = e.target.result
	if(cursor){
		alert(cursor.value.id + " - " + cursor.value.namePlayerDB + " - " + cursor.value.pointsDB)
		/*
			ejemplo de como agregar los datos que esta señalando cursor

				// asi lo habia declarado arriba
			//var addInfo = store.add({id: id, namePlayerDB: namePlayer, pointsDB : points})

			zonadatos.innetHTML += "<div>" + cursor.value.idDB + " - " + cursor.value.namePlayerDB + " - " + cursor.value.pointsDB + "</div>"

			// para hacer avanzar el cursor
			cursor.continue()


		*/

	}

}
