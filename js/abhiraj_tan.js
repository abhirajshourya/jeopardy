/**
 * A Project by Abhiraj Shourya & Nhut Tan Le
 * For INFO-6122-(02)-23F in Fanshawe College, MAP program.
 */

/**
 * Function to create the Welcome Page of the Game.
 */
function welcomePage(startGame) {
  let welcomePage = document.createElement('div');
  welcomePage.setAttribute('id', 'welcomePage');
  welcomePage.setAttribute('class', 'welcomePage');

  let welcomePageTitle = document.createElement('h1');
  welcomePageTitle.setAttribute('id', 'welcomePageTitle');
  welcomePageTitle.setAttribute('class', 'welcomePage__title');
  welcomePageTitle.innerHTML = `Welcome to Jeopardy!`;

  let welcomePageButton = document.createElement('button');
  welcomePageButton.setAttribute('id', 'welcomePageButton');
  welcomePageButton.setAttribute('class', 'welcomePage__button');
  welcomePageButton.innerHTML = `Start Game`;
  welcomePageButton.addEventListener('click', () => {
    //clear body and load board
    document.body.innerHTML = '';
    startGame();
  });

  welcomePage.appendChild(welcomePageTitle);
  welcomePage.appendChild(welcomePageButton);
  document.body.appendChild(welcomePage);
}

/**
 * Function to create the Jeopardy Board.
 */
function createBoard() {
  let board = document.createElement('div');
  board.setAttribute('id', 'board');
  board.setAttribute('class', 'board');

  //add image, headers, and score

  let table = document.createElement('table');
  table.setAttribute('id', 'table');
  table.setAttribute('class', 'table');

  //create table headers
  let tableHeaders = document.createElement('tr');
  tableHeaders.setAttribute('id', `tableHeaders`);
  tableHeaders.setAttribute('class', 'table__headers');
  for (let i = 1; i <= 6; i++) {
    let tableHead = document.createElement('th');
    tableHead.setAttribute('id', `tableHead-${i}]`);
    tableHead.setAttribute('class', 'table__head');
    tableHead.innerHTML = `Category ${i}`;
    tableHeaders.appendChild(tableHead);
  }
  table.appendChild(tableHeaders);

  //create table rows
  let tableRow = document.createElement('tr');
  tableRow.setAttribute('id', `tableRow`);
  tableRow.setAttribute('class', 'table__row');
  for (let i = 1; i <= 5; i++) {
    let tableRow = document.createElement('tr');
    tableRow.setAttribute('id', `tableRow-${i}`);
    tableRow.setAttribute('class', 'table__row');
    for (let j = 1; j <= 6; j++) {
      let tableData = document.createElement('td');
      tableData.setAttribute('id', `tableData-${i}-${j}`);
      tableData.setAttribute('class', 'table__data');
      tableData.innerHTML = `Question ${i}-${j}`;
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }

  board.appendChild(table);
  document.body.appendChild(board);
}

/**
 * Class to create & start the Jeopardy Game.
 */


/**
 * Initiate the Program.
 */
(function () {
  welcomePage(createBoard);
})();
