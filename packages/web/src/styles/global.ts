import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #2a0d41;
  --secondary-color: #5e00a3;
  --secondary-hover-color: #c5abd5;
  --white-color: #ffffff;
  --black-color: #000000;
  --orange-color: #f09000;
  --gray-color: #666360;
  --gray-dark-color: #333;
  --lighten-color: #e2d4ea;
  --dark-color: #271f39;
  --success-color: #008200;
  --error-color: #82001b;
  --info-color: #002982;
  --btn-color-delete: #e0144c;
  --ping-notification-color: #e02e2e;
}

body {
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
  -webkit-font-smoothing: antialiased;
}

body, button, input {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 22px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  @media (max-width: 425px) {
    font-size: 0.7rem;
    line-height: 1.1rem;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}
`
