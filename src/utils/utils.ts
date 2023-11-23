// Sweet Alert
import Swal from 'sweetalert2';

export const checkOpeningHours = () => {
    // Obtén la hora actual del usuario en la zona horaria de Argentina (GMT-3)
    var horaActualArgentina = new Date().toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"});
    let dateActualArgentina = new Date(horaActualArgentina);

    // Establece el rango horario del negocio
    var horaApertura;
    var horaCierre;

    // Verifica si es lunes a viernes o sábado/domingo y establece el rango horario correspondiente
    if (dateActualArgentina.getDay() >= 1 && dateActualArgentina.getDay() <= 5) {
        // Lunes a viernes de 20:00 a 12:00
        horaApertura = 16;
        horaCierre = 24; // Representa la medianoche
    } else {
        // Sábado y domingo de 11:00 a 15:00
        horaApertura = 11;
        horaCierre = 15;
    }

    // Obtiene la hora actual en formato de 24 horas
    var horaActual = dateActualArgentina.getHours();

    // Verifica si la hora actual está dentro del rango
    if (horaActual < horaApertura || horaActual >= horaCierre) {
        // Muestra una alerta con el mensaje personalizado
        Swal.fire({
            icon: "warning",
            title: "The business is currently closed",
            text: "Opening Hours: " +
                (horaApertura < 10 ? "0" : "") + horaApertura + ":00 to " +
                (horaCierre < 10 ? "0" : "") + horaCierre + ":00",
            confirmButtonColor: '#E73636'
        })
        return false
    }
    return true
}