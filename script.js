// Store comparison items
let comparisonItems = [];
let itemCounter = 1;

// Get DOM elements
const priceInput = document.getElementById('price');
const volumeInput = document.getElementById('volume');
const alcoholInput = document.getElementById('alcohol');
const calculateBtn = document.getElementById('calculateBtn');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const resultBox = document.getElementById('result');
const costPerMl = document.getElementById('costPerMl');
const pureAlcohol = document.getElementById('pureAlcohol');
const costPerAlcoholMl = document.getElementById('costPerAlcoholMl');
const comparisonList = document.getElementById('comparisonList');

// Calculate values
function calculateValues() {
    const price = parseFloat(priceInput.value);
    const volume = parseFloat(volumeInput.value);
    const alcohol = parseFloat(alcoholInput.value);

    // Validate inputs
    if (isNaN(price) || isNaN(volume) || isNaN(alcohol)) {
        alert('Please enter valid numbers for all fields');
        return null;
    }

    if (price <= 0 || volume <= 0 || alcohol <= 0 || alcohol > 100) {
        alert('Please enter valid values (price > 0, volume > 0, alcohol > 0 and ≤ 100)');
        return null;
    }

    // Calculate metrics
    const costPerMlValue = price / volume;
    const pureAlcoholValue = (volume * alcohol) / 100;
    const costPerAlcoholMlValue = price / pureAlcoholValue;

    return {
        price,
        volume,
        alcohol,
        costPerMl: costPerMlValue,
        pureAlcohol: pureAlcoholValue,
        costPerAlcoholMl: costPerAlcoholMlValue
    };
}

// Display calculation results
function displayResults() {
    const values = calculateValues();
    
    if (values) {
        resultBox.style.display = 'block';
        costPerMl.textContent = values.costPerMl.toFixed(2);
        pureAlcohol.textContent = values.pureAlcohol.toFixed(2);
        costPerAlcoholMl.textContent = values.costPerAlcoholMl.toFixed(2);
    }
}

// Add item to comparison
function addToComparison() {
    const values = calculateValues();
    
    if (values) {
        const item = {
            id: itemCounter,
            name: `Beverage ${itemCounter}`,
            ...values
        };
        
        itemCounter++;
        comparisonItems.push(item);
        updateComparisonList();
        
        // Clear inputs
        priceInput.value = '';
        volumeInput.value = '';
        alcoholInput.value = '';
        resultBox.style.display = 'none';
    }
}

// Update comparison list display
function updateComparisonList() {
    if (comparisonItems.length === 0) {
        comparisonList.innerHTML = '<p class="empty-state">No items added yet. Add beverages to compare!</p>';
        clearBtn.style.display = 'none';
        return;
    }

    // Find best value (lowest cost per ml of pure alcohol)
    let bestValueId = null;
    let lowestCost = Infinity;
    
    comparisonItems.forEach(item => {
        if (item.costPerAlcoholMl < lowestCost) {
            lowestCost = item.costPerAlcoholMl;
            bestValueId = item.id;
        }
    });

    // Generate HTML for all items
    const html = comparisonItems.map(item => {
        const isBest = item.id === bestValueId && comparisonItems.length > 1;
        return `
            <div class="comparison-item ${isBest ? 'best-value' : ''}" data-id="${item.id}">
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                <h4>${item.name}</h4>
                <p><strong>Price:</strong> ${item.price.toFixed(2)} Peso</p>
                <p><strong>Volume:</strong> ${item.volume} ml</p>
                <p><strong>Alcohol:</strong> ${item.alcohol}%</p>
                <p><strong>Cost per ml:</strong> ${item.costPerMl.toFixed(4)} Peso/ml</p>
                <p><strong>Pure alcohol:</strong> ${item.pureAlcohol.toFixed(2)} ml</p>
                <p><strong>Cost per ml of pure alcohol:</strong> ${item.costPerAlcoholMl.toFixed(4)} Peso/ml</p>
            </div>
        `;
    }).join('');

    comparisonList.innerHTML = html;
    clearBtn.style.display = 'block';
}

// Remove item from comparison
function removeItem(id) {
    comparisonItems = comparisonItems.filter(item => item.id !== id);
    updateComparisonList();
}

// Clear all items
function clearAll() {
    if (confirm('Are you sure you want to clear all items?')) {
        comparisonItems = [];
        itemCounter = 1;
        updateComparisonList();
    }
}

// Event listeners
calculateBtn.addEventListener('click', displayResults);
addBtn.addEventListener('click', addToComparison);
clearBtn.addEventListener('click', clearAll);

// Allow Enter key to calculate
[priceInput, volumeInput, alcoholInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            displayResults();
        }
    });
});
