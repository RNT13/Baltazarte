import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  active: string
}

const initialState: FilterState = {
  active: 'Todos'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.active = action.payload
    },
    clearFilter: state => {
      state.active = 'Todos'
    }
  }
})

export const { setFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer
