# ExecuteWithPrefix.ps1

# Fonction pour exécuter une commande avec un préfixe
function Execute-With-Prefix {
    param (
        [string]$Prefix,
        [string]$FilePath
    )

    # Construire la commande complète
    $command = "$Prefix -f `"$FilePath`""
    
    # Afficher et exécuter la commande
    Write-Output "Exécution de : $command"
    Invoke-Expression $command
}

# Préfixe commun
$prefix = "psql -d omovies"

# Chemins des fichiers à exécuter dans l'ordre
$files = @(
    "C:\Users\layk6\Desktop\Apotheose\projet-o-movies-back\data\data.sql",
    "C:\Users\layk6\Desktop\Apotheose\projet-o-movies-back\data\seeding.sql",
    "C:\Users\layk6\Desktop\Apotheose\projet-o-movies-back\data\function.sql"
)

# Boucle sur chaque fichier et exécuter avec le préfixe
foreach ($file in $files) {
    Execute-With-Prefix -Prefix $prefix -FilePath $file
}
