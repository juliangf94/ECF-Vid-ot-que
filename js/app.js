var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

//Define Ajouter button//
var button = document.getElementById("addBtn");
// Get references to the popUpForm
var popUpForm = document.getElementById("popUpForm");
// Get references to the table and select element
const table = document.getElementById('myTable');
const select = document.getElementById('sortSelect');
//Array enables storing a collection of multiple items under a single variable name
const rows = Array.from(table.querySelectorAll('tbody tr'));

const form = document.getElementById('movieForm');
//Define submitBtn//
const submitBtn = document.getElementById('submitBtn');
//define error//
const erreur = document.getElementById('erreur');



//Button to popUpForm//
button.addEventListener("click", function (e) {
    e.preventDefault()
    popUpForm.style.display = "block";
    button.style.display = 'none';
});
//Filter// 
document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('myTable');
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', function() {
        const selectedOption = sortSelect.value;
        if (selectedOption === "title") {
            sortTable(0); // Sort by Name (column index 0)
        } else if (selectedOption === "years") {
            sortTable(1); // Sort by Age (column index 1)
        }
    });

    function sortTable(columnIndex) {
        const table = dataTable.querySelector('tbody');
        const rows = Array.from(table.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const cellA = a.children[columnIndex].textContent.trim().toLowerCase();
            const cellB = b.children[columnIndex].textContent.trim().toLowerCase();
            return cellA.localeCompare(cellB);
        });

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        for (const row of rows) {
            table.appendChild(row);
        }
    }
});
// Function to put films in table
function populateTable() {  
    
    //Put a [0] to target the first
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Iterate over the films and create rows
    films.forEach((item, index) => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = item.title;
        cell2.innerHTML = item.years;
        cell3.innerHTML = item.authors;
        //Delete button
        cell4.innerHTML = `
        <button id="deleteBtn" class="btn btn-danger" onclick="deleteRow(${index})">
            Supprimer
        </button>
        `;
        
    });
    
}
// Function to delete a row
function deleteRow(index) {
    if (window.confirm('Voulez-vous supprimer ce film ?')) {
        films.splice(index, 1); // Remove the films item
        populateTable(); // Rebuild the table
        
    }      
}
// Initial table population
populateTable();

//capitalizeFirstLetter()
function capitalizeFirstLetter(movieTitle) {
    return movieTitle.charAt(0).toUpperCase() + movieTitle.slice(1);
}


    

//Function addRow//

function addRow(e) {
    var movieTitle=[]
    var movieYear=[]
    var movieDirector=[]
    var n = 1
    var x = 0

    e.preventDefault();
    
    var newRow = table.insertRow(n);

    movieTitle[x] = document.getElementById("inputTitre").value;
    movieYear[x] = document.getElementById("inputAnnée").value;
    movieDirector[x] = document.getElementById("inputRéalisateur").value;

    
    
    //movieTitle = movieTitle[0].toUpperCase() + movieTitle.slice(1);
    //movieDirector = movieDirector.charAt(0).toUpperCase() +  movieDirector.slice(1);

    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);

    cel1.innerHTML = movieTitle[x];
    cel2.innerHTML = movieYear[x];
    cel3.innerHTML = movieDirector[x];
    cel4.innerHTML = `
        <td>
            <button id="supprimerFilm" type="supprimer" class="btn btn-danger">
                Supprimer
            </button>
        </td>`
    
    n++;
    x++;
     
    //Functions succed message
    function succèsRow() {
        document.getElementById('succès').innerHTML = `
            Film ajouter avec succès
        `; 
        $('#succès').delay(2000).fadeOut();
    }
    setTimeout(succèsRow,500)

    

    films.unshift(film = {
        "title": movieTitle,
        "years": movieYear,
        "authors": movieDirector
    });
    
    // Clear the input field
    inputTitre.value = "";
    inputAnnée.value = "";
    inputRéalisateur.value = "";
}
//Call the function withsubmitBtn //
$(submitBtn).click(function(event){
    addMovie(event);
});


//Add a film//
function addMovie(event) {
    event.preventDefault();
    let inputTitre = document.getElementById('inputTitre')
    let inputAnnée = document.getElementById('inputAnnée').value
    let inputRéalisateur = document.getElementById('inputRéalisateur')


    let date =  new Date().getFullYear();

    let validTitle = inputTitre.value.trim().length >= 2;
    let validYear = (inputAnnée >= "1900") && (inputAnnée <= date);
    let validDirector = inputRéalisateur.value.trim().length >= 5;

    //Functions error´s messages
    function errorTitle() {
        document.getElementById('errorTitle').innerHTML = `
            <li>Erreur dans le formulaire: Il faut au minimun 2 caractères</li>`; 
        $('#errorTitle').delay(3000).fadeOut();
    }
    function errorYear () {
        document.getElementById('errorYear').innerHTML = `
        <li>Erreur dans le formulaire: Vous devez écrire une année entre 1900 et l'année en cours</li>`; 
        $('#errorYear').delay(3000).fadeOut();
    }
    function errorDirector () {
        document.getElementById('errorDirector').innerHTML = `
        <li>Erreur dans le formulaire: Vous devez écrire une année entre 1900 et l'année en cours</li>`;
        $('#errorDirector').delay(3000).fadeOut();
    }
        
    if(validTitle && validYear && validDirector){
        addRow(event)
    } else {
        if (!validTitle && !validYear && !validDirector) {
            setTimeout(errorTitle,500) 
            setTimeout(errorYear,500) 
            setTimeout(errorDirector,500)
        } else if(!validTitle && !validYear) {
                setTimeout(errorTitle,500)
                setTimeout(errorYear,500)
        } else if(!validTitle && !validDirector) {
            setTimeout(errorTitle,500) 
            setTimeout(errorDirector,500) 
        } else if (!validYear && !validDirector) {
            setTimeout(errorYear,500)
            setTimeout(errorDirector,500) 
        } else if (!validTitle) {
            setTimeout(errorTitle,500)
        } else if (!validYear) {
            setTimeout(errorYear,500)
        } else if (!validDirector) {
            setTimeout(errorDirector,500)
        }
    }
};    


// Pass in the id of an element
let confetti = new Confetti('addBtn');

// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true);