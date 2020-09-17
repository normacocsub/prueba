function calcularPulsacion(sexo, edad) {
    var pulsacion = 0;
    if (sexo === "Femenino") {
        pulsacion = (220 - edad) / 10;
    }
    else {
        pulsacion = (210 - edad) / 10;
    }
    document.getElementById("pulsacion").value = pulsacion;
    return pulsacion;
}

function ArmarJSON() {

    /* Sacar los Valores de HTML accediendo al DOM. */
    var e = document.getElementById("sexo");
    var sexo = e.options[e.selectedIndex].value;
    var identificacion = document.getElementById("identificacion").value
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var pulsacion = calcularPulsacion(sexo, edad);/* Calcular la Pulsación*/


    /* Armar un JSON con los datos de la Persona*/
    var persona = {
        "identificacion": identificacion,
        "nombre": nombre,
        "sexo": sexo,
        "edad": edad,
        "pulsacion": pulsacion,
    }
    return persona;
}

function guardarPersona(persona) {
    let personas = [];/* array de personas este servira para hacer una copia de los datos del LocalStorage*/
    var persona = ArmarJSON();

    if (localStorage.getItem('BDLocal') != null) {
        /* Sacar la Información del LocalStorage si hay datos almacenados y guardarla en un array.
            Esto es necesarío porque cada vez que Guardas en el LocalStorage se borra lo que estaba anteriormente
            También es necesario convertir (JSON.Parse) la información a JSON para que los datos 
            en el arry esten en el mismo formato que el nuevo dato a ingresar*/
        personas = JSON.parse(localStorage.getItem('BDLocal'));
    }
    personas.push(persona);/* Addicionar la nueva persona al array de Personas*/
    localStorage.setItem('BDLocal', JSON.stringify(personas));/* Volver a Guardar el Dato en el LocalStorage*/
}

function limpiarTabla(){
    var myTable = document.getElementById("mytable");
var rowCount = myTable.rows.length;
for (var x=rowCount-1; x>0; x--) {
      myTable.deleteRow(x);
}
}

function consultarDatos() {
    limpiarTabla();
    var personas = []; /* Array para sacar los datos a Consultar*/
     
    if (localStorage.getItem('BDLocal') != null) {

        personas = JSON.parse(localStorage.getItem('BDLocal'));
    }
    personas.forEach(item => {
        
        document.getElementById("tbodypulsacion").innerHTML  +=
        '<tr>' +
            '<td align="center" style="dislay: none;">' + item.identificacion + '</td>' +
            '<td align="center" style="dislay: none;">' + item.nombre+ '</td>' +
            '<td align="center" style="dislay: none;">' + item.edad+ '</td>' +
            '<td align="center" style="dislay: none;">' + item.sexo+ '</td>' + 
            '<td align="center" style="dislay: none;">' + item.sexo+ '</td>' + '</tr>';
    });
   }
