import { api } from '../services/api'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { TypePix } from '../utils/enum'

export interface Employee {
  id: string
  name: string
  phone: string
  email?: string
  typePix: TypePix
  keyPix: string
}

interface EmployeeProviderData {
  employees: Employee[]
  addEmployee(employee: Omit<Employee, 'id'>): Promise<void>
  updateEmployee(id: string, employee: Omit<Employee, 'id'>): Promise<void>
  deleteEmployee(id: string): Promise<void>
}

const EmployeeContaxt = createContext<EmployeeProviderData>(
  {} as EmployeeProviderData
)

const EmployeeProvider: React.FC = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([])

  const addEmployee = useCallback(
    async ({ name, phone, email, keyPix, typePix }: Omit<Employee, 'id'>) => {
      const employee = {
        name,
        phone,
        email,
        keyPix,
        typePix
      }

      const response = await api.post('/employees', employee)

      if (!response) {
        throw new Error('Erro ao criar o prestador de serviço')
      }

      setEmployees(oldEmployees => [...oldEmployees, response.data.employee])
    },
    []
  )

  const updateEmployee = useCallback(
    async (
      id: string,
      { name, phone, email, keyPix, typePix }: Omit<Employee, 'id'>
    ) => {
      const employeeIndex = employees.findIndex(emp => emp.id === id)
      if (employeeIndex < 0) return

      const employee = {
        name,
        phone,
        email,
        keyPix,
        typePix
      }

      const response = await api.put<{ employee: Employee }>(
        `/employees/${id}`,
        employee
      )

      if (!response) {
        throw new Error('Erro ao atualizar o prestador de serviço')
      }

      setEmployees(oldEmployees => {
        oldEmployees[employeeIndex] = {
          ...oldEmployees[employeeIndex],
          ...response.data.employee
        }

        return oldEmployees
      })
    },
    [employees]
  )

  const deleteEmployee = useCallback(
    async (id: string) => {
      const employeeIndex = employees.findIndex(emp => emp.id === id)
      if (employeeIndex < 0) return

      const response = await api.delete(`/employees/${id}`)

      if (!response) {
        throw new Error('Erro ao atualizar o prestador de serviço')
      }

      setEmployees(oldEmployees =>
        oldEmployees.filter(oldEmp => oldEmp.id !== id)
      )
    },
    [employees]
  )

  useEffect(() => {
    async function getEmployees() {
      const response = await api.get('/employees')
      setEmployees([...response.data.employees])
      return response.data.employees as Employee[]
    }
    getEmployees()
  }, [])

  return (
    <EmployeeContaxt.Provider
      value={{ addEmployee, employees, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContaxt.Provider>
  )
}

function useEmployee(): EmployeeProviderData {
  const context = useContext(EmployeeContaxt)

  if (!context) {
    throw new Error('useEmployee must be used within a EmployeeProvider')
  }

  return context
}

export { useEmployee, EmployeeProvider }
