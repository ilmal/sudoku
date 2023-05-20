const easy = ()=>{
    
    const sudoku_layout = [
        [1,null,3,4,5,null,null,8,null],
        [1,null,3,null,5,null,7,8,9],
        [1,null,null,null,5,6,7,8,9],
        [1,null,3,4,null,6,7,8,9],
        [null,2,3,4,5,null,7,8,9],
        [1,2,null,4,null,6,null,8,9],
        [1,null,3,4,null,6,7,null,9],
        [null,null,3,null,5,6,null,8,null],
        [1,null,3,4,5,6,7,null,9]
    ]

    return sudoku_layout
}

export {easy}