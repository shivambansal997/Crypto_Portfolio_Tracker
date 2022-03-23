const LocalDate = (props) => {
    const date = new Date(props)

    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
export default LocalDate