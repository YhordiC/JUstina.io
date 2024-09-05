'use client'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react'


interface UserMedico {
  id: number | null
  firstName: string
  lastName: string
  email: string
  phone: string | null
  medicalRegistrationNumber: number | null
  specialities: string
  description: string | null
  active: boolean | null
}

const initialState: UserMedico = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: null,
  medicalRegistrationNumber: null,
  specialities: '',
  description: null,
  active: null
}

interface StaffContextType {
  state: UserMedico
  dispatch: React.Dispatch<any>
}

const StaffProvider = createContext<StaffContextType | object>( {
  id: 1,
  firstName: 'Yhordi',
  lastName: 'Choque',
  email: '@gmail.com',
  phone: 78456,
  medicalRegistrationNumber: 123456,
  specialities: 'Cardiologo',
  description: 'El mejor del mundo',
  active: true
})

const reducer = (state: UserMedico, action: any) => {

  switch (action.type) {
    case 'SET_DATA':
      return { ...action.value }
    default:
      return state
  }
}

const useStaffContext = () => {
  const context = useContext(StaffProvider)
  // if (!context) {
  //   throw new Error('useStaffContext must be used within a MedicoProvider')
  // }
  return context
}

const MedicoProvider = ({ children }: { children: ReactNode }) => {
 
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StaffProvider.Provider value={{ state, dispatch }}>{children}</StaffProvider.Provider>
}

export { MedicoProvider, useStaffContext }
