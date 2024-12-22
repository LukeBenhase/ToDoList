import card from './card.js';

// get all importatnt elements from the HTML file
const addButton = document.getElementById("add");
const projects = document.getElementsByClassName("projects");
const tasks = document.getElementsByClassName("tasks");
const title = document.getElementsByClassName("title");


// store all cards into a nested array of projects
let allProjects = [
    {
      name: "Daily Tasks",
      cards: [
        new card("Complete Assignment", "Finish the math homework and submit it online.", "1/12/24", "high", false),
        new card("Grocery Shopping", "Buy ingredients for dinner, including vegetables, chicken, and spices.", "1/12/24", "high", true)
      ]
    },
    {
      name: "Health",
      cards: [
        new card("Dentist Appointment", "Visit the dentist for the routine check-up.", "5/12/24", "low", true),
        new card("Eye Check-Up", "Schedule an appointment for an eye exam.", "7/12/24", "med", false),
        new card("Vaccination", "Get the annual flu vaccine at the clinic.", "10/12/24", "high", true)
      ]
    }
];

// retrive JSON data from local storage and fill allProjects
// if there is nothing in local storage, then fill it with the allProjects array
if (localStorage.getItem('projects') === null) {
    localStorage.setItem('projects', JSON.stringify(allProjects));
}
else {
    // get the data from the local storage and fill the allProjects array
    // parse the JSON data to create card objects in the array so that they will be useable
    let data = JSON.parse(localStorage.getItem('projects'));
    allProjects = data.map(project => ({
        name: project.name,
        cards: project.cards.map(c => new card(c.title, c.description, c.dueDate, c.priority, c.isChecked))
    }));
}


// display the cards to the screen 
function displayProjects() {

    // clear the projects and tasks section
    projects[0].innerHTML = "";
    tasks[0].innerHTML = `<h2 class="title">Projects</h2>`;

    allProjects.forEach(project => {
        
        // get the project name and add it to the projects section
        const newProject = document.createElement("div");
        newProject.classList.add("card");
        newProject.innerHTML = `<h4>${project.name}</h4> <button>🗑️</button>`;

        const button = newProject.querySelector("button");
            // add button functionality
            button.addEventListener('click', () => {
                newProject.remove();
            });

        projects[0].appendChild(newProject);


        // get all of the cards and add them to the tasks section
        project.cards.forEach(card => {
            // create a new card element
            const newCard = document.createElement("div");
            //newCard.id.add(project.name);
            newCard.classList.add("card");
            newCard.classList.add(card.getPriority());
            newCard.innerHTML = `    
                <input type="checkbox" ${card.getIsChecked() ? "checked" : ""}>
                <h4>${card.getTitle()}</h4>
                <p class="description">${card.getDescription()}</p>
                <p>Due Date: ${card.getDueDate()}</p>
                <button>🗑️</button>
            `;
            const checkbox = newCard.querySelector("input");
            const description = newCard.querySelector(".description");
            const title = newCard.querySelector("h4");
            const button = newCard.querySelector("button");
            // add button functionality
            button.addEventListener('click', () => {
                removeCard(card.getTitle());
                newCard.remove();
            });

            // when adding items if the checkbox is checked, then add the line-through and opacity
            if (card.getIsChecked()) {
                title.style.textDecoration = 'line-through';
                description.style.opacity = '0.7';
            }

            // add checkbox functionality
            checkbox.addEventListener('click', () => {
                card.setIsChecked(!card.getIsChecked());
                if (card.getIsChecked()) {
                    title.style.textDecoration = 'line-through';
                    description.style.opacity = '0.7';
                } else {
                    title.style.textDecoration = 'none';
                    description.style.opacity = '1';
                }
                
                // update the local storage
                localStorage.setItem('projects', JSON.stringify(allProjects));

            });
            tasks[0].appendChild(newCard);
        });
    });
}

function removeCard(title){
    let count = 0;
    let projectCount = 0;
    allProjects.forEach(project => {
        project.cards.forEach(card => {
            
            if (card.getTitle() == title) {
                allProjects[projectCount].cards.splice(count,1);

                // update the local storage
                localStorage.setItem('projects', JSON.stringify(allProjects));

                return;
            }
            count ++;
        });
        projectCount ++;
        // reset the count to 0 so that on the next itteration you are counting from the right number
        count = 0;
    });
}








// information for the form

function showForm() {
    const popup = document.querySelector(".popup");
    popup.style.display = "flex";
}

function hideForm() {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
}

function addCard() {
    // stop default form submission
    event.preventDefault();

    // get the values from the form
    const title = document.getElementById("card-title").value;
    const description = document.getElementById("card-description").value;
    const dueDate = document.getElementById("card-date").value;
    const priority = document.getElementById("card-priority").value;


    const newCard = new card(title, description, dueDate, priority, false);
    allProjects[0].cards.push(newCard);
    // upadate the local storage
    localStorage.setItem('projects', JSON.stringify(allProjects));

    hideForm();
    // update screen with new card
    displayProjects();
}






addButton.addEventListener('click', showForm);

// Add event listener to the form's submit event
document.querySelector('.add-card-form').addEventListener('submit', addCard);



console.log(allProjects);
displayProjects();