import {getCookie} from './Auth'

const DeleteFeed = (props) => {
    const {id, url, state, setState} = props

    const formData = new FormData()
    formData.append('id', props.id)

    fetch(url, {
        method: 'DELETE',
        body: formData,
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
        .then(response => {
            const newTransactions = state.filter((transaction) => transaction.id !== id)
            setState(newTransactions)

            return response.json()
        })
        .then(response => {
            console.log(response)
        })
        .catch(onerror => console.log(onerror))
}

export default DeleteFeed