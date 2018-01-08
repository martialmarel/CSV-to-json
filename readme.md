Hello,

I created 2 node scripts that convert CSV files to JSON with two different approaches:

The first (convert_read_memory_write.js) reads the entire source CSV file, converts line by line to a JavaScript object and stores it in memory. At the end the data stored in memory is written to a file in JSON format.
It was necessary to use a regular expression, to determine all the possible cases of return to the line.

The second one (convert_stream_method.js) uses streams. With the node native module "readline", for each event: "line", the current line is converted into a JavaScript object, and immediately returned to the output write stream in JSON format.
It was necessary to manually manage the beginning is the end of the array, as well as the comma separation of an item when there was more than one.

A lot of logical code (common.js) could be shared as a module exposing several utility functions.

In order to compare the execution time and the memory impact used. A third file called benchmark makes it possible to launch one then the other of the methods with a series of CSV files more or less important in volume of data.
This script was run a hundred times, and generates an interpretable CSV result file in Excel to draw a table and draw a graph.

The scripts take as input one of the CVS files generated with false data using the site
http://www.convertcsv.com/generate-test-data.htm
These files are in the path ( data/CSV/ )
A function built according to the input file the equivalent path for its reflection JSON ( data/JSON/ )

    .
    ├── benchmark.js
    ├── common.js
    ├── convert_read_memory_write.js
    ├── convert_stream_method.js
    ├── data
    │   ├── CSV
    │   │   ├── customer-data.csv
    │   │   ├── large-pipe-separator.csv
    │   │   ├── large.csv
    │   │   ├── medium.csv
    │   │   ├── one-line.csv
    │   │   ├── only-headers.csv
    │   │   ├── pipe-separator.csv
    │   │   ├── semicolon-separator.csv
    │   │   ├── tab-separator.csv
    │   │   └── two-lines.csv
    │   ├── JSON
    │   └── bench
    │       ├── convert_read_memory_write_customer-data.csv
    │       ├── convert_read_memory_write_large.csv
    │       ├── convert_read_memory_write_medium.csv
    │       ├── convert_stream_method_customer-data.csv
    │       ├── convert_stream_method_large.csv
    │       ├── convert_stream_method_medium.csv
    │       └── results.xlsx
    ├── package-lock.json
    └── package.json


-----------------------------------------


Bonjour,

J'ai créé 2 scripts node qui convertisse les fichiers CSV en JSON  avec deux approches différentes :

Le premier (convert_read_memory_write.js) lit intégralement le fichier CSV source, convertit ligne par ligne en objet JavaScript et stock en mémoire. À la fin les données conservées en mémoire sont écrites dans un fichier au format JSON.
Il a été nécessaire d'utiliser une expression régulière, pour déterminer tous les cas possibles de retour à la ligne.

Le second (convert_stream_method.js) utilise les streams. Avec le module natif ”readline”, à chaque événement : "ligne", la ligne courante est convertie en objet JavaScript, et immédiatement renvoyée vers le stream d'écriture de sortie au format JSON.
Il à été nécessaire de gérer manuellement le début est la fin du tableau, ainsi que la séparation par virgule d'un item quand il y en avait plus de un.

Beaucoup de code logique (common.js) a pu être mutualisé sous forme d'un module exposant plusieurs fonctions utilitaire.

Afin de mettre en comparaison le temps d'exécution et l'impact mémoire utilisé. Un troisième fichier appelé benchmark permet de lancer l'un puis l'autre des méthodes avec une série de fichiers CSV plus ou moins importants en volume de données.
Ce script a été lancé une 100 fois, et génère un fichier de résultat  CSV interprétable dans Excel pour dresser un tableau et dessiner un graphique.

Les scripts prennent en entrée un des fichiers CVS générés avec de fausses données à l'aide du site   
http://www.convertcsv.com/generate-test-data.htm
Ces fichiers se situent au chemin ( data/CSV/ )
Une fonction construit en fonction du fichier d'entrée le chemin équivalent pour son reflet JSON ( data/JSON/ )

    .
    ├── benchmark.js
    ├── common.js
    ├── convert_read_memory_write.js
    ├── convert_stream_method.js
    ├── data
    │   ├── CSV
    │   │   ├── customer-data.csv
    │   │   ├── large-pipe-separator.csv
    │   │   ├── large.csv
    │   │   ├── medium.csv
    │   │   ├── one-line.csv
    │   │   ├── only-headers.csv
    │   │   ├── pipe-separator.csv
    │   │   ├── semicolon-separator.csv
    │   │   ├── tab-separator.csv
    │   │   └── two-lines.csv
    │   ├── JSON
    │   └── bench
    │       ├── convert_read_memory_write_customer-data.csv
    │       ├── convert_read_memory_write_large.csv
    │       ├── convert_read_memory_write_medium.csv
    │       ├── convert_stream_method_customer-data.csv
    │       ├── convert_stream_method_large.csv
    │       ├── convert_stream_method_medium.csv
    │       └── results.xlsx
    ├── package-lock.json
    └── package.json
