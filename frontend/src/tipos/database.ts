export interface Medical {
  id: string
  active: boolean
  description: string
  email: string
  firstName: string
  lastName: string
  medicalRegistrationNumber: number
  medicalStaffId: number
  phone: string
  specialities: string | null
}

export interface Patient {
  id: any
  idPatient: number
  birthDate: Date
  bloodFactor: string
  bloodType: string
  email: string
  firstName: string
  identificationNumber: string
  lastName: string
  sex: 'M' | 'F'
  active: boolean
}
