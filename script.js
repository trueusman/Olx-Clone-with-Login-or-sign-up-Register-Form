document.addEventListener('DOMContentLoaded', () => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userInfo = document.getElementById('user-info');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showLoginBtn = document.getElementById('show-login');
  const showRegisterBtn = document.getElementById('show-register');
  const logoutBtn = document.getElementById('logout-btn');

  // Get close buttons
  const closeLogin = document.getElementById('close-login');
  const closeRegister = document.getElementById('close-register');

  const updateUI = () => {
    if (currentUser) {
      userInfo.textContent = `${currentUser.name} (${currentUser.email})`;
      showLoginBtn.classList.add('hidden');
      showRegisterBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
      loginForm.classList.add('hidden');
      registerForm.classList.add('hidden');
    } else {
      userInfo.textContent = '';
      showLoginBtn.classList.remove('hidden');
      showRegisterBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
    }
  };
  updateUI();

  // Show/hide forms
  showLoginBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });
  showRegisterBtn.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
  document.getElementById('go-register').addEventListener('click', e => {
    e.preventDefault();
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
  document.getElementById('go-login').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });

  // ✅ Close buttons
  closeLogin.addEventListener('click', () => {
    loginForm.classList.add('hidden');
  });
  closeRegister.addEventListener('click', () => {
    registerForm.classList.add('hidden');
  });

  // Register
  document.getElementById('register-btn').addEventListener('click', () => {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    if (!name || !email || !password) return alert('All fields required');
    if (users.find(u => u.email === email)) return alert('Email already registered');
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully! You can now login.');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Login
  document.getElementById('do-login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUser = user;
      updateUI();
      alert('Login successful!');
    } else {
      alert('Invalid email or password');
    }
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUI();
  });

  // Fetch products
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('products');
      data.products.forEach(product => {
        container.innerHTML += `
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
          </div>`;
      });
    }).catch(err => console.error(err));
});
