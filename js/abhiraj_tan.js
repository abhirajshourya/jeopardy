/**
 * A Project by Abhiraj Shourya & Nhut Tan Le
 * For INFO-6122-(02)-23F in Fanshawe College, MAP program.
 */

class JeopardyGame {
  questions = [];
  categories = [];
  score = 0;
  values = [100, 200, 300, 400, 500];

  constructor() {
    this.questions = [];
    this.categories = [];
    this.score = 0;
  }

  updateScore = (value) => {
    this.score += value;
    document.getElementById('scoreBoard').innerHTML = `Score: $${this.score}`;
  };

  welcomePage() {
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
    welcomePageImg.src = './assets/imgs/logo-jeopardy.jpg';

    let welcomePageButton = document.createElement('button');
    welcomePageButton.setAttribute('id', 'welcomePageButton');
    welcomePageButton.setAttribute('class', 'welcomePage__button');
    welcomePageButton.innerHTML = `Start Game`;
    welcomePageButton.addEventListener('click', () => {
      //clear body and load board
      document.body.innerHTML = '';
      this.createBoard();
    });

    welcomePage.appendChild(welcomePageTitle);
    welcomePage.appendChild(welcomePageImg);
    welcomePage.appendChild(welcomePageButton);
    document.body.appendChild(welcomePage);
  }

  async createBoard() {
    //loading screen
    let loadingPage = document.createElement('div');
    loadingPage.setAttribute('id', 'loadingPage');
    loadingPage.setAttribute('class', 'loading__Page');
    document.body.appendChild(loadingPage);
    let loading = document.createElement('div');
    loading.setAttribute('id', 'loading');
    loading.setAttribute('class', 'loading');
    loadingPage.appendChild(loading);

    //load categories
    // this.categories = await fetch(`https://jservice.io/api/categories?count=6&offset=10`).then(
    //   (response) => response.json()
    // );

    let board = document.createElement('div');
    board.setAttribute('id', 'board');
    board.setAttribute('class', 'board');

    let table = document.createElement('table');
    table.setAttribute('id', 'table');
    table.setAttribute('class', 'table');

    //create table headers
    let tableHeaders = document.createElement('tr');
    tableHeaders.setAttribute('id', `tableHeaders`);
    tableHeaders.setAttribute('class', 'table__headers');
    for (let i = 1; i <= 6; i++) {
      let tableHead = document.createElement('th');
      tableHead.setAttribute('id', `tableHead-${i}`);
      tableHead.setAttribute('class', 'table__head');
      // tableHead.innerHTML = `${this.categories[i - 1].title}`;
      tableHead.innerHTML = `Category ${Math.ceil(Math.random() * Math.random() * 100)}`;
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
        //load clue
        // let clue = await fetch(
        //   `https://jservice.io/api/clues?category=${this.categories[j - 1].id}&value=${
        //     this.values[i - 1]
        //   }`
        // ).then((response) => response.json());

        // let question = new JeopardyQuestion(
        //   clue[0].question,
        //   clue[0].answer,
        //   clue[0].value,
        //   this.categories[j - 1].title
        // );

        // this.questions.push(question);

        let cell = document.createElement('td');
        cell.setAttribute('id', `tableData-${i}-${j}`);
        cell.setAttribute('class', 'table__data');
        cell.innerHTML = `$${this.values[i - 1]}`;
        cell.addEventListener('click', () => {
          let question = new JeopardyQuestion(
            `Question ${i} ${j}`,
            `Answer ${i} ${j}`,
            this.values[i - 1],
            `Category ${j}`
          );
          let modal = question.createQuestionModal(cell, this.updateScore);
          board.appendChild(modal);
        });
        tableRow.appendChild(cell);
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
    resetBtn.innerHTML = 'Reset';
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure to reset this game?')) {
        document.body.innerHTML = '';
        this.score = 0;
        this.createBoard();
      }
    });

    let boardTitle = document.createElement('h1');
    boardTitle.setAttribute('id', 'boardTitle');
    boardTitle.setAttribute('class', 'board__title');
    boardTitle.innerHTML = 'Jeopardy!';

    let scoreBoard = document.createElement('div');
    scoreBoard.setAttribute('id', 'scoreBoard');
    scoreBoard.setAttribute('class', 'score__board');
    scoreBoard.innerHTML = `Score: $${this.score}`;

    controlBoard.appendChild(scoreBoard);
    controlBoard.appendChild(boardTitle);
    controlBoard.appendChild(resetBtn);

    //container
    let container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('class', 'container');

    container.appendChild(controlBoard);
    container.appendChild(table);
    board.appendChild(container);
    document.body.appendChild(board);

    //remove loading
    document.body.removeChild(loadingPage);
  }
}

class JeopardyQuestion {
  question = '';
  answer = '';
  value = 0; // 100, 200, 300, 400, 500
  category = '';
  isCorrect = false;

  constructor(question, answer, value, category) {
    this.question = question;
    this.answer = answer;
    this.value = value;
    this.category = category;
  }

  /**
   * Function to create the Question Modal.
   */
  createQuestionModal(cell, updateScore) {
    let modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'modal');

    let modalQuestions = document.createElement('div');
    modalQuestions.setAttribute('id', `modalQuestions`);
    modalQuestions.setAttribute('class', 'modal__questions');
    let modalHeader = document.createElement('h3');
    modalHeader.setAttribute('id', `modalHeader`);
    modalHeader.setAttribute('class', 'modal__header');
    modalHeader.innerHTML = `$${this.value}`;
    modalQuestions.appendChild(modalHeader);
    let question = document.createElement('h2');
    question.setAttribute('id', `question`);
    question.setAttribute('class', 'question');
    question.innerHTML = this.question;
    modalQuestions.appendChild(question);
    let answer = document.createElement('h2');
    answer.setAttribute('id', `answer`);
    answer.setAttribute('class', 'answer');
    answer.innerHTML = this.answer;
    modalQuestions.appendChild(answer);

    let groupBtn = document.createElement('div');
    groupBtn.setAttribute('id', 'groupBtn');
    groupBtn.setAttribute('class', 'group__btn');

    let answerBtn = document.createElement('button');
    answerBtn.setAttribute('id', `answerBtn`);
    answerBtn.setAttribute('class', `answer__btn`);
    answerBtn.innerHTML = 'Show Answer';

    let cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', `cancelBtn`);
    cancelBtn.setAttribute('class', `cancel__btn`);
    cancelBtn.innerHTML = 'Exit Question';
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    groupBtn.appendChild(answerBtn);
    groupBtn.appendChild(cancelBtn);
    modalQuestions.appendChild(groupBtn);

    modal.appendChild(modalQuestions);

    if (cell.classList.contains('answered__question')) {
      answer.style.visibility = 'visible';
      answerBtn.style.display = 'none';
    } else {
      answerBtn.addEventListener('click', () => {
        answer.style.visibility = 'visible';
        cell.classList.add('answered__question');
        updateScore(this.value);
      });
    }

    return modal;
  }
}

/**
 * Initiate the Program.
 */
(function () {
  let jeopardyGame = new JeopardyGame();
  jeopardyGame.welcomePage();
})();
