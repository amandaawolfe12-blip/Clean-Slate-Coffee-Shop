// ==========================================
// INTERACTIVE FEATURE 1: Theme Switcher (Dark/Light)
// ==========================================
const themeBtn = document.getElementById('theme-btn');

// Check localStorage for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeBtn) themeBtn.textContent = '☀️ Light Mode';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeBtn.textContent = '☀️ Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeBtn.textContent = '🌙 Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
}

// ==========================================
// INTERACTIVE FEATURE 2: Order Price Calculator & Form Submission
// ==========================================
const orderForm = document.getElementById('order-form');

if (orderForm) {
  const nameInput = document.getElementById('customer-name');
  const drinkSelect = document.getElementById('drink-select');
  const sizeRadios = document.querySelectorAll('input[name="size"]');
  const milkSelect = document.getElementById('milk-select');
  const extraCheckboxes = document.querySelectorAll('.extra-item');
  const quantityInput = document.getElementById('quantity');

  // Summary Elements
  const summaryName = document.getElementById('summary-name');
  const summaryBase = document.getElementById('summary-base');
  const summarySize = document.getElementById('summary-size');
  const summaryExtras = document.getElementById('summary-extras');
  const summaryQty = document.getElementById('summary-qty');
  const summaryTotal = document.getElementById('summary-total');

  function updateOrderSummary() {
    // 1. Customer Name
    summaryName.textContent = nameInput.value.trim() !== '' ? nameInput.value : 'Guest';

    // 2. Base Price
    const basePrice = parseFloat(drinkSelect.value);
    summaryBase.textContent = basePrice.toFixed(2);

    // 3. Size Price
    let sizePrice = 0;
    sizeRadios.forEach(radio => {
      if (radio.checked) {
        sizePrice = parseFloat(radio.value);
      }
    });
    summarySize.textContent = sizePrice.toFixed(2);

    // 4. Extras & Milk Price
    let extrasPrice = parseFloat(milkSelect.value);
    extraCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        extrasPrice += parseFloat(checkbox.value);
      }
    });
    summaryExtras.textContent = extrasPrice.toFixed(2);

    // 5. Quantity & Total Calculation
    const qty = parseInt(quantityInput.value) || 1;
    summaryQty.textContent = qty;

    const total = (basePrice + sizePrice + extrasPrice) * qty;
    summaryTotal.textContent = total.toFixed(2);
  }

  // Add event listeners to calculate price on any input change
  nameInput.addEventListener('input', updateOrderSummary);
  drinkSelect.addEventListener('change', updateOrderSummary);
  milkSelect.addEventListener('change', updateOrderSummary);
  quantityInput.addEventListener('input', updateOrderSummary);

  sizeRadios.forEach(radio => {
    radio.addEventListener('change', updateOrderSummary);
  });

  extraCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateOrderSummary);
  });

  // Handle Form Submission with Pop-up Alert
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const finalTotal = summaryTotal.textContent;
    const customer = summaryName.textContent;
    
    alert(`Thank you, ${customer}! Your order has been placed.\nTotal Paid: $${finalTotal}\nEstimated pickup time: 10 minutes.`);
    
    // Reset form
    orderForm.reset();
    updateOrderSummary();
  });

  // Initial calculation on page load
  updateOrderSummary();
}
