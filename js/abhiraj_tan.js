/**
 * A Project by Abhiraj Shourya & Nhut Tan Le
 * For INFO-6122-(02)-23F in Fanshawe College, MAP program.
 */

/**
 * *************************************************************
 * Class for Jeopardy Game.
 * *************************************************************
 */
class JeopardyGame {
  questions = [];
  clues = {};
  categories = [];
  score = [];
  winners = [];
  values = [100, 200, 300, 400, 500];
  /**
   * This is because all offsets do not have questions for all values and it takes a lot of
   * time to load the game to skip the empty values programmatically.
   */
  workingOffsets = [10, 35, 70, 85];

  constructor() {
    this.questions = [];
    this.categories = [];
    this.clues = {};
    this.score = [];
    if (readJsonFromCookie('winners') != null) {
      this.winners = readJsonFromCookie('winners');
    } else {
      this.winners = [];
    }
  }

  /**
   * *************************************************************
   * Function to create the Welcome Page.
   * *************************************************************
   */
  welcomePage() {
    /**
     * Remove all elements from the body.
     */
    document.body.innerHTML = '';

    /**
     * Create welcome page and set Title and Logo.
     */
    let welcomePage = createElement('div', 'welcomePage');
    let welcomePageTitle = createElement('h1', 'welcomePageTitle');
    welcomePageTitle.innerHTML = `Welcome to Jeopardy!`;
    let welcomePageImg = createElement('img', 'welcomePageImg');
    welcomePageImg.src = './assets/imgs/logo-jeopardy.jpg';

    /**
     * Create input group for player selection.
     */
    let inputGroup = createElement('div', 'inputGroup');
    let playerSelectLabel = createLabel('Select Number of Players: ', 'playerSelect');
    let playerSelectInput = createInput('select', 'playerSelect');
    playerSelectInput.innerHTML = `
      <option value="1">1</option>
      <option selected value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    `;
    inputGroup.appendChild(playerSelectLabel);
    inputGroup.appendChild(playerSelectInput);

    /**
     * Create start game button.
     */
    let welcomePageButton = createElement('button', 'welcomePageButton');
    welcomePageButton.innerHTML = `Start Game`;
    welcomePageButton.addEventListener('click', () => {
      this.startGame(playerSelectInput.value, this.score);
    });

    /**
     * Append all elements to the body.
     */
    welcomePage.appendChild(welcomePageTitle);
    welcomePage.appendChild(welcomePageImg);
    welcomePage.appendChild(inputGroup);
    welcomePage.appendChild(welcomePageButton);
    document.body.appendChild(welcomePage);
  }

  /**
   * *************************************************************
   * Function to update the score of the player.
   * @param {int} numberOfPlayer Number of players
   * @param {int} score Score of each player
   * *************************************************************
   */
  async createBoard(numberOfPlayer, score) {
    /**
     * Create loading page.
     */
    let loadingPage = createElement('div', 'loadingPage');
    let loading = createElement('div', 'loading');
    loadingPage.appendChild(loading);
    document.body.appendChild(loadingPage);

    /**
     * Call the APIs to load the game.
     */
    await this.getJeopardyGame();

    /**
     * *************************************************************
     * Create board, container, table, and table headers.
     * *************************************************************
     */
    let board = createElement('div', 'board');
    let containerTable = createElement('div', 'container__table');
    let table = createElement('table', 'table');
    let tableHeaders = createElement('tr', 'table__headers');

    /**
     * Create table headers for each category.
     */
    for (let i = 1; i <= this.categories.length; i++) {
      let tableHead = createElement('th', 'table__head');
      tableHead.innerHTML = `${this.categories[i - 1].title}`;
      tableHeaders.appendChild(tableHead);
    }
    table.appendChild(tableHeaders);

    /**
     * Create table rows for each value.
     */
    for (let i = 1; i <= this.values.length; i++) {
      let tableRow = createElement('tr', 'table__row');

      /**
       * Create table cells for each question in each category.
       */
      for (let j = 1; j <= this.categories.length; j++) {
        /**
         * Retrieve the question from the clues array of the category and value.
         */
        let clueFromCategory = this.clues[this.categories[j - 1].id][i - 1];
        let question = new JeopardyQuestion(
          clueFromCategory.question,
          clueFromCategory.answer,
          clueFromCategory.value,
          clueFromCategory.category
        );

        /**
         * Create table cell.
         */
        let cell = createElement('td', 'table__cell');
        cell.innerHTML = `$${this.values[i - 1]}`;
        cell.addEventListener('click', () => {
          let modal = question.createQuestionModal(cell);
          board.appendChild(modal);
        });
        tableRow.appendChild(cell);
      }
      table.appendChild(tableRow);
    }

    /**
     * *************************************************************
     * Create player table.
     * *************************************************************
     */
    let playerTable = createElement('div', 'player__table');
    let playerTableHead = createElement('h3', 'player__table__head');
    let playerContainer = createElement('div', 'player__container');

    playerTableHead.innerHTML = `PLAYERS`;

    playerTable.appendChild(playerTableHead);
    playerTable.appendChild(playerContainer);

    /**
     * Create player data for each player.
     */
    for (let index = 0; index < numberOfPlayer; index++) {
      /**
       * Create player name and score.
       */
      let playerData = createElement('div', 'player__data');
      let playerName = createElement('span', 'player__name');
      let playerNameInput = document.createElement('input');

      /**
       * Set player name and score.
       */
      playerNameInput.setAttribute('placeholder', `Player ${index + 1}`);
      playerNameInput.setAttribute('class', 'player__name__input');
      playerNameInput.addEventListener('change', () => {
        score[index].playerName =
          playerNameInput.value == '' ? `Player ${index + 1}` : playerNameInput.value;
      });
      playerName.appendChild(playerNameInput);

      if (playerNameInput.value != '')
        score.push({
          score: 0,
          playerName: playerNameInput.value,
        });
      else {
        score.push({
          score: 0,
          playerName: `Player ${index + 1}`,
        });
      }

      /**
       * Create Score Display, Increase, and Decrease button. Add event listener to each button.
       */
      let scoreDisplay = document.createElement('h4');
      let decrease = document.createElement('span');
      let increase = document.createElement('span');

      scoreDisplay.setAttribute('class', `score__${index + 1}`);
      scoreDisplay.innerHTML = score[index].score;

      decrease.setAttribute('class', `decrease__${index + 1}`);
      decrease.innerHTML = '-';
      decrease.addEventListener('click', () => {
        if (score[index].score > 0) {
          score[index].score -= 100;
          score[index].playerName =
            playerNameInput.value == '' ? `Player ${index + 1}` : playerNameInput.value;
          scoreDisplay.innerHTML = score[index].score;
        }
      });

      increase.setAttribute('class', `increase__${index + 1}`);
      increase.innerHTML = '+';
      increase.addEventListener('click', () => {
        if (score[index].score < 9000) {
          score[index].score += 100;
          score[index].playerName =
            playerNameInput.value == '' ? `Player ${index + 1}` : playerNameInput.value;
          scoreDisplay.innerHTML = score[index].score;
        }
      });

      /**
       * Append all elements to the player data and finally to the player container.
       */
      let playerScore = createElement('span', 'player__score');
      playerScore.appendChild(decrease);
      playerScore.appendChild(scoreDisplay);
      playerScore.appendChild(increase);
      playerData.appendChild(playerName);
      playerData.appendChild(playerScore);
      playerContainer.appendChild(playerData);
    }

    /**
     * *************************************************************
     * Create reset and finish button.
     * *************************************************************
     */
    let buttonGroup = createElement('div', 'button__group');
    let finishedBtn = createElement('button', 'finish__btn');
    let resetBtn = createElement('button', 'reset__btn');
    let exitBtn = createElement('button', 'exit__btn');

    let finishedIcon = createIconElement('crown');
    finishedBtn.innerHTML = finishedIcon.outerHTML;

    let resetIcon = createIconElement('refresh');
    resetBtn.innerHTML = resetIcon.outerHTML;

    let exitIcon = createIconElement('exit');
    exitBtn.innerHTML = exitIcon.outerHTML;

    /**
     * Add event listener to reset button to reset the score and start the game again.
     */
    resetBtn.addEventListener('click', () => {
      document.body.innerHTML = '';
      score.forEach((element) => {
        element.score = 0;
        element.playerName = 'Player';
      });
      this.createBoard(numberOfPlayer, score);
    });

    /**
     * Add event listener to finish button to show the winner and reset the game.
     */
    finishedBtn.addEventListener('click', () => {
      let winPlayer = {
        ...this.checkWinner(),
      };
      this.winners.push(winPlayer);

      /**
       * Sort the winners array by score. The winner is the first element of the array.
       */
      this.winners.sort((a, b) => {
        return b.score - a.score;
      });

      /**
       * Save the winners array to the cookie.
       */
      saveJsonToCookie('winners', this.winners, 90);
      console.log(this.winners);

      /**
       * Create winner modal.
       */
      let winnerModal = createElement('div', 'winner__modal');
      let winnerModalContent = createElement('div', 'winner__modal__content');
      let winnerModalBtn = createElement('button', 'winner__modal__btn');

      winnerModalBtn.innerHTML = 'PLAY AGAIN';
      winnerModalBtn.addEventListener('click', () => {
        score.forEach((element) => {
          element.score = 0;
          element.playerName = '';
        });
        this.welcomePage();
      });

      winnerModalContent.innerHTML = `<p>The winner is <span>${winPlayer.playerName}</span> with <span>$${winPlayer.score}</span></p>`;
      winnerModalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      winnerModal.addEventListener('click', (e) => {
        winnerModal.style.display = 'none';
      });

      winnerModalContent.appendChild(winnerModalBtn);
      winnerModal.appendChild(winnerModalContent);
      board.appendChild(winnerModal);
    });

    /**
     * Add event listener to exit button to exit the game.
     */
    exitBtn.addEventListener('click', () => {
      document.body.innerHTML = '';
      this.welcomePage();
    });

    /**
     * Append all elements to the body.
     */
    buttonGroup.appendChild(finishedBtn);
    buttonGroup.appendChild(resetBtn);
    buttonGroup.appendChild(exitBtn);
    playerTable.appendChild(buttonGroup);

    /**
     * *************************************************************
     * Create board header, container, and append to the body.
     * *************************************************************
     */
    let boardHeader = createElement('div', 'board__header');
    let boardTitle = createElement('h1', 'board__title');
    boardTitle.innerHTML = 'Jeopardy!';
    boardHeader.appendChild(boardTitle);

    let container = createElement('div', 'container');

    containerTable.appendChild(table);
    containerTable.appendChild(playerTable);
    container.appendChild(boardHeader);
    container.appendChild(containerTable);
    board.appendChild(container);
    document.body.appendChild(board);

    /**
     * Remove loading page.
     */
    document.body.removeChild(loadingPage);
  }

  /**
   * This function starts the game.
   * @param {int} playerNumber Number of players
   * @param {int} score Score of each player
   */
  startGame(playerNumber, score) {
    document.body.innerHTML = '';
    this.createBoard(playerNumber, score);
  }

  /**
   * This function checks the winner of the game.
   * @returns the winner of the game.
   */
  checkWinner() {
    let indexOfWinner = 0;
    let highestScore = this.score[0].score;
    for (let index = 0; index < this.score.length; index++) {
      if (this.score[index].score > highestScore) {
        highestScore = this.score[index].score;
        indexOfWinner = index;
      }
    }

    return this.score[indexOfWinner];
  }

  /**
   * This function loads the game by calling the APIs.
   */
  async getJeopardyGame() {
    /**
     * Load categories.
     */
    const fetchedCategories = await fetch(
      `https://jservice.io/api/categories?count=6&offset=${this.workingOffsets[getRandomInt(4)]}`
    ).then((response) => response.json());

    /**
     * Load questions for each category.
     */
    for (let idx = 0; idx < fetchedCategories.length; idx++) {
      const fetchedClues = await fetch(
        `https://jservice.io/api/clues?category=${fetchedCategories[idx].id}`
      ).then((response) => response.json());

      const categoryId = fetchedCategories[idx].id;

      /**
       * Arrays for storing all questions of each value.
       */
      let questionsByValue = {};

      /**
       * Search questions for each value from clues array.
       */
      for (let i = 0; i < this.values.length; i++) {
        questionsByValue[this.values[i]] = [];

        for (let j = 0; j < fetchedClues.length; j++) {
          if (fetchedClues[j].value == this.values[i]) {
            questionsByValue[this.values[i]].push(
              new JeopardyQuestion(
                fetchedClues[j].question,
                fetchedClues[j].answer,
                fetchedClues[j].value,
                fetchedCategories[idx].title
              )
            );
          }
        }
      }

      /**
       * Select a random question for each value from questionsByValue array and push to questions array.
       */
      for (let i = 0; i < this.values.length; i++) {
        let randomQuestion =
          questionsByValue[this.values[i]][getRandomInt(questionsByValue[this.values[i]].length)];
        this.questions.push(randomQuestion);
      }

      this.clues = {
        ...this.clues,
        [categoryId]: this.questions,
      };

      this.questions = [];
    }
    this.categories = fetchedCategories;
  }
}

/**
 * *************************************************************
 * Class for Jeopardy Question.
 * *************************************************************
 */
class JeopardyQuestion {
  question = '';
  answer = '';
  value = 0; // 100, 200, 300, 400, 500
  category = '';

  /**
   * Constructor for JeopardyQuestion.
   * @param {string} question Question
   * @param {string} answer Answer
   * @param {int} value Value
   * @param {string} category Category
   */
  constructor(question, answer, value, category) {
    this.question = question;
    this.answer = answer;
    this.value = value;
    this.category = category;
  }

  /**
   * Function to create the Question Modal.
   */
  createQuestionModal(cell) {
    let modal = createElement('div', 'modal');
    let modalQuestions = createElement('div', 'modal__questions');
    let modalHeader = createElement('h1', 'modal__header');
    let question = createElement('h2', 'question');
    let answer = createElement('h3', 'answer');
    let groupBtn = createElement('div', 'group__btn');
    let answerBtn = createElement('button', 'answer__btn');
    let cancelBtn = createElement('button', 'cancel__btn');

    modalHeader.innerHTML = `$${this.value}`;
    question.innerHTML = this.question;
    answer.innerHTML = this.answer;
    answerBtn.innerHTML = 'Show Answer';
    cancelBtn.innerHTML = 'Exit Question';

    modalQuestions.appendChild(modalHeader);
    modalQuestions.appendChild(question);
    modalQuestions.appendChild(answer);

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
      });
    }

    return modal;
  }
}

/**
 * Helper Functions
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createElement(elType, attName) {
  let el = document.createElement(elType);
  el.setAttribute('id', attName);
  el.setAttribute('class', attName);
  return el;
}

function createLabel(labelName, attName) {
  let label = document.createElement('label');
  label.setAttribute('for', attName);
  label.setAttribute('class', attName);
  label.innerHTML = labelName;
  return label;
}

function createInput(inputType, attName) {
  let input = document.createElement(inputType);
  input.setAttribute('id', attName);
  input.setAttribute('name', attName);
  return input;
}

function createIconElement(iconName) {
  let svgIcon = document.createElement('img');
  svgIcon.setAttribute('src', `./assets/icons/${iconName}.svg`);
  svgIcon.setAttribute('class', 'icon');
  return svgIcon;
}

function saveJsonToCookie(name, json, daysToExpire) {
  const jsonString = JSON.stringify(json);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  document.cookie = `${name}=${encodeURIComponent(
    jsonString
  )};expires=${expirationDate.toUTCString()};path=/`;
}

function readJsonFromCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      const jsonString = decodeURIComponent(cookie.substring(name.length + 1));
      return JSON.parse(jsonString);
    }
  }
  return null;
}

/**
 * Initiate the Program.
 */
(function () {
  let jeopardyGame = new JeopardyGame();
  jeopardyGame.welcomePage();
})();
