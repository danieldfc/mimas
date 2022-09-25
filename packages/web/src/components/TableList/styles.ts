import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 0rem 1.2rem;

  @media (max-width: 102.4rem) {
    padding: 0rem 0.3rem;
  }
  p.loading {
    font-size: 1rem;
    font-weight: bold;
    color: #444;
  }
`

export const StyledTable = styled.table`
  border: none;
  background: #fff;
  width: 100%;
  border-radius: 0.4rem;
  padding: 1.5rem;
  border-collapse: collapse;

  tr {
    & + tr {
      border-top: 1px solid #eee;
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
  thead th,
  tbody td {
    font-size: 1rem;
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
        color: #4d85ee;
        &:hover {
          color: ${darken(0.3, '#4d85ee')};
        }
      }
      &.cancel {
        color: #de3b3b;
        &:hover {
          color: ${darken(0.3, '#de3b3b')};
        }
      }
      &.finish {
        color: #78bc61;
        &:hover {
          color: ${darken(0.3, '#78bc61')};
        }
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
          color: #000;
          text-decoration: underline;
        }
      }
    }
  }
`

export const TableWrapper = styled.div`
  width: 100%;
  background: red;
  padding: 1.5rem;
  border-radius: 0.4rem;
  background: #fff;

  @media (max-width: 700px) {
    padding: 1.5rem 0rem;
  }
`
