document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const outcomeDisplay = document.getElementById('outcome');

    const choicesArray = ['rock', 'paper', 'scissors'];

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.getAttribute('data-choice');
            const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
            const outcome = getOutcome(userChoice, computerChoice);

            userChoiceDisplay.textContent = `Your choice: ${userChoice}`;
            computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice}`;
            outcomeDisplay.textContent = `Outcome: ${outcome}`;
        });
    });

    function getOutcome(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        } else {
            return 'You lose!';
        }
    }
});
