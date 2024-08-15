// JavaScript code to handle the game logic

// Game state
let currentRoom = 'Abandoned Laboratory';
let inventory = [];

// Room data structure
const rooms = {
    'Abandoned Laboratory': { 'West': 'Enchanted Forest' },
    'Enchanted Forest': { 'East': 'Abandoned Laboratory', 'South': 'Ancient Temple', 'item': 'Superhero Suit' },
    'Ancient Temple': { 'North': 'Enchanted Forest', 'West': 'Underground Sewer', 'South': 'High-Tech Control Room', 'East': 'Frozen Cave', 'item': 'Magic Key' },
    'Underground Sewer': { 'East': 'Ancient Temple', 'item': 'Encrypted Notebook' },
    'High-Tech Control Room': { 'North': 'Ancient Temple', 'East': 'Abandoned Amusement Park', 'item': 'Utility Belt' },
    'Abandoned Amusement Park': { 'West': 'High-Tech Control Room', 'item': 'Ancient Map' },
    'Frozen Cave': { 'West': 'Ancient Temple', 'North': 'Secret Hideout', 'item': 'Energy Drink' },
    'Secret Hideout': { 'South': 'Frozen Cave' }
};

// Function to update the game status on the webpage
function updateStatus() {
    document.getElementById('current-room').textContent = `You are in: ${currentRoom}`;
    document.getElementById('current-inventory').textContent = `Your Inventory: [${inventory.join(', ')}]`;

    if ('item' in rooms[currentRoom] && !inventory.includes(rooms[currentRoom]['item'])) {
        document.getElementById('current-item').textContent = `You see an item: ${rooms[currentRoom]['item']}`;
        document.getElementById('pick-up-btn').style.display = 'inline'; // Show pick up button if item is present
    } else {
        document.getElementById('current-item').textContent = '';
        document.getElementById('pick-up-btn').style.display = 'none'; // Hide pick up button if no item
    }
}

// Function to handle movement
function move(direction) {
    if (direction in rooms[currentRoom]) {
        currentRoom = rooms[currentRoom][direction];
        updateStatus();
        checkGameOver();
    } else {
        alert('Wrong direction! Try again.');
    }
}

// Function to handle item pickup
function pickUpItem() {
    const item = rooms[currentRoom]['item'];
    if (item && !inventory.includes(item)) {
        inventory.push(item);
        alert(`${item} added to your inventory.`);
        updateStatus();
    }
}

// Function to check game over conditions
function checkGameOver() {
    if (currentRoom === 'Secret Hideout') {
        if (inventory.length === 6) {
            alert('Congratulations! You\'ve collected all the items and won the game!');
        } else {
            alert('Game Over! You reached the Secret Hideout without collecting all items.');
        }
        location.reload(); // Restart the game
    }
}

// Initialize the game status
updateStatus();
