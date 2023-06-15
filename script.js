/* variables html */
const textArea = document.querySelector(".ingresar");
const resultado = document.querySelector(".resultado");
const botonCopiar = document.querySelector(".btnCopiar");
const informacion = document.querySelector(".textNegrita");
const informacion2 = document.querySelector(".textNormal");
const advertencia = document.querySelector(".advertencia");
const cajaResultado = document.querySelector(".cajaResultado");
const informe = document.querySelector(".informe");
const informe2 = document.querySelector(".informe2");
const textResultado = document.querySelector(".textResultado");

/* variables extras */
let matrizCodigoCarac = ["é", "í", "á", "ó", "ú" , "!", "@", "#", "$", "^", "&", "%", "*", "(", ")", "+", "=", "-", "[", "]", "{", "}", "|", ":", "<", ">", "?", ",", ".", "¿", "¡", "´", "/"];
let errores = false; //variable auxiliar para detectar errores en los carcateres
let cont = 0; //variable auxiliar para detectar si el texto ingresado ya esta encriptado
let matrizCodigo = [["e", "enter"],
                        ["i", "imes"], 
                        ["a", "ai"],
                        ["o", "ober"],
                        ["u", "ufat"]];

/* Ajuste de resolución */
function resultadoCelular() {
    if (window.matchMedia("(max-width: 420px)").matches) {
            resultado.style.lineHeight = "180%";
            cajaResultado.style.height = "100%";
      }

      if (window.matchMedia("(min-width: 500px) and (max-width: 1020px)").matches) {  
            cajaResultado.style.height = "700px";
            cajaResultado.style.marginBottom = "15px";
        }
}

/* Encriptar datos */
function encriptar(stringEncriptador) {
    stringEncriptador = stringEncriptador.toLowerCase();
    stringEncriptador = validarTexto(stringEncriptador);

    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringEncriptador.includes(matrizCodigo[i][0])) {
            stringEncriptador = stringEncriptador.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }

    return stringEncriptador;
}

/* Desencriptar datos */
function desencriptar(stringDesencriptador) {
    stringDesencriptador = stringDesencriptador.toLowerCase();
    stringDesencriptador = validarTexto(stringDesencriptador);

    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringDesencriptador.includes(matrizCodigo[i][1])) {
            stringDesencriptador = stringDesencriptador.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
            cont++;
        }
    }

    return stringDesencriptador;
}

/* Ajuste de texto */
function ajusteTexto(stringTexto) {
    if(stringTexto != ""){
        resultadoCelular()
        resultado.style.backgroundImage = "none";
        informacion.style.display = "none";
        informacion2.style.display = "none";
        resultado.value = "";
        resultado.value = stringTexto;
        botonCopiar.style.display = "block";
    }  
}

/* Validar caracteres en el texto*/
function validarTexto(stringTilde) {
    for(let i = 0; i < matrizCodigoCarac.length; i++) {
        if(stringTilde.includes(matrizCodigoCarac[i])) {
            textArea.value="";
            errores = true;
            advertencia.style.color = "red";
            informe2.style.display = "block";
            textResultado.append(stringTilde[stringTilde.indexOf(matrizCodigoCarac[i])]); 
            setTimeout(function(){
                informe2.style.display = "none";
                textResultado.innerHTML = " ";
            }, 1700);
        }
    }
    return stringTilde
}

/* Botones */
function btnEncriptar(){
    let textoEncriptado = encriptar(textArea.value);
    if(errores == true){
        errores = false;
    } else {
        ajusteTexto(textoEncriptado);
        textArea.value = "";
        advertencia.style.color = "";
    }
}

function btnDesencriptar(){
    let textoEncriptado = desencriptar(textArea.value);
    if(errores == true){ 
        errores = false;
        cont = 0;
    } else {
        if(cont != 0) { 
            cont = 0;
            ajusteTexto(textoEncriptado);
            textArea.value = "";
        }
        advertencia.style.color = "";
    }
}

function btnCopiar() {
    var contenido = document.getElementById('textoCopiar');

    contenido.select();
    document.execCommand('copy');
    resultado.value = "";
    informe.style.display = "block";

    setTimeout(function(){
        informe.style.display = "none";
    }, 1100);
}

/* Evento de movimiento */
window.addEventListener('load', function() {
    let animacion1 = document.querySelector(".cajaIngresar");
    let animacion2 = document.querySelector(".cajaResultado");

    animacion1.style.animation = 'mover2 1s ease-out';
    animacion2.style.animation = 'mover 1s ease-out';
});