import './App.css'
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : []

function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (charge === '' || amount < 0) {
      handleAlert({
        type: 'danger',
        text: "charge can't be empty value and amount value has to be bigger than zero",
      })
      return
    }

    if (!edit) {
      const singleExpense = {
        id: uuid(),
        charge,
        amount,
      }

      setExpenses(prev => {
        return [...prev, singleExpense]
      })
      handleAlert({ type: 'success', text: 'item added' })

      setCharge('')
      setAmount('')
      return
    }

    let tempExpenses = expenses.map(item => {
      return item.id === id ? { ...item, charge, amount } : item
    })
    setExpenses(tempExpenses)
    setEdit(false)
    handleAlert({ type: 'success', text: 'item edited' })

    setCharge('')
    setAmount('')
  }

  const clearItems = () => {
    setExpenses([])
    handleAlert({ type: 'danger', text: 'all items deleted' })
  }

  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({ type: 'danger', text: 'item deleted' })
  }

  const handleEdit = id => {
    let { charge, amount } = expenses.find(item => item.id === id)

    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:{' '}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += +curr.amount)
          }, 0)}
        </span>
      </h1>
    </>
  )
}

export default App
