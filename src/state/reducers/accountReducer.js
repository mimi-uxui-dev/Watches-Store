const reducer = (state = [], action) => {
     switch (action.type) {
          case "SET_CI":
               // console.log("hnaa", action.payload)
               return action.payload
          default:
               return state
     }

}

export default reducer