let idSuivi = null; // mémorise le "suivi" de watchPosition pour pouvoir l'arrêter

// Transforme les données reçues en texte lisible
function formater(position) {
    const c = position.coords;

    // Certaines valeurs valent null si le téléphone ne les connaît pas
    const valeur = (v, unite) => (v === null ? "non disponible" : v.toFixed(2) + " " + unite);

    return (
        "Latitude  : " + c.latitude.toFixed(6) + " °\n" +
        "Longitude : " + c.longitude.toFixed(6) + " °\n" +
        "Altitude  : " + valeur(c.altitude, "m") + "\n" +
        "Précision : " + valeur(c.accuracy, "m") + "\n" +
        "Vitesse   : " + (c.speed === null ? "non disponible" : (c.speed * 3.6).toFixed(1) + " km/h") + "\n" +
        "Date      : " + new Date(position.timestamp).toLocaleString("fr-FR")
    );
}

// Affiche un message d'erreur compréhensible
function erreur(err) {
    const messages = {
        1: "Permission refusée (autorise la localisation).",
        2: "Position indisponible.",
        3: "Délai dépassé."
    };
    return "Erreur : " + (messages[err.code] || err.message);
}

function demarrer() {
    const zoneCurrent = document.getElementById("resultat-current");
    const zoneWatch = document.getElementById("resultat-watch");

    if (!("geolocation" in navigator)) {
        zoneCurrent.textContent = "La géolocalisation n'est pas supportée.";
        return;
    }

    // Options : true = on demande le GPS, false = wifi / 4G suffisent
    const options = {
        enableHighAccuracy: document.getElementById("haute-precision").checked,
        timeout: 20000,
        maximumAge: 0
    };

    zoneCurrent.textContent = "Mesure en cours...";
    zoneWatch.textContent = "Mesure en cours...";

    // Méthode 1 : une seule mesure
    navigator.geolocation.getCurrentPosition(
        (pos) => { zoneCurrent.textContent = formater(pos); },
        (err) => { zoneCurrent.textContent = erreur(err); },
        options
    );

    // Méthode 2 : mesures en continu (on arrête l'ancien suivi d'abord)
    if (idSuivi !== null) {
        navigator.geolocation.clearWatch(idSuivi);
    }
    idSuivi = navigator.geolocation.watchPosition(
        (pos) => { zoneWatch.textContent = formater(pos); },
        (err) => { zoneWatch.textContent = erreur(err); },
        options
    );
}

document.getElementById("btn-relancer").addEventListener("click", demarrer);
document.getElementById("haute-precision").addEventListener("change", demarrer);
demarrer(); // lance tout au chargement de la page