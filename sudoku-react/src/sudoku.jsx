import {useState, useEffect} from "react"

import {easy} from "./suduko_layouts"
import useMousePosition from "./mouse_tracker"
import Timer_function from "./timer"

const Sodoku = ()=>{

    const changeable_values_init = []

    const easy_arr = easy()

    for (let index1 = 0; index1 < easy_arr.length; index1++) {
        const inner_arr = easy_arr[index1];
        for (let index2 = 0; index2 < inner_arr.length; index2++) {
            const value = inner_arr[index2];
            if (value === null){
                changeable_values_init.push([index1, index2, null])
            }
        }
    }


    const mousePosition = useMousePosition();

    const [update_state, set_update_state] = useState(false)
    const [changeable_values, set_changeable_values] = useState(changeable_values_init) // (row_index, column_index, value)
    const [remove_bool, set_remove_bool] = useState(false)
    const [invalid_row, set_invalid_row] = useState(false)
    const [invalid_row_position, set_invalid_row_position] = useState([])
    const [you_won, set_you_won] = useState(false)

    useEffect(()=>{
        const total_numbers = []
        const toIntager = (value)=> parseInt(value)
        let new_easy_arr = easy_arr
        for (let index = 0; index < new_easy_arr.length; index++) {
            let arry = new_easy_arr[index];
            arry = arry.filter((element)=>{return element != null})
            arry = arry.map(toIntager)
            for (let index = 0; index < arry.length; index++) {
                const element = arry[index];
                total_numbers.push(element)
            }
        }

        for (let index = 0; index < changeable_values.length; index++) {
            const element = changeable_values[index];
            if (element[2]) total_numbers.push(element[2])
        }

        console.log("analyzin...", total_numbers.length, "/81")

        if (total_numbers.length > 80 && !invalid_row){
            console.log("You won!")
            set_you_won(true)
        }
    }, [update_state])

    const box_container = (value, row_index, column_index)=>{

        // check if any rows are invalid, if case send request to paint wrong boxes
        const check_for_invalid_row = ()=>{
            for (let index = 0; index < changeable_values.length; index++) {
                const value_arr = changeable_values[index];
                easy_arr[value_arr[0]][value_arr[1]] = value_arr[2]
            }

            const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(parseInt(item)) !== parseInt(index))
            const toIntager = (value)=> parseInt(value)

            let is_invalid = false
            let is_row = false
            let is_column = false
            let column_index_values = []
            let row_index_values = []
            // check row
            let new_easy_arr = easy_arr
            for (let index = 0; index < new_easy_arr.length; index++) {
                let arry = new_easy_arr[index];
                arry = arry.filter((element)=>{return element != null})
                arry = arry.map(toIntager)
                if (toFindDuplicates(arry).length > 0){
                    is_invalid = true
                    is_row = true
                    row_index_values.push(index)
                }
            }

            // check column
            let new_sorted_arr = [[],[],[],[],[],[],[],[],[]]
            for (let index = 0; index < easy_arr.length; index++) {
                const element1 = easy_arr[index];
                for (let index = 0; index < easy_arr[0].length; index++) {
                    const element2 = element1[index];
                    new_sorted_arr[index].push(element2)
                }
            }
            for (let index = 0; index < new_sorted_arr.length; index++) {
                let arry = new_sorted_arr[index];
                arry = arry.filter((element)=>{return element != null})
                arry = arry.map(toIntager)
                if (toFindDuplicates(arry).length > 0){
                    is_invalid = true
                    is_column = true
                    column_index_values.push(index)
                }
            }

            console.log(is_invalid)

            console.log("row_index: ", row_index)
            console.log("column_index: ", column_index)

            // Need to store multiple invalid rows at a time

            if (is_invalid){
                set_invalid_row(true)
                if (is_column){set_invalid_row_position(["column", column_index_values])}
                if (is_row){set_invalid_row_position(["row", row_index_values])}
                if (is_row && is_column){set_invalid_row_position(["both", row_index_values, column_index_values])}
                return
            }
            set_invalid_row(false)
        }

        const inner = (value)=>{

            const handle_input = (element)=>{
                if (!Number(element.target.value) || element.target.value === "0"){
                    element.target.value = ""
                    return
                }

                for (let index = 0; index < changeable_values.length; index++) {
                    const value_arr = changeable_values[index];
                    if (value_arr[0] === row_index && value_arr[1] === column_index){
                        let tmp_arr = changeable_values
                        tmp_arr[index] = [row_index, column_index, element.target.value]
                        set_changeable_values(tmp_arr)
                        element.target.value = ""
                        set_update_state(!update_state)
                    }   
                }
                check_for_invalid_row()
            }

            const handle_click = (override_remove_bool=false)=>{
                console.log(1)
                if (remove_bool || override_remove_bool){
                    console.log(2)
                    for (let index = 0; index < changeable_values.length; index++) {
                        const value_arr = changeable_values[index];
                        if (value_arr[0] === row_index && value_arr[1] === column_index){
                            let tmp_arr = changeable_values
                            tmp_arr[index] = [row_index, column_index, null]
                            set_changeable_values(tmp_arr)
                            set_update_state(!update_state)
                            console.log("Removing")
                        }   
                    }
                }
                check_for_invalid_row()
            }   

            const handle_key_down = (element)=>{
                if (element.key === "Backspace"){
                    console.log(element.key)
                    handle_click(true)
                }
            }
        
            for (let index = 0; index < changeable_values.length; index++) {
                const changeable_value = changeable_values[index];
                if (changeable_value[0] === row_index && changeable_value[1] === column_index){
                    return (
                        <input placeholder={changeable_values[index][2]} type="text" onInput={(e)=>handle_input(e)} onClick={(e)=>handle_click(e)} onKeyDown={(e)=>handle_key_down(e)}></input>
                    )
                }
            };

            return (
                <>
                    <span>{value}</span>
                </>
            )
        }

        let style = {}
        let classname = "" 

        if (row_index === 2 || row_index === 5){
            style = {...style, "borderBottom": "3px solid black"}
        }
        if (column_index === 3 || column_index === 6){
            style = {...style, "borderLeft": "3px solid black"}
        }

        // add invalid row color
        if (invalid_row){
            if (invalid_row_position[0] === "column"){
                if (invalid_row_position[1].includes(column_index)){
                    classname = "invalid_box"
                }
            }
            if (invalid_row_position[0] === "row"){
                if (invalid_row_position[1].includes(row_index)){
                    classname = "invalid_box"
                }
            }
            if (invalid_row_position[0] === "both"){
                if (invalid_row_position[2].includes(column_index) || invalid_row_position[1].includes(row_index)){
                    classname = "invalid_box"
                }
            }
        }


        return (
            <div style={style} className={"box_container " + classname}>
                {inner(value)}
            </div>
        )
    }

    const generate_grids = ()=>{
        let grid_arr = []
        for (let column_index = 0; column_index < 9; column_index++) {
            for (let row_index = 0; row_index < 9; row_index++) {
                grid_arr.push(<div style={{"gridRow":(row_index + 1).toString() + "/" + (row_index + 2).toString(), "gridColumn":(column_index + 1).toString() + "/" + (column_index + 2).toString()}}>{box_container(easy()[row_index][column_index], row_index, column_index)}</div>)
            } 
            
        }
        return grid_arr
    }

    return (
        <>
            <div className="title_container">
                <span>Sudoku</span>
            </div>
            <div className="grid_container">
                {generate_grids()}
            </div>
            <div className="extra_container">
                <Timer_function></Timer_function>
                <button onClick={()=>{set_remove_bool(!remove_bool)}}>Remove</button>
                <button onClick={()=>{set_changeable_values(changeable_values_init); set_invalid_row(false)}}>Reset</button>
            </div>
            {
                you_won?
                <>  
                    <div className="winner_container_blur winner_container_blur1"/>
                    <div className="winner_container">
                        <span>You won!!</span>
                    </div>
                    <div className="winner_container_blur winner_container_blur2"/>
                </>
                :
                null
            }
            {
                remove_bool?
                <div className="mouse_tracker" style={{"transform": "translate("+(mousePosition["x"] + "px ," + mousePosition["y"])+"px)"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </div>
                :
                null
            }
        </>
    )
}

export default Sodoku