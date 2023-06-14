### Objective

Your assignment is to create a Pokémon API from a CSV file using Node and Express.

### Brief

Dr. Oak has encountered a crisis! A rampaging Blastoise has decimated the server room, leaving all machines in ruin. With no backups available, all data has vanished! Fortunately, Dr. Oak hastily records all the Pokémon from recollection and provides you with the information on a sheet of paper (`/Data/pokemon.csv`). Your mission is to reconstruct the Pokémon Database utilizing this file and establish a Pokémon API to ensure their permanent preservation.

### Tasks

-   Use:
    -   Language: **Node**
    -   Framework: **Express**
-   Implement a Pokémon Model that includes all fields outlined in `/Data/pokemon.csv`
-   Keep everything in memory - no need to create setup a DB
-   Parse the .csv file and create entries for each row based on the following conditions:
    -   Exclude Legendary Pokémon
    -   Exclude Pokémon of Type: Ghost
    -   For Pokémon of Type: Steel, double their HP
    -   For Pokémon of Type: Fire, lower their Attack by 10%
    -   For Pokémon of Type: Bug & Flying, increase their Attack Speed by 10%
    -   For Pokémon that start with the letter **G**, add +5 Defense for every letter in their name (excluding **G**)
-   Create one endpoint `/pokemon`
    -   The API endpoint should be filterable, searchable, and paginatable using query params
        -   Filter: HP, Attack & Defense
        -   Search: name
        -   Pagination: e.g. `/pokemon?page=1`

### Evaluation Criteria

-   **Node** best practices
-   Show us your work through your commit history
-   We're looking for you to produce working code, with enough room to demonstrate how to structure components in a small program
-   Completeness: did you complete the features?
-   Correctness: does the functionality act in sensible, thought-out ways?
-   Maintainability: is it written in a clean, maintainable way?
-   Testing: is the system adequately tested?

### CodeSubmit

Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

Team @charles