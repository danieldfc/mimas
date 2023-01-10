import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #7f3e98;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

body, button, input {
  font-family: 'Roboto Slab', serif;
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
