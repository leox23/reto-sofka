const level1 = [
              [
                "¿Qué color se obtiene de mezclar el rojo con azul?",
                "Morado",
                "Verde",
                "Naranja",
                "Turquesa"
              ],
              [
                "¿Cual es el principal ingrediente del chocolate?",
                "El cacao",
                "La arcilla",
                "La algarroba",
                "La leche"
              ],
              [
                "¿Cuál es la capital de ecuador?",
                "Lima",
                "Quito",
                "San Juan",
                "Buenos Aires",
              ],
              [
                "¿Qué animales protagonizaban serie Tom y Jerry?",
                "Un gato y un ratón",
                "Un zorro y un correcaminos",
                "Un perro y gato",
                "Una vaca y un pollito"
              ],
              [
                "¿Cuál es el animal más grande de la Tierra?",
                "La ballena azul",
                "El elefante",
                "La jirafa",
                "El bisonte volador"
              ]
             ];

const level2 = [
              [
               "En música, ¿cuál de las mencionadas que equivale al tiempo de una blanca?",
                "A dos negras",
                "A dos redondas",
                "A seis semicorcheas",
                "A cuatro negras "
              ],
              [
                "¿Qué significan las siglas CPU en inglés?",
                "Central processing unit",
                "Core powerfull units",
                "Centenary password unerring",
                "Central poor unity"
              ],
              [
                "¿Qué es palabra Long (en inglés) traducida al español?",
                "Largo",
                "Longaniza",
                "Longitud",
                "Latitud"
              ],
              [
                "¿Qué gas liberan las plantas al hacer la fotosíntesis?",
                "Oxígeno",
                "Nitrógeno",
                "Dióxido de carbono",
                "Vapor"
              ],
              [
                "¿Qué significan las siglas FPS en monitores?",
                "Frames per Second",
                "Factor de protección solar",
                "Firs Person Shooter",
                "Feet per second"
              ]
             ]

const level3 = [
              [
                "¿En qué continente está Siria?",
                "Asia",
                "Europa",
                "África",
                "Oceanía"
              ],
              [
                "¿Cuál es el libro sagrado del Islam?",
                "El corán",
                "La biblia",
                "El necronomicon",
                "El alkitab"
              ],
              [
                "Si elevas cualquier número a 0, ¿qué resultado obtienes siempre?",
                "1",
                "0",
                "-1",
                "Infinito"
              ],
              [
                "¿Cuál es el país más grande?",
                "Rusia",
                "Estados unidos",
                "China",
                "Colombia"
              ],
              [
                "¿Cuál es el mineral más duro del planeta?",
                "El diamante",
                "El titanio",
                "El tungsteno",
                "La netherite"
              ]
             ]

const level4 = [
              [
                "¿Cuál es el animal más rápido?",
                "El halcón peregrino",
                "El correcaminos",
                "La gacela",
                "El leopardo"
              ],
              [
                "¿Cuántos huesos tiene el cuerpo humano?",
                "206 huesos",
                "212 huesos",
                "205 huesos",
                "260 huesos"
              ],
              [
                "¿Cuáles son los colores secundarios?",
                "Naranja, verde y violeta",
                "Amarillo azul y rojo",
                "Escarlata, verde y violeta",
                "Verde, morado y bermejo"
              ],
              [
                "¿Cuál es el río más largo del mundo?",
                "El río Amazonas",
                "El río Nilo",
                "El río Misisipi",
                "El río Orinoco"
              ],
              [
                "¿Cuántos pares de costillas tiene un humano promedio?",
                "12 costillas a cada lado",
                "14 costillas a cada lado",
                "8 costillas a cada lado",
                "10 costillas a cada lado"
              ]
             ]


const level5 = [
              [
                "¿Cuántos corazones tiene un gusano de tierra?",
                "Cinco",
                "Uno",
                "Cuatro",
                "Seis"
              ],
              [
                "¿Quién descubrió la penicilina?",
                "Alexander Fleming",
                "Joseph Lister",
                "James Jurin",
                "John Snow"
              ],
              [
                "¿Cuál fue la primera película de Disney?",
                "Blancanieves y los 7 enanitos",
                "Pinocho",
                "Dumbo",
                "Fantasía"
              ],
              [
                "¿En qué año se lanzó el primer viaje a la Luna?",
                "En 1969",
                "En 1970",
                "En 1968",
                "En 1967"
              ],
              [
                "¿Qué animal provoca más muertes al año en todo el mundo?",
                "El mosquito",
                "El tiburón",
                "El león",
                "Las pirañas"
              ]
             ]

const allContentQA = [level1, level2, level3, level4, level5]
                  /*
                    estos seran los puntajes:
                    muy facil  = 4
                    facil      = 5
                    intermedio = 6
                    dificil    = 7
                    muy dificil= 8
                  */
const pointsPerRound = [2,4,6,8,10]
const radios = document.getElementsByClassName("form-check-input")

var round = 0; level = "";checkPosition = 0; points = 0; namePlayer = "";

