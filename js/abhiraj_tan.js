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

  let welcomePageImg = document.createElement('img');
  welcomePageImg.setAttribute('id', 'welcomePageImg');
  welcomePageImg.setAttribute('class', 'welcomePage__img');
  welcomePageImg.src = "./assets/imgs/logo-jeopardy.jpg";

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
  welcomePage.appendChild(welcomePageImg);
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
  let gameBoardImg = document.createElement('img');
  gameBoardImg.setAttribute('id', 'gameBoardImg');
  gameBoardImg.setAttribute('class', 'gameboard__img');
  gameBoardImg.src = "./assets/imgs/inside-jeopardy.jpg"

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
      // tableData.innerHTML = `Question ${i}-${j}`;
      tableData.innerHTML = `$500`;
      tableData.addEventListener('click', () => {
        let modal = createQuestion(tableData);
        board.appendChild(modal);
      })
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }

  //create control board
  let controlBoard = document.createElement('div');
  controlBoard.setAttribute('id', 'controlBoard');
  controlBoard.setAttribute('class', 'control__board');

  let resetBtn = document.createElement('button');
  resetBtn.setAttribute('id', 'resetBtn');
  resetBtn.setAttribute('class', 'reset__btn');
  resetBtn.innerHTML = 'RESET GAME'
  resetBtn.addEventListener('click',  () => {
    if(confirm('Are you sure to reset this game?'))
    {
      document.body.innerHTML = '';
      createBoard();
    }
  })
  controlBoard.appendChild(resetBtn);

  board.appendChild(gameBoardImg);
  board.appendChild(table);
  document.body.appendChild(board);
  document.body.appendChild(controlBoard);
}

function createQuestion(tableDate){
  //create a modal for question
  let modal = document.createElement("div");
  modal.setAttribute('id', 'modal');
  modal.setAttribute('class', 'modal');

  let modalQuestions = document.createElement("div");
  modalQuestions.setAttribute('id', `modalQuestions`);
  modalQuestions.setAttribute('class', 'modal__questions');
  let modalHeader = document.createElement("h3");
  modalHeader.setAttribute('id', `modalHeader`);
  modalHeader.setAttribute('class', 'modal__header');
  modalHeader.innerHTML = "$500";
  modalQuestions.appendChild(modalHeader);
  let question = document.createElement("h1");
  question.setAttribute('id', `question`);
  question.setAttribute('class', 'question');
  question.innerHTML = "What is the question of $500? aaasdsadsfsda fdsfdsafsd fdsfdsfdsfdsfsd fsdfdsfdsfdfsafsd fsdfdsfasfsdfdsf sdafdsfsdafsdfdsfdsf asdfsdfsdafsafsdaf"
  modalQuestions.appendChild(question);
  let answer = document.createElement("h2");
  answer.setAttribute('id', `answer`);
  answer.setAttribute('class', 'answer');
  answer.innerHTML = "The value is null! LOL"
  modalQuestions.appendChild(answer);

  let groupBtn = document.createElement("div");
  groupBtn.setAttribute('id', 'groupBtn');
  groupBtn.setAttribute('class', 'group__btn');

  let answerBtn = document.createElement("button");
  answerBtn.setAttribute('id', `answerBtn`);
  answerBtn.setAttribute('class', `answer__btn`);
  answerBtn.innerHTML = 'Show Answer';
  answerBtn.addEventListener('click', () => {
    answer.style.visibility = 'visible';
    tableDate.style.color = '#ddd';
    tableDate.style.textDecoration = 'line-through';
  })
  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute('id', `cancelBtn`);
  cancelBtn.setAttribute('class', `cancel__btn`);
  cancelBtn.innerHTML = 'Exit Question';
  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  })

  groupBtn.appendChild(answerBtn);
  groupBtn.appendChild(cancelBtn);
  modalQuestions.appendChild(groupBtn);

  modal.appendChild(modalQuestions);

  return modal;
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
