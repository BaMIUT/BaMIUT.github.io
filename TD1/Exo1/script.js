// Transforme une position en texte lisible
function formater(position) {
    const c = position.coords;
    return "Latitude : " + c.latitude + "\n" +
           "Longitude : " + c.longitude + "\n" +
           "Altitude : " + c.altitude + " m\n" +
           "Précision : " + c.accuracy + " m\n" +
           "Vitesse : " + c.speed + " m/s\n" +
           "Date : " + new Date(position.timestamp).toLocaleString("fr-FR");
}

const zoneCurrent = document.getElementById("resultat-current");
const zoneWatch = document.getElementById("resultat-watch");

// Pour tester sans GPS, mets false (wifi / 4G)
const options = { enableHighAccuracy: true };

// Méthode 1 : une seule mesure
navigator.geolocation.getCurrentPosition(
    (pos) => { zoneCurrent.textContent = formater(pos); },
    (err) => { zoneCurrent.textContent = "Erreur : " + err.message; },
    options
);

// Méthode 2 : mesures en continu
navigator.geolocation.watchPosition(
    (pos) => { zoneWatch.textContent = formater(pos); },
    (err) => { zoneWatch.textContent = "Erreur : " + err.message; },
    options
);