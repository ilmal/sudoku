import {useState} from "react"

import {easy} from "./suduko_layouts"
import useMousePosition from "./mouse_tracker"

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

    const box_container = (value, row_index, column_index)=>{

        // check if any rows are invalid, if case send request to paint wrong boxes
        const check_for_invalid_row = ()=>{
            
        }

        const inner = (value)=>{

            const handle_input = (element)=>{
                if (!Number(element.target.value)){
                    element.target.value = ""
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
            }

            const handle_click = ()=>{
                if (remove_bool){
                    for (let index = 0; index < changeable_values.length; index++) {
                        const value_arr = changeable_values[index];
                        if (value_arr[0] === row_index && value_arr[1] === column_index){
                            let tmp_arr = changeable_values
                            tmp_arr[index] = [row_index, column_index, null]
                            set_changeable_values(tmp_arr)
                            set_update_state(!update_state)
                        }   
                    }
                }
            }   
        
            for (let index = 0; index < changeable_values.length; index++) {
                const changeable_value = changeable_values[index];
                if (changeable_value[0] === row_index && changeable_value[1] === column_index){
                    return (
                        <>
                            <input placeholder={changeable_values[index][2]} type="text" onInput={(e)=>{handle_input(e)}} onClick={(e)=>{handle_click(e)}}></input>
                        </>
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

        if (row_index === 2 || row_index === 5){
            style = {...style, "borderBottom": "3px solid black"}
        }
        if (column_index === 3 || column_index === 6){
            style = {...style, "borderLeft": "3px solid black"}
        }




        return (
            <div className="box_container" style={style}>
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
            <div className="remove_container">
                <button onClick={()=>{set_remove_bool(!remove_bool)}}>Remove</button>
                <button onClick={()=>{set_changeable_values(changeable_values_init)}}>Reset</button>
            </div>
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