const app = document.getElementById('app')!;

const actionButton = document.createElement('button');
actionButton.id = 'actionButton';
// eslint-disable-next-line @typescript-eslint/no-empty-function
actionButton.addEventListener('click', () => {});

const backButton = document.createElement('button');
backButton.id = 'backButton';
// eslint-disable-next-line @typescript-eslint/no-empty-function
backButton.addEventListener('click', () => {});

app.appendChild(actionButton);
app.appendChild(backButton);

export {};
