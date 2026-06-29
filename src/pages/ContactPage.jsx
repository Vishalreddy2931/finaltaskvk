import { useEffect, useReducer, useRef, useState } from 'react'

const initialState = {
  name: '',
  email: '',
  message: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function ContactPage() {
  const [formState, dispatch] = useReducer(reducer, initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const validate = () => {
    const nextErrors = {}

    if (!formState.name.trim()) nextErrors.name = 'Name is required.'
    if (!formState.email.includes('@')) nextErrors.email = 'Please enter a valid email.'
    if (formState.message.trim().length < 10) nextErrors.message = 'Message should be at least 10 characters.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
    dispatch({ type: 'reset' })
  }

  return (
    <section className="page contact-page">
      <div className="section-heading">
        <p className="eyebrow">Contact us</p>
        <h1>Tell us where your next getaway should begin.</h1>
        <p className="lead">We usually reply within one business day with a tailored planning suggestion.</p>
      </div>

      <div className="cards-grid two-up">
        <form className="info-card" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input ref={nameRef} value={formState.name} onChange={(event) => dispatch({ type: 'change', field: 'name', value: event.target.value })} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input type="email" value={formState.email} onChange={(event) => dispatch({ type: 'change', field: 'email', value: event.target.value })} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Message
            <textarea value={formState.message} onChange={(event) => dispatch({ type: 'change', field: 'message', value: event.target.value })} />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>
          <button type="submit" className="btn btn-primary">Send request</button>
          {submitted && <p className="success">Thanks! Your plan request has been received.</p>}
        </form>

        <article className="info-card">
          <h2>Plan with a specialist</h2>
          <p>Share a few preferences and we’ll suggest a route that fits your budget, pace, and priorities.</p>
          <ul>
            <li>Best times to book</li>
            <li>Local food and stay suggestions</li>
            <li>Flexible route adjustments</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
