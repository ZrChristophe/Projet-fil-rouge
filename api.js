// Fonction avec Fetch API (moderne)
async function getMovieWithFetch(movieId) {
    try {
        // Affichage du loading
        showLoading(true);

        // Requête vers l'API
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);

        // Vérification du statut
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Conversion en JSON
        const movie = await response.json();

        // Traitement des données
        displayMovieInfo(movie);

        return movie;

    } catch (error) {
        console.error('Erreur lors de la récupération du film:', error);
        showError(`Erreur: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// Utilisation
getMovieWithFetch(27205); // Inception
