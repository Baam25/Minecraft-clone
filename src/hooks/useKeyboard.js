import { useCallback, useEffect, useState } from "react"

function actionKey(key){
    const keyActionMap = {
        KeyW: 'moveForwards',
        KeyS: 'moveBackwards',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
    }
    return keyActionMap[key]
}


export const UseKeyboard = ()=>{
    const [actions, setActions] = useState({
        moveForwards: false,
        moveBackwards: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
    })
    
    const hanKeyDown = useCallback((e)=> {
        const action = actionKey(e.code)
        if(action){
            setActions((prev)=>{
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    }, [])
    const hanKeyUp = useCallback((e)=> {
        const action = actionKey(e.code)
        if(action){
            setActions((prev)=>{
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])
    useEffect(()=>{
        document.addEventListener('keydown', hanKeyDown)
        document.addEventListener('keyup', hanKeyUp)
        return ()=> {
            document.removeEventListener('keydown', hanKeyDown)
            document.removeEventListener('keyup', hanKeyUp)
        }
    }, [hanKeyDown, hanKeyUp])
    return actions
}
