// 1. Select all pieces and squares
const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');

// 2. Add event listeners to pieces
pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);
});

// 3. Add event listeners to squares
squares.forEach(square => {
    square.addEventListener('dragover', dragOver);
    square.addEventListener('dragenter', dragEnter);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop', dragDrop);
});

// --- Functions ---

let draggedPiece = null;

function dragStart() {
    // Store the piece being dragged
    draggedPiece = this;
    // Add a class for visual effect
    setTimeout(() => this.classList.add('dragging'), 0);
}

function dragEnd() {
    // Remove the visual effect
    this.classList.remove('dragging');
    draggedPiece = null;
}

function dragOver(e) {
    // This is necessary to allow dropping
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    // Optional: Add a highlight to the square we are hovering over
    this.style.border = "2px solid gold"; 
}

function dragLeave() {
    // Remove highlight
    this.style.border = "none";
}

function dragDrop() {
    this.style.border = "none";
    
    // appendChild moves the element from the old parent to the new one
    // Note: This allows stacking pieces. For a real game, you'd check if empty first.
    this.appendChild(draggedPiece);
}