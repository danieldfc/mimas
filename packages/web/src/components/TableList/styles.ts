import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  p.loading {
    font-size: 1rem;
    font-weight: bold;
    color: var(--gray-color);
  }
`

export const StyledTable = styled.table`
  border: none;
  background: var(--white-color);
  width: 100%;
  border-radius: 0.4rem;
  padding: 1.5rem;
  border-collapse: collapse;

  tr {
    & + tr {
      border-top: 1px solid var(--lighten-color);
    }
    &:last-child {
      padding-bottom: 2rem;
    }
  }
  thead th {
    @media (max-width: 102.4rem) {
      padding-right: 0.25rem;
    }
  }
  tbody th,
  tbody td {
    font-size: 1rem;

    @media (max-width: 768rem) {
      font-size: 0.9rem;
    }
    @media (max-width: 425px) {
      font-size: 0.8rem;
    }
  }
  th {
    color: #444444;
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
  }
  td {
    color: #666666;
  }
  .center {
    text-align: center;
  }
  td.actions {
    display: flex;
    justify-content: center;
    flex-direction: row;
    @media (max-width: 102.4rem) {
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }
    > div {
      @media (max-width: 102.4rem) {
        display: flex;
        flex-direction: column;
      }
    }
    a {
      text-decoration: none;
    }
    button,
    a {
      background: none;
      border: none;
      font-size: 1rem;
      transition: color 0.5s;
      &.info {
        color: var(--info-color);
        &:hover {
          color: ${darken(0.3, '#002982')};
        }
      }
      &.cancel {
        color: var(--error-color);
        &:hover {
          color: ${darken(0.3, '#82001b')};
        }
      }
      &.finish {
        color: var(--success-color);
        &:hover {
          color: ${darken(0.3, '#008200')};
        }
      }
      @media (max-width: 768px) {
        font-size: 0.8rem;
        width: 100%;
      }
      @media (max-width: 425px) {
        font-size: 0.7rem;
      }
      & + button {
        margin-left: 1.5rem;
        @media (max-width: 102.4rem) {
          margin-left: 0rem;
        }
      }
    }
  }
  tbody td.edit,
  tbody td.remove {
    text-transform: lowercase;
  }

  tbody tr {
    td {
      padding: 0.7rem 0rem;

      a {
        color: #666666;
        transition: all 0.2s;

        &:hover {
          color: var(--dark-color);
          text-decoration: underline;
        }
      }
    }
  }
`

export const TableWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.4rem;
  background: var(--white-color);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
