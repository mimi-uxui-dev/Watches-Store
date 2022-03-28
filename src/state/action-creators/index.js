export const setCI = (data) => {
     return (dispatch) => {
          dispatch({
               type: 'SET_CI',
               payload: data
          })
     }
}